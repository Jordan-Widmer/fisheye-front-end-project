export function initLightHouse() {
  const closeButton = document.getElementById("lightbox_close");
  closeButton.addEventListener("click", closeLightBoxModal);

  const nextButton = document.getElementsByClassName(
    "lightbox_modal_nextbutton"
  )[0];
  const previousButton = document.getElementsByClassName(
    "lightbox_modal_previousbutton"
  )[0];
  const galleryElements = document.querySelectorAll(".card");
  galleryElements.forEach(function (galleryElement) {
    console.log(galleryElement.children[0]);
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
  });

  previousButton.addEventListener("click", function () {
    const galleryElements = document.querySelectorAll(
      ".lightbox_container_picture"
    );
    console.log(galleryElements);
    previousElement(galleryElements[0]);
  });
  nextButton.addEventListener("click", function () {
    console.log("clicked...");
    const galleryElements = document.querySelectorAll(
      ".lightbox_container_picture"
    );
    console.log(galleryElements[0]);
    nextElement(galleryElements[0]);
  });
  // window.addEventListener("keydown", function (event) {
  //     if (
  //         lightboxModalContent.getAttribute("aria-hidden") == "false" &&
  //         event.key == "ArrowLeft"
  //     ) {
  //         previousElement(galleryElements[0]);
  //     }
  //     if (
  //         lightboxModalContent.getAttribute("aria-hidden") == "false" &&
  //         event.key == "ArrowRight"
  //     ) {
  //         nextElement(galleryElements[0]);
  //     }
  // });
}

function openLightBoxModal() {
  document.getElementById("lightbox_modal").style.display = "block";
}

function closeLightBoxModal() {
  document.getElementsByClassName("lightbox_modal")[0].style.display = "none";
  document.getElementById("imagecontainer").innerHTML = "";
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

  // // Get photographer page information
  // let pictureContent = picture.children[0];

  // const lightboxPicture = document.querySelector(".lightbox_container_picture");
  // const lightboxTitle = document.querySelector(".lightbox_container_title");

  // // Apply information to lightbox content
  // while (lightboxPicture.lastElementChild) {
  //     // Reset at each opening: empty it if it already has a child
  //     lightboxPicture.removeChild(lightboxPicture.lastElementChild);
  // }
  // let lightboxPictureContent = pictureContent.cloneNode(true);
  // // Remove the miniature image and get video controls
  // if (lightboxPictureContent.nodeName == "VIDEO") {
  //     const lightboxPictureVideoSource = lightboxPictureContent.children[0];
  //     lightboxPictureVideoSource.src =
  //         lightboxPictureVideoSource.src.split("#")[0];
  //     // Show controls on hover
  //     lightboxPictureContent.addEventListener("mouseover", function () {
  //         lightboxPictureContent.setAttribute("controls", "controls");
  //     });
  //     // Hide controls if not hover
  //     lightboxPictureContent.addEventListener("mouseleave", function () {
  //         lightboxPictureContent.removeAttribute("controls");
  //     });
  // }
  // lightboxPicture.appendChild(lightboxPictureContent); // Put the new picture as child
  // lightboxTitle.innerHTML = title.innerHTML;

  // // Lightbox layout once the picture is displayed
  // setTimeout(function () {
  //     // Reset at each lightbox opening
  //     lightboxTitle.style.width = "auto";
  //     lightboxPicture.style.height = "100%";

  //     if (lightboxPictureContent.nodeName != "VIDEO") {
  //         // Align the title with the displayed picture (center if it is a video because natural dimensions are 0)
  //         let titleWidth =
  //             (lightboxPictureContent.naturalWidth * lightboxPictureContent.height) /
  //             lightboxPictureContent.naturalHeight;
  //         if (titleWidth > lightboxPictureContent.width) {
  //             titleWidth = lightboxPictureContent.width;
  //         }
  //         lightboxTitle.style.width = titleWidth + "px";

  //         // If picture is in landscape, bring title closer to the picture
  //         if (
  //             lightboxPictureContent.naturalWidth >
  //             lightboxPictureContent.naturalHeight
  //         ) {
  //             let pictureHeight =
  //                 (lightboxPictureContent.naturalHeight * titleWidth) /
  //                 lightboxPictureContent.naturalWidth;
  //             if (pictureHeight > lightboxPictureContent.height) {
  //                 pictureHeight = lightboxPictureContent.height;
  //             }
  //             lightboxPicture.style.height = pictureHeight + "px";
  //         }
  //     }
  // }, 50);

  // const lightboxModalContent = document.querySelector(".lightbox_content");

  // // Partially hide the previous button if the picture is the first
  // if (firstpicture) {
  //     lightboxModalContent.classList.add("boundary_firstelement");
  // }
  // // Partially hide the next button if the picture is the last
  // else if (lastpicture) {
  //     lightboxModalContent.classList.add("boundary_lastelement");
  // } else {
  //     lightboxModalContent.classList.remove("boundary_firstelement");
  //     lightboxModalContent.classList.remove("boundary_lastelement");
  // }
}

function getMediaType(media) {
  const type = media.split(".").slice(1).pop();
  return type === "mp4" ? "video" : "image";
}
export async function previousElement(currentSource) {
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
      if (i == 1) {
        await showImageInLightBox(galleryElements[i - 1], true, false);
      } else if (i == 0) {
        console.log("disable button");
      } else {
        await showImageInLightBox(galleryElements[i - 1], false, false);
      }
    }
  }
}
async function getSourceOrImageOrVideo(content, fromimage) {
  console.log(content.nodeName);
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
export async function nextElement(currentSource) {
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
      // Display lightbox previous and next buttons if it is the first or the last picture
      if (i == galleryElements.length - 2) {
        await showImageInLightBox(galleryElements[i + 1], false, true);
      } else if (i == galleryElements.length - 1) {
        console.log("You've reached the last picture.");
      } else {
        await showImageInLightBox(galleryElements[i + 1], false, false);
      }
    }
  }
}
