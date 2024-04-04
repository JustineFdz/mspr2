const fs = require("fs");
const path = require("path");

// Fonction pour ajouter les ids des machines
function addIds(data, startingId) {
  let idCounter = startingId;
  data.id = idCounter;
  let machineIdCounter = 1; // Initialiser le compteur pour les IDs des machines
  idCounter++;

  data.machines.forEach((machine) => {
    machine.machine_id = machineIdCounter; // Attribuer l'ID de la machine
    machineIdCounter++; // Incrémenter le compteur des IDs des machines
    idCounter++;
  });
}

// Fonction pour mettre à jour le fichier JSON
function updateJSONFile(folderPath) {
  let newDataArray = [];

  // Liste les fichiers dans le dossier
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Erreur de lecture du dossier :", err);
      return;
    }

    // Boucle à travers chaque fichier 
    //(utilisation de JSON.parse)
    files.forEach((file) => {
      // Vérifie si le fichier est de type JSON
      if (path.extname(file) === ".json") {
        // Chemin complet du fichier
        const filePath = path.join(folderPath, file);

        // Lit le contenu du fichier
        const data = fs.readFileSync(filePath, "utf8");

        try {
          // Parse le JSON
          const jsonData = JSON.parse(data);

          // Ajoute un ID aux réseaux et aux machines
          addIds(jsonData, newDataArray.length + 1);
          // Ajoute le nouvel objet JSON à notre tableau
          newDataArray.push(jsonData);
        } catch (error) {
          console.error("Erreur de parsing JSON :", error);
        }
      }
    });

    // Convertit l'objet modifié en JSON (utilisation de JSON.)
    const newData = newDataArray
      .map((obj, index) => {
        const separator = index === newDataArray.length - 1 ? "" : ",";
        
        return (
          JSON.stringify(
            obj,
            (key, value) => {
              if (key === "id" || key === "machine_id") {
                return Number(value); // Convertit l'ID en nombre
              }
              return value;
            },
            2
          ) + separator
        );
      })
      .join("\n");

    // Écrit les données modifiées dans le fichier
    fs.writeFile(
      "../nester/src/data/data.json",
      `[${newData}]`,
      { flag: "w" },
      (err) => {
        if (err) {
          console.error("Erreur d'écriture dans le fichier data.json :", err);
          return;
        }
        console.log("Le fichier data.json a été mis à jour avec succès.");
      }
    );
  });
}

module.exports = {
  updateJSONFile,
};
