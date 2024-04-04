export interface OpenPort {
    id: number;
    machine_id: number;
    port_number: number;
  }
  
  export interface Machine {
    machine_id: number;
    network_id: number;
    ip: string;
    status: string;
    latency: string;
    open_ports?: OpenPort[]; 
  }
  
  export interface Network {
    id: number;
    timestamp: number;
    hostname: string;
    version: string;
    machines?: Machine[]; 
  }
  