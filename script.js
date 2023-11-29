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
      const astrosSort = bodies.sort((a, b) => b.meanRadius - a.meanRadius);
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
        const separados = planetas.reduce((acc, planeta) => {
          const tipo = planeta.bodyType;
          acc[tipo] = acc[tipo] || [];
          acc[tipo].push(planeta);
          return acc;
        }, {});

        return separados;
      }
      function separadorTipoTres(planetas) {
        const separados = planetas.reduce((acc, planeta) => {
          const tipo = planeta.bodyType;
          acc[tipo] = acc[tipo] || [];

          if (acc[tipo].length < 3) {
            acc[tipo].push(planeta);
          }

          return acc;
        }, {});

        return separados;
      }
      const separadinhos = separadorTipo(bodies);
      console.log(separadinhos);

      const astrosOrdenadosPorTipo = astrosSort.sort((a, b) =>
        a.bodyType.localeCompare(b.bodyType)
      );
      console.log(
        "Aqui tá separado por tipo e massa ",
        separadorTipoTres(astrosOrdenadosPorTipo)
      );

      const corposOrbitados = bodies.filter((x) => x.aroundPlanet != null);
      const planetasOrbitados = corposOrbitados.reduce((acc, planeta) => {
        const nomeDoPlaneta = planeta.aroundPlanet.planet;
        acc[nomeDoPlaneta] = acc[nomeDoPlaneta] || [];
        acc[nomeDoPlaneta].push(planeta.englishName);
        return acc;
      }, {});
      console.log(planetasOrbitados);
      const massaTodos = planetas.reduce((acc, planeta) => {
        acc += planeta.mass.massValue;
        return acc;
      }, 0);
      console.log(
        "A media da massa de todos é :",
        massaTodos / planetas.length
      );

      const satEPlut = bodies.filter(
        (x) => x.englishName == "Saturn" || x.englishName == "Pluto"
      );
      console.log(
        "A menor distancia é ",
        satEPlut[0].perihelion - satEPlut[1].perihelion
      );
      console.log(
        "A menor distancia media é ",
        Math.abs(
          (satEPlut[0].perihelion + satEPlut[0].aphelion) / 2 -
            (satEPlut[1].perihelion + satEPlut[1].aphelion) / 2
        )
      );
    })

    .catch((error) => {
      console.log(error.message);
    });
}

fetchAdd();
