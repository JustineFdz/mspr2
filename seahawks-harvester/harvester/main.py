from gui import AppGUI
from logger import setup_logger

# Initialise la configuration du logger
setup_logger()

def main():
    app = AppGUI()
    app.mainloop()

if __name__ == "__main__":
    main()
