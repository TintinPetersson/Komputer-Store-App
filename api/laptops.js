//Using the async/await method
async function fetchLaptops() {
  try {
    const laptopResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers");
    const laptops = await laptopResponse.json();
    return laptops;
  } catch (error) {
    console.log(error);
  }
}
const laptops = await fetchLaptops();



//DOM
const laptopElement = document.getElementById(laptopName);

dropdownMenu.addEventListener("change", onDropDownChange);

const addToDropDown = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  dropdownMenu.appendChild(laptopElement);
};

laptops.forEach((c) => addToDropDown(c));

function addToFeatureList(spec){
  const featureElement = document.createElement("li");
  featureElement.innerText = spec;
  document.querySelector("#featureList").append(featureElement);
}

function onDropDownChange() {
  let value = dropdownMenu.value;
  document.querySelector("#featureList").innerText = "";

  document.querySelector("#laptopPrice").innerText = new Intl.NumberFormat("sv-SE",{style: "currency",currency: "SEK",}).format(laptops[value - 1].price);
  laptops[value - 1].specs.forEach(c => addToFeatureList(c));
  document.querySelector("#laptopName").innerText = laptops[value - 1].title;
  document.querySelector("#laptopInfo").innerText = laptops[value - 1].description;
  document.querySelector("#laptopImage").src = "https://hickory-quilled-actress.glitch.me/"+ laptops[value - 1].image;
}

onDropDownChange();