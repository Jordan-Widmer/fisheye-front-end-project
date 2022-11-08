// Ouverture de la modale
function displayModal() {
  const modal = document.getElementById("modal_contact");
  modal.style.display = "block";

  const contactModalContent = document.querySelector(".modal_inner");
  contactModalContent.setAttribute("aria-hidden", false);

  const contactModalFormInputs = document.querySelectorAll(".form-field");

  contactModalFormInputs[0].focus();
}

async function checkFormValidation(fields) {
  let fieldsValues = Object.values(fields);
  if (fieldsValues.includes(false) == true) {
    return false;
  }
  if (fieldsValues.includes(false) == false) {
    return true;
  }
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
