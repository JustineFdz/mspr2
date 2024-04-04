// const fs = require("fs");

// function concatJSONFiles(...filePaths) {
//   let finalData = [];

//   filePaths.forEach((filePath) => {
//     try {
//       const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
//       finalData = finalData.concat(jsonData);
//     } catch (error) {
//       console.error(`Error reading or parsing JSON file ${filePath}:`, error);
//     }
//   });

//   return finalData;
// }

// // Spécifiez ici les chemins des fichiers JSON que vous souhaitez concaténer
// const filePaths = [
//   "./loucxf-Latitude-5590.json",
//   "./loucxf-Latitude-5590copy.json",
//   // Ajoutez d'autres chemins de fichiers ici au besoin
// ];

// const finalData = concatJSONFiles(...filePaths);

// // Écrivez le résultat dans un nouveau fichier JSON
// fs.writeFileSync("./final.json", JSON.stringify(finalData, null, 2));

// console.log(finalData);

const fs = require("fs");
const path = require("path");

function concatJSONFilesInDirectory(directoryPath) {
  let finalData = [];

  // Lecture des fichiers du répertoire
  const files = fs.readdirSync(directoryPath);

  // Filtrer les fichiers JSON
  const jsonFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".json"
  );

  // Parcourir chaque fichier JSON
  jsonFiles.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    try {
      // Lire et analyser le contenu JSON
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      // Concaténer les données
      finalData = finalData.concat(jsonData);
    } catch (error) {
      console.error(`Error reading or parsing JSON file ${filePath}:`, error);
    }
  });

  return finalData;
}

const directoryPath = "./data"; // Spécifiez le chemin de votre répertoire contenant les fichiers JSON

const finalData = concatJSONFilesInDirectory(directoryPath);

// Écrivez le résultat dans un nouveau fichier JSON
fs.writeFileSync("./src/data/final.json", JSON.stringify(finalData, null, 2));
