// import { useEffect, useState } from "react";
// import axios from "axios";

// const FetchDataPage = () => {
//   const [dataObjects, setDataObjects] = useState<any[]>([]);

//   const fetchData = async () => {
//     const directory = "../../../data"; // Chemin relatif au dossier public de votre application React
//     const files = await axios.get(directory); // Assurez-vous que vos fichiers JSON se trouvent dans le dossier public/data
//     const promises = files.data
//       .filter((filename: string) => filename.endsWith(".json"))
//       .map(async (filename: string, idx: number) => {
//         const response = await axios.get(`/${directory}/${filename}`); // Utilisez le chemin relatif pour accéder aux fichiers JSON
//         let data = response.data;
//         data["id"] = idx + 1;
//         return data;
//       });

//     Promise.all(promises)
//       .then((objects: any[]) => {
//         setDataObjects(objects);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des données :", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleFetchNewData = () => {
//     fetchData();
//   };

//   return (
//     <div>
//       <h1>Page de récupération de données</h1>
//       <button onClick={handleFetchNewData}>
//         Récupérer de nouvelles données
//       </button>
//       <h2>Données récupérées :</h2>
//       <ul>
//         {dataObjects.map((obj, index) => (
//           <li key={index}>{JSON.stringify(obj)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FetchDataPage;
