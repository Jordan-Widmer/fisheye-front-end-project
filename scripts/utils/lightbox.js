// S'actionne quand l'utilisateur va clicker sur le bouton
export function initLightHouse() {
  const lightboxModalContent = document.getElementById("lightbox_modal-inner");
  lightboxModalContent.setAttribute("aria-hidden", "false");

  const closeButton = document.getElementById("lightbox_close");
  closeButton.addEventListener("click", closeLightBoxModal);
  closeButton.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      closeLightBoxModal();
    }
  });

  const nextButton = document.getElementsByClassName(
    "lightbox_modal_nextbutton"
  )[0];
  const previousButton = document.getElementsByClassName(
    "lightbox_modal_previousbutton"
  )[0];
  const galleryElements = document.querySelectorAll(".card");
  galleryElements.forEach(function (galleryElement) {
    galleryElement.children[0].addEventListener("click", function () {
      // Display lightbox previous and next buttons if it is the first or the last picture
      if (galleryElement == galleryElements[0]) {
        showImageInLightBox(galleryElement, true, false);
      } else if (
        galleryElement == galleryElements[galleryElements.length - 1]
      ) {
        showImageInLightBox(galleryElement, false, true);
      } else {
        showImageInLightBox(galleryElement, false, false);
      }
      openLightBoxModal();
    });

    galleryElement.children[0].addEventListener("keydown", function (event) {
      if (event.key == "Enter") {
        if (galleryElement == galleryElements[0]) {
          showImageInLightBox(galleryElement, true, false);
        } else if (
          galleryElement == galleryElements[galleryElements.length - 1]
        ) {
          showImageInLightBox(galleryElement, false, true);
        } else {
          showImageInLightBox(galleryElement, false, false);
        }
        openLightBoxModal();
      }
    });
  });

  previousButton.addEventListener("click", function () {
    const galleryElements = document.querySelectorAll(
      ".lightbox_container_picture"
    );
    previousElement(galleryElements[0]);
    const previewButton = document.getElementById("previewbutton");
    const nextButton = document.getElementById("nextbutton");
    previewButton.classList.remove("disable");
    nextButton.classList.remove("disable");
  });
  nextButton.addEventListener("click", function () {
    console.log("clicked...");
    const previewButton = document.getElementById("previewbutton");
    const nextButton = document.getElementById("nextbutton");
    previewButton.classList.remove("disable");
    nextButton.classList.remove("disable");
    const galleryElements = document.querySelectorAll(
      ".lightbox_container_picture"
    );
    nextElement(galleryElements[0]);
  });
  window.addEventListener("keydown", function (event) {
    const previewButton = document.getElementById("previewbutton");
    const nextButton = document.getElementById("nextbutton");
    previewButton.classList.remove("disable");
    nextButton.classList.remove("disable");
    if (
      lightboxModalContent.getAttribute("aria-hidden") == "false" &&
      event.key == "ArrowLeft"
    ) {
      const galleryElements = document.querySelectorAll(
        ".lightbox_container_picture"
      );
      previousElement(galleryElements[0]);
    }
    if (
      lightboxModalContent.getAttribute("aria-hidden") == "false" &&
      event.key == "ArrowRight"
    ) {
      console.log("arrow right clicked...");
      const galleryElements = document.querySelectorAll(
        ".lightbox_container_picture"
      );
      nextElement(galleryElements[0]);
    }
  });

  closeButton.tabIndex = "0";
  previousButton.tabIndex = "0";
  nextButton.tabIndex = "0";
}

// S'exécute pour afficher l'image dans la lightbox
function openLightBoxModal() {
  document.getElementById("lightbox_modal").style.display = "block";
  changeTabIndexesBehindLightbox("-1");
}

// Ferme la lightbox
function closeLightBoxModal() {
  document.getElementsByClassName("lightbox_modal")[0].style.display = "none";
  document.getElementById("imagecontainer").innerHTML = "";

  changeTabIndexesBehindLightbox("0");
}

async function showImageInLightBox(element, firstpicture, lastpicture) {
  let picture = element.firstChild;
  let title = element.children[1].firstChild;
  document.getElementsByClassName("lightbox_container_title")[0].innerHTML =
    title.innerHTML;
  const a = getMediaType(picture.src);
  document.getElementById("imagecontainer").innerHTML = "";
  if (a === "image") {
    const pictureNode = document.createElement("IMG");
    pictureNode.src = picture.src;
    pictureNode.height = "100%";
    document.getElementById("imagecontainer").appendChild(pictureNode);
  } else if (a == "video") {
    const videoNode = document.createElement("VIDEO");
    videoNode.src = picture.src;
    videoNode.height = "100%";
    videoNode.controls = true;
    videoNode.muted = true;
    document.getElementById("imagecontainer").appendChild(videoNode);
  }
}

function getMediaType(media) {
  const type = media.split(".").slice(1).pop();
  return type === "mp4" ? "video" : "image";
}

// Fonction qui va afficher l'image precedente
export async function previousElement(currentSource) {
  const galleryElements = document.querySelectorAll(".card");
  const previewButton = document.getElementById("previewbutton");

  let sourceElement = await getSourceOrImageOrVideo(
    currentSource.children[0],
    false
  );

  for (let i = 0; i < galleryElements.length; i++) {
    let elementPictureSource = await getSourceOrImageOrVideo(
      galleryElements[i].firstChild,
      true
    );
    if (sourceElement == elementPictureSource) {
      if (i == 1) {
        previewButton.classList.add("disable");
        await showImageInLightBox(galleryElements[i - 1], true, false);
      } else if (i == 0) {
        console.log("end of list");
        previewButton.classList.add("disable");
        // console.log(i)
        // previewButton.classList.add("disable")
      } else {
        previewButton.classList.remove("disable");
        await showImageInLightBox(galleryElements[i - 1], false, false);
      }
    }
  }
}
async function getSourceOrImageOrVideo(content, fromimage) {
  let contentSource;
  if (content.nodeName != "VIDEO") {
    contentSource = content.src;
  } else {
    if (!fromimage) {
      contentSource = content.src;
    } else {
      contentSource = content.src;
    }
  }
  return contentSource;
}

// S'occupe d'afficher l'image suivante
export async function nextElement(currentSource) {
  const nextButton = document.getElementById("nextbutton");
  const galleryElements = document.querySelectorAll(".card");
  let sourceElement = await getSourceOrImageOrVideo(
    currentSource.children[0],
    false
  );
  for (let i = 0; i < galleryElements.length; i++) {
    let elementPictureSource = await getSourceOrImageOrVideo(
      galleryElements[i].firstChild,
      true
    );
    if (sourceElement == elementPictureSource) {
      if (i == galleryElements.length - 2) {
        nextButton.classList.add("disable");
        await showImageInLightBox(galleryElements[i + 1], false, true);
      } else if (i == galleryElements.length - 1) {
        nextButton.classList.add("disable");
        console.log("You've reached the last picture.");
      } else {
        nextButton.classList.remove("disable");
        await showImageInLightBox(galleryElements[i + 1], false, false);
      }
    }
  }
}

async function changeTabIndexesBehindLightbox(tabIndexValue) {
  const searchbox = document.getElementById("sortByOptions");

  const galleryElements = document.querySelectorAll(".card");
  galleryElements.forEach(function (galleryElement) {
    galleryElement.children[0].setAttribute("tabindex", tabIndexValue);
    galleryElement.children[1].children[1].children[0].tabIndex = tabIndexValue;
  });
}
