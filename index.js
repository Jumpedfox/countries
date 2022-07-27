const input = document.querySelector('#input')
const body = document.querySelector('body')
const cName = document.querySelector('#name')
const cCapital = document.querySelector('#capital')
const cPopulation = document.querySelector('#population')
const cLanguages = document.querySelector('#languages')
const cFlag = document.querySelector('#flag')

const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
  }

function getCountry() {
  let countries = [];
  let languages = [];
  let datalist = [];
  let option;
  return fetch(`https://restcountries.com/v2/name/${input.value}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then((response) => {
      console.log(infodiv);
      if (response.length > 1 && response.length < 10) {
        cName.textContent = "";
        cCapital.textContent = "";
        cPopulation.textContent = "";
        cLanguages.textContent = "";
        cFlag.setAttribute('hidden', `true`)
        response.forEach((country) => countries.push(country));
        countries.forEach((country) => datalist.push(country.name));
        datalist.forEach(function(element) {
          option = document.createElement('li');
          option.textContent = element;
          cName.appendChild(option);
        });
        // console.log((cName));
      }
      else if (response.length <= 1) {
        response.forEach((country) => countries.push(country));
        cName.textContent = countries[0].name;
        cCapital.textContent = "Capital: " + countries[0].capital;
        cPopulation.textContent = "Population: " + countries[0].population + " ppl";
        let languageList = countries[0].languages;
        languageList.forEach((language) => languages.push(language.name));
        cLanguages.textContent = "Languages: " + languages;
        let flagPic = countries[0].flags.png;
        cFlag.removeAttribute('hidden')
        cFlag.setAttribute('src', `${flagPic}`)
      } else {
        cName.textContent = "";
        alert("Too many countries! Refine your request!");
      }
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

getCountry = debounce(getCountry, 500)

input.addEventListener('input', getCountry);
