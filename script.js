function fetchAdd() {
  //   let cep = Number(prompt("Qual seu cep?"));

  axios
    .get(
      `https://api.le-systeme-solaire.net/rest/bodies/
    `
    )
    .then((res) => {
      const bodies = res.data.bodies;
      const planetas = bodies.filter((x) => x.isPlanet == true);
      console.log(planetas);
      const terra = planetas.find((x) => x.englishName == "Earth");
      console.log(terra);
      const lua = planetas.some((x) => x.moons == null);
      console.log(lua);
      const planetaNomes = planetas.map((x) => x.englishName);
      console.log(planetaNomes);
      const planetasSort = planetas.sort((a, b) => a.meanRadius - b.meanRadius);
      const planetasSortName = planetasSort.map((x) => x.englishName);
      console.log(planetasSortName);
      const planetasVirgula = planetasSortName.join(", ");
      console.log(planetasVirgula);
      const planetaCompacto = planetasSort.reduce((acc, value, i) => {
        if (i < 5) {
          acc += value.mass.massValue;
        }
        return acc;
      }, 0);
      console.log(planetaCompacto);
      const aneisEluas = planetas.filter(
        (x) => x.moons != null && x.moons.length > 2 && x.density > 1
      );

      console.log(aneisEluas);
      const descobertaData = bodies
        .filter((x) => x.discoveryDate != "")
        .sort((a, b) => {
          const dateA = new Date(
            a.discoveryDate.split("/").reverse().join("-")
          );
          const dateB = new Date(
            b.discoveryDate.split("/").reverse().join("-")
          );

          return dateA - dateB;
        });
      descobertaData.forEach((x) => {
        console.log(
          `Nome do Astro: ${x.englishName}\nData de descoberta: ${x.discoveryDate}`
        );
      });

      function encontrarPlaneta() {
        const nomePlaneta = prompt("Digite o nome do planeta");
        const encontrado = planetas.find((x) => x.englishName === nomePlaneta);

        return console.log(
          `---${encontrado.englishName}---\nDistancia do sol: ${encontrado.perihelion}km\nA massa do planeta: ${encontrado.mass.massValue}\nA gravidade do planeta: ${encontrado.gravity}\nA densidade do planeta: ${encontrado.density}`
        );
      }
      //encontrarPlaneta();
      const filtroPlanetas = planetas
        .filter((x) => x.avgTemp >= 281 && x.avgTemp <= 303)
        .sort((a, b) => a.avgTemp - b.avgTemp);
      console.log(`Planetas com temperatura entre 8 e 30`);
      filtroPlanetas.forEach((x) => {
        console.log(
          `Nome do planeta: ${x.englishName} - Temperatura: ${x.avgTemp - 273}`
        );
      });

      function separadorTipo(planetas) {
        const separados = [];
        planetas.forEach((x) => {
          const tipo = x.bodyType;
          if (!separados[tipo]) {
            separados[tipo] = [];
          }
          separados[tipo].push(x);
        });
        return separados;
      }
      const separadinhos = separadorTipo(bodies);
      console.log(separadinhos);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

fetchAdd();

let arrayBruno = new Array(1, 2, 3, 4, 5);

$arr = [1, 2, 3, 4];

axios
