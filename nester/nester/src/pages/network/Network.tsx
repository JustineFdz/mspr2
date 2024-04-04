import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Network, Machine, OpenPort } from '../../types/types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Container,
  Button,
} from '@mui/material';
// Assurez-vous que le chemin d'importation est correct pour vos composants et types

function NetworkDetail() {
  const { id } = useParams();
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachinesAndOpenPorts = async () => {
      if (!id) return; // S'assurer que l'ID est présent
      try {
        const machinesResponse = await fetch(`http://localhost:3001/networks/${id}/machines`);
        let machinesData: Machine[] = await machinesResponse.json();

        // Pour chaque machine, tenter de récupérer les ports ouverts
        const machinesWithOpenPortsPromises = machinesData.map(async (machine) => {
          try {
            const openPortsResponse = await fetch(`http://localhost:3001/machines/${machine.machine_id}/open_ports`);
            let openPortsData: OpenPort[] = [];
            if (openPortsResponse.ok) {
              openPortsData = await openPortsResponse.json();
            }
            return { ...machine, open_ports: openPortsData };
          } catch (error) {
            console.error(`Failed to fetch open ports for machine ${machine.machine_id}:`, error);
            return { ...machine }; // Retourne la machine sans modifier open_ports s'il y a une erreur
          }
        });

        const machinesWithOpenPorts = await Promise.all(machinesWithOpenPortsPromises);
        setMachines(machinesWithOpenPorts);
      } catch (error) {
        console.error("Error fetching machines and open ports:", error);
      }
    };

    fetchMachinesAndOpenPorts();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Machines in Network {id}
      </Typography>
      <Grid container spacing={2}>
        {machines.map((machine) => (
          // Ici, on ajuste la largeur pour afficher 3 cartes par ligne sur des écrans moyens à larges
          <Grid item xs={12} sm={6} md={4} key={machine.machine_id}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {machine.ip}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {machine.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Open Ports: {machine.open_ports ? machine.open_ports.map(port => port.port_number).join(', ') : 'None'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/network/${id}/machine/${machine.machine_id}`} style={{ textDecoration: 'none' }}>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NetworkDetail;
