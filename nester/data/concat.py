import os
import json

# Répertoire contenant les fichiers JSON à combiner
directory = "../nester/data"  # Chemin du répertoire

# Créer une liste pour stocker les objets Python
python_objects = []

# Parcourir tous les fichiers dans le répertoire
for idx, filename in enumerate(os.listdir(directory)):
    if filename.endswith(".json"):
        # Chemin complet du fichier
        filepath = os.path.join(directory, filename)
        # Charger le fichier JSON dans un objet Python
        with open(filepath, "r") as f:
            data = json.load(f)
            # Ajouter un ID au fichier
            data['id'] = idx + 1
            # Ajouter un ID aux machines dans chaque fichier
            for machine_idx, machine in enumerate(data['machines']):
                machine['machine_id'] = machine_idx + 1
            # Ajouter l'objet Python à la liste
            python_objects.append(data)

# Enregistrer tous les objets Python dans un seul fichier JSON
with open("../nester/src/data/data.json", "w") as f:
    json.dump(python_objects, f, indent=4)
