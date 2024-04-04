import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Machine, OpenPort } from '../../types/types';
import './machine.scss';

const MachinePage: React.FC = () => {
  const { id, machineId } = useParams<{ id: string; machineId: string }>();
  const [machineData, setMachineData] = useState<Machine | null>(null);

  useEffect(() => {
    if (!id || !machineId) return;
    
    const fetchMachineData = async () => {
      try {
        const machineResponse = await fetch(`http://localhost:3001/networks/${id}/machines/${machineId}`);
        const machine: Machine = await machineResponse.json();

        const openPortsResponse = await fetch(`http://localhost:3001/machines/${machineId}/open_ports`);
        const openPorts: OpenPort[] = await openPortsResponse.json();

        // Mise à jour de l'état avec les données de la machine et les ports ouverts
        setMachineData({ ...machine, open_ports: openPorts });
      } catch (error) {
        console.error("Failed to fetch machine or open ports data:", error);
      }
    };

    fetchMachineData();
  }, [id, machineId]);

  if (!machineData) {
    return <div>Loading machine data or machine not found...</div>;
  }

  return (
    <div className="machine">
      <Typography variant="h4" style={{ marginTop: "10px" }}>
        Sonde : {machineData.ip}
      </Typography>
      <Typography variant="h5" style={{ marginTop: "10px" }}>
        Données actuelles
      </Typography>
      <div className="info">
        <p>Status: {machineData.status}</p>
        <p>Latence: {machineData.latency}</p>
        <p>Ports ouverts: {
           machineData.open_ports && machineData.open_ports.length > 0 
          ? machineData.open_ports.map((port, index, arr) => (
            <React.Fragment key={port.id}>
                 {port.port_number}{index < arr.length - 1 ? ', ' : ''}
            </React.Fragment>
           ))
          : 'None'
         }</p>
      </div>
    </div>
  );
};

export default MachinePage;
