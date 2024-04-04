import tkinter as tk
from tkinter import ttk
from threading import Thread
import queue
from network_scanner import NetworkScanner
from database import insert_scan_results  # Assurez-vous que cette importation est correcte
from logger import setup_logger

class AppGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        setup_logger()
        self.title("Harvester")
        
        self.progress_label = ttk.Label(self, text="Prêt")
        self.progress_label.pack(pady=10)
        
        self.scan_button = ttk.Button(self, text="Démarrer le Scan", command=self.start_scan)
        self.scan_button.pack(pady=10)
        
        self.result_text = tk.Text(self, height=20, width=50)
        self.result_text.pack()
        
        self.progress_queue = queue.Queue()
        self.scanner = NetworkScanner(self.progress_queue)

    def start_scan(self):
        self.scan_button.config(state=tk.DISABLED)
        self.progress_label.config(text="Scan en cours...")
        Thread(target=self.scanner.scan, args=("192.168.1.147",), daemon=True).start()
        self.after(100, self.check_progress_queue)

    def check_progress_queue(self):
        try:
            while True:
                message = self.progress_queue.get_nowait()
                # Vérifier si le message est un tuple avant de le déballer
                if isinstance(message, tuple):
                    task, data = message
                    if task == 'scan_completed':
                        self.process_scan_results(data)
                    else:
                        self.result_text.insert(tk.END, f"{task}: {data}\n")
                else:
                    # Si ce n'est pas un tuple, on suppose que c'est une simple chaîne de caractères
                    self.result_text.insert(tk.END, message + "\n")
        except queue.Empty:
            pass
        self.after(100, self.check_progress_queue)

    def process_scan_results(self, scan_results):
        scan_info = {'hostname': 'NetworkScan', 'version': '1.0'}
        insert_scan_results(scan_info, scan_results)  # Appelle la fonction d'insertion
        self.result_text.insert(tk.END, "Scan terminé et données insérées.\n")
        self.scan_button.config(state='normal')

if __name__ == "__main__":
    app = AppGUI()
    app.mainloop()
