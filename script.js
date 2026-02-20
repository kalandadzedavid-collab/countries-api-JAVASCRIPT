const countryUrl = `https://restcountries.com/v3.1/alpha/BEL?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;

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

let countries = [];
let filteredCountries = [];

async function displayCountries() {
  countries = await getCountries();

  console.log(countries);

  let finalString = ``;
  countries.forEach((country) => {
    const template = `
    <div class="country" id="${country.cca3}">
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

console.log(countries);

displayCountries();

document.querySelector(".countries").addEventListener("click", (e) => {
  let country = e.target.closest(".country");
  let countryId = country.id;
  console.log(countryId);

  window.location.href = `details.html?id=${countryId}`;
});

document.querySelector(".searchbar").addEventListener("input", (e) => {
  e.preventDefault();

  let input = document.querySelector(".searchtext").value;

  filteredCountries = countries.filter((c) => {
    return c.name.common.includes(input);
  });
  console.log(filteredCountries);
});
