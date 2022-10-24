import { initLightHouse } from "../utils/lightbox.js";
//Mettre le code JavaScript lié à la page photographer.html
let id = null;
let photoMedia = [];
let photographer = [];

function getIdFromURL() {
  let id = new URLSearchParams(window.location.search).get("id");
  return id;
}
function getFolderName(name) {
  return name.split(" ")[0].replace(/-/g, " ");
}

async function onload() {
  id = getIdFromURL();
  const { media, photographers } = await getPhotographers();
  photoMedia = media.filter((f) => f.photographerId == id);
  photographer = photographers.filter((f) => f.id == id);

  renderPhotographer(photographer, photoMedia);
}

function renderPhotographer(photographer, photoMedia) {
  if (photographer.length > 0) {
    const photographerr = photographer[0];

    const photographerContainer = document.getElementById("photographerdetail");
    photographerContainer.classList.add("photographer-container");

    const photographerDetail = document.createElement("div");
    const photographerImage = document.createElement("img");
    photographerImage.src = `../../assets/images/Photographers ID Photos/${photographerr.portrait}`;
    photographerImage.alt = photographerr.name;
    photographerImage.classList.add("photographer-img");

    // creating photographer detials
    const photographerName = document.createElement("h4");
    photographerName.textContent = photographerr.name;
    photographerName.classList.add("photographer_name");

    const photographerLocation = document.createElement("h6");
    photographerLocation.textContent =
      photographerr.city + ", " + photographerr.country;
    photographerLocation.classList.add("photographer_location");
    const photographerTagLine = document.createElement("p");
    photographerTagLine.textContent = photographerr.tagline;
    photographerTagLine.classList.add("photographer_detail");

    photographerDetail.appendChild(photographerName);
    photographerDetail.appendChild(photographerLocation);
    photographerDetail.appendChild(photographerTagLine);

    document
      .getElementById("photorgapherinformation")
      .appendChild(photographerDetail);
    document
      .getElementById("photographer-image")
      .appendChild(photographerImage);
    // photographerContainer.appendChild(photographerDetail)
    // photographerContainer.appendChild(photographerImage)

    showMediaCards(photoMedia, photographerr);

    document.getElementsByClassName("bottom_bar_price")[0].innerHTML =
      photographerr.price + "€" + " /jour";
  }
}

function showMediaCards(photoMedia, photographerr) {
  const container = document.getElementById("media");
  container.innerHTML = "";
  let totalLikes = 0;
  photoMedia.forEach((m) => {
    totalLikes += m.likes;
    const cardDiv = document.createElement("div");
    const cardBody = document.createElement("div");
    const heading = document.createElement("h5");
    const cardIcons = document.createElement("div");
    cardIcons.classList.add("card-icons");
    const icon = document.createElement("i");
    const countSpan = document.createElement("span");
    cardDiv.classList.add("card");
    cardBody.classList.add("cardbody");
    let mediaElement = null;
    if (m.image) {
      const cardImg = document.createElement("img");
      cardImg.setAttribute(
        "src",
        `../../assets/images/${getFolderName(photographerr.name)}/${m.image}`
      );
      cardImg.height = 400;
      cardImg.alt = m.title;
      mediaElement = cardImg;
      mediaElement.setAttribute("tabindex", 0);
    } else if (m.video) {
      const video = document.createElement("video");
      video.height = 300;
      video.src = `../../assets/images/${getFolderName(photographerr.name)}/${
        m.video
      }`;
      video.controls = false;
      video.muted = false;
      mediaElement = video;
      mediaElement.setAttribute("tabindex", 0);
    }

    heading.textContent = m.title;
    heading.classList.add("card-heading");
    icon.classList.add("fas", "fa-heart", "card-icon");
    icon.setAttribute("tabindex", 0);
    countSpan.textContent = m.likes;
    countSpan.id = m.id;
    icon.addEventListener(
      "click",
      () => {
        const likeCounts = document.getElementById(m.id);
        console.log(likeCounts);
        if (likeCounts) {
          likeCounts.innerHTML = +likeCounts.innerHTML + 1;
          let index = photoMedia.findIndex((x) => x.id == m.id);
          photoMedia[index].likes = +photoMedia[index].likes + 1;
          showLikes(
            +document.getElementsByClassName("bottom_bar_likes_number")[0]
              .innerHTML + 1
          );
        }
      },
      { once: true }
    );

    icon.addEventListener(
      "keydown",
      function (event) {
        if (event.key == "Enter") {
          const likeCounts = document.getElementById(m.id);
          console.log(likeCounts);
          if (likeCounts) {
            likeCounts.innerHTML = +likeCounts.innerHTML + 1;
            let index = photoMedia.findIndex((x) => x.id == m.id);
            photoMedia[index].likes = +photoMedia[index].likes + 1;
            showLikes(
              +document.getElementsByClassName("bottom_bar_likes_number")[0]
                .innerHTML + 1
            );
          }
        }
      },
      { once: true }
    );

    cardIcons.appendChild(icon);
    cardIcons.appendChild(countSpan);
    cardBody.appendChild(heading);
    cardBody.appendChild(cardIcons);
    cardDiv.appendChild(mediaElement);
    cardDiv.appendChild(cardBody);
    container.appendChild(cardDiv);
  });
  showLikes(totalLikes);
  initLightHouse();
}
function showLikes(totalLikes) {
  if (document.getElementsByClassName("bottom_bar_likes_number")) {
    document.getElementsByClassName("bottom_bar_likes_number")[0].innerHTML =
      totalLikes;
  }
}
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let data = null;
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

(async () => {
  await onload();
})();

document
  .getElementById("sortByOptions")
  .addEventListener("change", function () {
    const { sortedMedia, sortedBy } = sortMedia(this.value);

    showMediaCards(sortedMedia, photographer[0]);

    initLightHouse();
  });

function sortMedia(sortedBy) {
  const mediatoSort = [...photoMedia];
  if (sortedBy == "popularite") {
    console.log("d selected...");
    mediatoSort.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }
  if (sortedBy == "date") {
    console.log("d selected...");
    mediatoSort.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  if (sortedBy == "title") {
    console.log("sorting....");
    mediatoSort.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  return { sortedMedia: mediatoSort, sortedBy };
}
