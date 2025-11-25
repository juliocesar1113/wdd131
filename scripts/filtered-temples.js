
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Santo Domingo Dominican Republic",
    location: "Santo Domingo, Dominican Republic",
    dedicated: "2000, September, 17",
    area: 67000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/santo-domingo-dominican-republic-temple/santo-domingo-dominican-republic-temple-1444-main.jpg"
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85000,
    imageUrl: "https://www.ldstemple.pics/wp-content/uploads/provo-city-center-temple-together-forever.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52210,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/0e85ee02f9c7079448ade5ad4b8b0505a07b4231/full/800%2C/0/default"
  }
];

// =========================
// DOM references
// =========================

const grid = document.getElementById("temple-grid");
const pageTitle = document.getElementById("page-title");
const navLinks = document.querySelectorAll("nav a");

// =========================
// Display temples
// =========================

function displayTemples(templesList) {
  grid.innerHTML = "";
  templesList.forEach(temple => {
    const card = document.createElement("figure");

    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    grid.appendChild(card);
  });
}

function filterOld() {
  return temples.filter(t => parseInt(t.dedicated) < 1900);
}

function filterNew() {
  return temples.filter(t => parseInt(t.dedicated) > 2000);
}

function filterLarge() {
  return temples.filter(t => t.area > 90000);
}

function filterSmall() {
  return temples.filter(t => t.area < 10000);
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const filter = link.dataset.filter;

    switch (filter) {
      case "old":
        displayTemples(filterOld());
        pageTitle.textContent = "Old Temples";
        break;

      case "new":
        displayTemples(filterNew());
        pageTitle.textContent = "New Temples";
        break;

      case "large":
        displayTemples(filterLarge());
        pageTitle.textContent = "Large Temples";
        break;

      case "small":
        displayTemples(filterSmall());
        pageTitle.textContent = "Small Temples";
        break;

      default:
        displayTemples(temples);
        pageTitle.textContent = "Temple Album";
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

displayTemples(temples);
