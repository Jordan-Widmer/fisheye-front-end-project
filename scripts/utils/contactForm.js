// Ouverture de la modale
function displayModal() {
  const modal = document.getElementById("modal_contact");
  modal.style.display = "block";

  const contactModalContent = document.querySelector(".modal_inner");
  contactModalContent.setAttribute("aria-hidden", false);

  const contactModalFormInputs = document.querySelectorAll(".form-field");

  contactModalFormInputs[0].focus();
}

// verifie au moyen d'une regex le mail et retourne sous la forme d'un objet
// la valeur de la regex est contenue dans le champs value de l'objet
// le champ id n'est la que pour le nommage
const verifyEmail = (email, id) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return { value: emailRegex.test(String(email).toLowerCase()), id };
};
// verifie au moyen d'une regex le nom et retourne sous la forme d'un objet
// la valeur de la regex est contenue dans le champs value de l'objet
// le champ id n'est la que pour le nommage
const verifyName = (name, id) => {
  const nameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return { value: nameRegex.test(String(name).toLowerCase()), id };
};
// ceci est une héhésie
// passe-plât : prend un objet et si la valeur est nulle l'affiche dans la console
// retourne quoi qu'il se passe l'objet en question
const display = (obj) => {
  if (obj.value === false) {
    console.error(obj.id, obj.value);
  }
  return obj;
};

function checkFormValidation(fields) {
  // parcourt les champs que l'utilisateur remplie et renvoi une erreur si l'un est vide
  for (let i = 0; i !== fields.length; i++) {
    const inputValue = fields[i].value;
    // si pas vide alors saut l'instruction après le block de condition et réitère un nv tour de boucle tant que la condition de sortie est invalide
    if (inputValue !== "") {
      continue;
    }
    // arrive ici car un des champs est vide
    throw new Error("one or many fields is/are empty");
  }
  // recupère les valeurs des champs (value) par déconstruction des objets et renomme la propriété value
  const { value: firstName } = fields[0];
  const { value: lastName } = fields[1];
  const { value: email } = fields[2];
  // détermine la valeur de retour de la function
  return (
    display(verifyEmail(email, "email")).value &&
    display(verifyName(lastName, "lastName")).value &&
    display(verifyName(firstName, "fistName")).value
  );
}

// Fermeture de la modale
function closeModal() {
  const modal = document.getElementById("modal_contact");
  modal.style.display = "none";

  const contactModalContent = document.querySelector(".modal_inner");
  contactModalContent.setAttribute("aria-hidden", true);
}

(() => {
  const contactModalContent = document.querySelector(".modal_inner");
  const contactModalCloseCross = document.getElementById("contact-modal-cross");
  const contactModalSubmitButton = document.getElementById(
    "contact-submit-button"
  );

  contactModalCloseCross.addEventListener("click", closeModal);

  window.addEventListener("keydown", function (event) {
    if (
      contactModalContent.getAttribute("aria-hidden") == "false" &&
      event.key == "Escape"
    ) {
      closeModal();
    }
  });

  contactModalSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const contactModalFormInputs = document.querySelectorAll(".form-field");
    if (checkFormValidation(contactModalFormInputs)) {
      for (let i = 0; i < contactModalFormInputs.length; i++) {
        console.log(contactModalFormInputs[i].value);
      }
      closeModal();
    }
  });
})();
