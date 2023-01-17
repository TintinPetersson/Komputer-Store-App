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


//Event listener
dropdownMenu.addEventListener("change", onDropdownChange);

//Functions
const addToDropdown = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  dropdownMenu.appendChild(laptopElement);
};
function addSpecsToFeatureList(spec) {
  const featureListElement = document.createElement("li");
  featureListElement.innerText = spec;
  document.querySelector("#featureList").append(featureListElement);
}
function onDropdownChange() {

  const value = dropdownMenu.value - 1;

  document.querySelector("#featureList").innerText = "";
  document.querySelector("#laptopPrice").innerText = laptops[value].price;
  document.querySelector("#laptopName").innerText = laptops[value].title;
  document.querySelector("#laptopInfo").innerText = laptops[value].description;
  laptops[value].specs.forEach(c => addSpecsToFeatureList(c));

  //Fetch picture and change url from jpg to png, and vice versa, if needed.
  fetch("https://hickory-quilled-actress.glitch.me/" + laptops[value].image, { method: "HEAD" })
    .then(res => {
      if (res.ok)
        document.querySelector("#laptopImage").src = "https://hickory-quilled-actress.glitch.me/" + laptops[value].image;
      else {

        if (laptops[value].image.includes(".jpg")) {
          laptops[value].image = laptops[value].image.replace(".jpg", ".png")
          document.querySelector("#laptopImage").src = "https://hickory-quilled-actress.glitch.me/" + laptops[value].image;
        }
        else {
          laptops[value].image.replace(".png", ".jpg")
          document.querySelector("#laptopImage").src = "https://hickory-quilled-actress.glitch.me/" + laptops[value].image;
        }
      }
    })
    .catch(err => console.log('Error:', err))
}

laptops.forEach((c) => addToDropdown(c));
//Initialization one time in order to fill the information about a laptop, on load. Before one is selected.
onDropdownChange();