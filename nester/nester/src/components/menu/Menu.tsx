import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./menu.scss";
import { LuComputer, LuNetwork } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { Network, Machine } from '../../types/types'; // Assurez-vous que ce chemin est correct

const Menu = () => {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    const fetchNetworksAndMachines = async () => {
      try {
        // Étape 1: Récupérer tous les réseaux
        const response = await fetch('http://localhost:3001/');
        const networksData: Network[] = await response.json();

        // Étape 2: Pour chaque réseau, récupérer les machines associées
        const networksPromises = networksData.map(async (network) => {
          const machinesResponse = await fetch(`http://localhost:3001/networks/${network.id}/machines`);
          const machinesData: Machine[] = await machinesResponse.json();

          // Optionnel: Récupérer les ports ouverts pour chaque machine, si nécessaire
          // Cette partie peut être omise si vous ne souhaitez afficher que les IPs des machines
          // et peut être ajustée selon les besoins

          return { ...network, machines: machinesData };
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
    <div className="menu">
      <div className="item">
        <Link to="/" className="icon">
          <IoHomeOutline />
          Accueil
        </Link>
      </div>
      {networks.map((network) => (
        <div className="item" key={network.id}>
          <Link to={`/network/${network.id}`} className="title">
            <LuNetwork />
            {network.hostname}
          </Link>
          {network.machines && network.machines.map((machine) => (
            <Link key={machine.machine_id} to={`/network/${network.id}/machine/${machine.machine_id}`} className="machine">
              <LuComputer />
              <span className="listMachineTitle">{machine.ip}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
