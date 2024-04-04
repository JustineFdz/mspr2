import psycopg2
from datetime import datetime
import logging
from config import DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT

# Configuration du logger (ou importez votre configuration de logger ici)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

CONN_INFO = f"dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD} host={DB_HOST} port={DB_PORT}"

def insert_scan_results(scan_info, machines_info):
    try:
        with psycopg2.connect(CONN_INFO) as conn:
            logger.info("Connected to the database")
            with conn.cursor() as cursor:
                # Insérer dans 'networks'...
                cursor.execute("""
                    INSERT INTO networks (timestamp, hostname, version) 
                    VALUES (%s, %s, %s) RETURNING id;
                """, (datetime.now(), scan_info['hostname'], scan_info['version']))
                network_id = cursor.fetchone()[0]
                logger.info(f"Network entry created with ID: {network_id}")

                # Pour chaque machine...
                for machine in machines_info:
                    # Insérer dans 'machines'...
                    cursor.execute("""
                        INSERT INTO machines (network_id, ip, status, latency) 
                        VALUES (%s, %s, %s, %s) RETURNING machine_id;
                    """, (network_id, machine['ip'], machine['status'], machine['latency']))
                    machine_id = cursor.fetchone()[0]
                    logger.info(f"Machine entry created with ID: {machine_id}")

                    # Pour chaque port ouvert...
                    for port in machine.get('open_ports', []):
                        cursor.execute("""
                            INSERT INTO open_ports (machine_id, port_number) 
                            VALUES (%s, %s);
                        """, (machine_id, port))
                        logger.info(f"Open port {port} inserted for machine ID: {machine_id}")

    except Exception as e:
        logger.error(f"An error occurred: {e}")
