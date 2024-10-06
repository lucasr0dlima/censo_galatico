async function printPlanets(url) {
  let data = await fetch(url);

  let { results } = await data.json();

  let gallery = document.getElementById("planets");

  // console.log(results);

  results.forEach((planet) => {
    let button = document.createElement("button");

    button.innerHTML = planet.name;

    button.className = "planet";

    button.addEventListener("click", function () {
      expandPlanet(planet.url);
    });

    button.setAttribute("data-url", planet.url);

    gallery.appendChild(button);
  });

  if (gallery.childElementCount === 1) {
    planet = document.querySelector(".planet");

    expandPlanet(planet.dataset.url);
  }
}

async function expandPlanet(url) {
  let section = document.getElementById("planet_info");
  section.innerHTML = "";

  let data = await fetch(url);

  let planet = await data.json();

  // console.log(url);
  // console.log(planet);

  let name = document.createElement("h2");
  name.innerHTML = planet.name;
  let n = document.createTextNode("Nome do Planeta: ");
  section.appendChild(n);
  section.appendChild(name);
  // console.log(name);

  let climate = document.createElement("h2");
  climate.innerHTML = planet.climate;
  let c = document.createTextNode("Clima: ");
  section.appendChild(c);
  section.appendChild(climate);

  let population = document.createElement("h2");
  population.innerHTML = planet.population;
  let p = document.createTextNode("População: ");
  section.appendChild(p);
  section.appendChild(population);

  let terrain = document.createElement("h2");
  terrain.innerHTML = planet.terrain;
  let t = document.createTextNode("Terreno: ");
  section.appendChild(t);
  section.appendChild(terrain);
}

printPlanets("https://swapi.dev/api/planets/");

let searchBar = document.getElementById("busca");
let section = document.getElementById("planet_info");

searchBar.addEventListener("input", debounce(searchAction));

async function searchAction(e) {
  let value = e.target.value;

  let gallery = document.getElementById("planets");
  let section = document.getElementById("planet_info");

  if (value && value.trim().length > 0) {
    gallery.innerHTML = "";
    section.innerHTML = "";

    await printPlanets(`https://swapi.dev/api/planets/?search=${value}`);
  } else {
    gallery.innerHTML = "";
    section.innerHTML = "";
    await printPlanets("https://swapi.dev/api/planets/");
  }
}

// searchBar.addEventListener("input", function (e) {
//   let value = e.target.value;
//   let gallery = document.getElementById("planets");

//   if (value == "") {
//     gallery.innerHTML = "";
//     printPlanets("https://swapi.dev/api/planets/");
//   }
// });

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
