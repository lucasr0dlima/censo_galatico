async function printPlanets() {
  let data = await fetch("https://swapi.dev/api/planets/");

  let { results } = await data.json();

  let gallery = document.getElementById("planets");

  console.log(results);

  results.forEach((planet) => {
    let button = document.createElement("button");

    button.innerHTML = planet.name;

    button.className = "planet";

    gallery.appendChild(button);
  });
}

printPlanets();
