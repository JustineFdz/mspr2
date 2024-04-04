import React, { useState, useEffect } from 'react';
import { Network, Machine, OpenPort } from '../../types/types';

const NetworksPage: React.FC = () => {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    const fetchNetworksAndMachines = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        const networksData: Network[] = await response.json();

        const networksPromises = networksData.map(async (network) => {
          const machinesResponse = await fetch(`http://localhost:3001/networks/${network.id}/machines`);
          let machinesData: Machine[] = await machinesResponse.json();

          const machinesWithOpenPortsPromises = machinesData.map(async (machine) => {
            const openPortsResponse = await fetch(`http://localhost:3001/machines/${machine.machine_id}/open_ports`);
            let openPortsData: OpenPort[] = [];
            if (!openPortsResponse.ok) {
              console.error(`Failed to fetch open ports for machine ${machine.machine_id}`);
            } else {
              openPortsData = await openPortsResponse.json();
            }
            return { ...machine, open_ports: openPortsData };
          });

          const machinesWithOpenPorts = await Promise.all(machinesWithOpenPortsPromises);
          return { ...network, machines: machinesWithOpenPorts };
        });

        const networksWithMachines = await Promise.all(networksPromises);
        setNetworks(networksWithMachines);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNetworksAndMachines();
  }, []);

  return (
    <div>
      <h1>Networks and Machines</h1>
      {networks.map(network => (
        <div key={network.id}>
          <h2>{network.hostname}</h2>
          <h3>Machines:</h3>
          {network.machines ? (
            <ul>
              {network.machines.map(machine => (
                <li key={machine.machine_id}>
                  IP: {machine.ip}, Status: {machine.status}, Latency: {machine.latency}
                  {machine.open_ports && machine.open_ports.length > 0 ? (
                    <ul>
                      {machine.open_ports.map(port => (
                        <li key={port.id}>Port: {port.port_number}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No open ports.</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No machines found for this network.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NetworksPage;
