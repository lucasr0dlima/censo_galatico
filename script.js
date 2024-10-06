async function printPlanets() {
  let data = await fetch("https://swapi.dev/api/planets/");

  let { results } = await data.json();

  console.log(results);
}
