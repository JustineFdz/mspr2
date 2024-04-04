import nmap
from queue import Queue
import logging

logger = logging.getLogger(__name__)

class NetworkScanner:
    def __init__(self, queue: Queue):
        self.progress_queue = queue
        self.scanner = nmap.PortScanner()
    
    def scan(self, network="192.168.1.0/24"):
        try:
            self.progress_queue.put("Démarrage du scan réseau...")
            logger.info("Démarrage du scan réseau...")
            self.scanner.scan(hosts=network, arguments='-sn')
            logger.info(f"Scan terminé pour {network}")
            hosts_up = []
            for host in self.scanner.all_hosts():
                if self.scanner[host].state() == 'up':
                    # Simuler la collecte des ports ouverts et la latence pour cet exemple
                    open_ports = [80, 443] if host == "192.168.1.101" else [22, 8080]
                    latency = "15ms" if host == "192.168.1.101" else "20ms"
                    hosts_up.append({'ip': host, 'status': 'up', 'latency': latency, 'open_ports': open_ports})
            self.progress_queue.put(('scan_completed', hosts_up))
        except Exception as e:
            logger.error(f"Erreur lors du scan: {str(e)}")
