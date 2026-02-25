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

  let borders = country.borders.map((c) => `<button>${c}</button>`).join("");
  document.querySelector(
    ".border"
  ).innerHTML = `<p>Border Countries:</p> ${borders}`;
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

applyTheme();

document.querySelectorAll(".dark-light-mode").forEach((i) => {
  i.addEventListener("click", () => {
    document.querySelectorAll(".dark-light-mode").forEach((i) => {
      i.classList.toggle("hidden");
    });
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("isDark", true);
    } else {
      localStorage.setItem("isDark", false);
    }
  });
});

function applyTheme() {
  const darkImg = document.querySelector("#darkimg");
  const whiteImg = document.querySelector("#whiteimg");

  if (localStorage.getItem("isDark") === "true") {
    document.body.classList.add("dark");
    darkImg?.classList.remove("hidden");
    whiteImg?.classList.add("hidden");
  } else {
    document.body.classList.remove("dark");
    darkImg?.classList.add("hidden");
    whiteImg?.classList.remove("hidden");
  }
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    applyTheme();
  }
});
