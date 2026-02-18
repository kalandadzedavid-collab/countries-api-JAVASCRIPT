async function getCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,cca3"
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayCountries() {
  const countries = await getCountries();

  let finalString = ``;
  countries.forEach((country) => {
    const template = `
    <div class="country">
                <img src="${country.flags.svg}" alt="">
                <div class="card-info">
                    <h2>${country.name.common}</h2>
                    <p>Population: <span>${country.population}</span></p>
                    <p>Region: <span>${country.region}</span></p>
                    <p>Capital: <span>${country.capital}</span></p>
                </div>
            </div>
    `;

    finalString += template;
  });

  document.querySelector(".countries").innerHTML = finalString;
}

displayCountries();
