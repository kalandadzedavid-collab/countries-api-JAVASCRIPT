const urlObj = new URLSearchParams(window.location.search);
let countryId = urlObj.get("id");

async function getDetails() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryId}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
    );

    if (!response.ok) {
      throw new Error("something went wrong");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function displayCoutry() {
  const country = await getDetails();
  document.querySelector(".flag").setAttribute("src", `${country.flags?.svg}`);
  document.querySelector("h2").textContent = country.name.common;
  document.querySelector(".infodiv").innerHTML = displayText(country);
}

displayCoutry();

function displayText(info) {
  return ` <div>
              <p>Native Name: <span>${
                info.name.nativeName?.[Object.keys(info.name.nativeName)[0]]
                  ?.common || "N/A"
              }</span></p>
              <p>Population: <span>${info.population}</span></p>
              <p>Region: <span>${info.region}</span></p>
              <p>Sub Region: <span>${info.subregion}</span></p>
              <p>Capital: <span>${info.capital}</span></p>
            </div>
            <div>
              <p>Top Level Domain: <span>${info.tld}</span></p>
              <p>Currencies: <span>${
                info.currencies?.[Object.keys(info.currencies)[0]]?.name ||
                "N/a"
              }</span></p>
              <p>Languages: <span>${
                Object.values(info.languages || {}).join(", ") || "N/A"
              }</span></p>
            </div>
            `;
}
