import React, { useState, useEffect } from 'react';
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Network } from '../../types/types'; // Assurez-vous que cette importation correspond au chemin correct
import "./networks.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "hostname",
    headerName: "Hostname",
    width: 150,
    editable: true,
  },
  {
    field: "timestamp",
    headerName: "Timestamp",
    width: 150,
    editable: true,
  }, 
  {
    field: "version",
    headerName: "Version",
    type: "number",
    width: 110,
    editable: true,
  },
];

const Networks: React.FC = () => {
  const [rows, setRows] = useState<Network[]>([]);

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        const response = await fetch('http://localhost:3001/'); // Ajustez l'URL selon votre API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Network[] = await response.json();
        setRows(data.map((item, index) => ({
          ...item,
          id: item.id || index + 1, // Utilisez l'ID de l'item ou, si absent, utilisez l'index comme fallback
        })));
      } catch (error) {
        console.error("Error fetching networks:", error);
      }
    };

    fetchNetworks();
  }, []); // Le tableau vide assure que l'effet s'exécute une seule fois au montage

  return (
    <div className="networks">
      <div className="info">
        <Typography variant="h4" style={{ marginTop: "20px", marginBottom: "20px" }}>
          Réseaux clients
        </Typography>
      </div>
      <DataTable slug="network" columns={columns} rows={rows} />
    </div>
  );
};

export default Networks;
