const accessKey = "YOUR_UNSPLASH_ACCESS_KEY"; // TODO: create a dotenv for the key once Unsplash approves.
const galleryImagesContainer = document.querySelector(".gallery-images");

async function fetchImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=6&query=food,dining,restaurant&client_id=${accessKey}`
    );
    const data = await response.json();

    // Generate HTML for gallery images
    const galleryImagesHTML = data
      .map(
        (image) =>
          `<div class="gallery-item" onclick="openLightbox('${image.urls.regular}')">
            <img src="${image.urls.small}" alt="${image.alt_description}">
          </div>`
      )
      .join("");

    galleryImagesContainer.innerHTML = galleryImagesHTML;
  } catch (error) {
    console.log("Error fetching images:", error);
  }
}

fetchImages();

// Lightbox functionality

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(imageUrl) {
  lightboxImage.src = imageUrl;
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

lightboxClose.addEventListener("click", closeLightbox);
