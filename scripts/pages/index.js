async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  // Récupération des données du photographe
  await fetch("/data/photographers.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((value) => {
      data = value;
    })
    .catch(function (error) {
      console.log("Error Fetching Data" + error.message);
    });

  return data;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Analyse du tableau d'objets
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM(); // Appelle la factories pour créer l'objet
    photographersSection.appendChild(userCardDOM);
  });
}

// Appelle de la fonction "getPhotographers" pour obtenir les données
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
