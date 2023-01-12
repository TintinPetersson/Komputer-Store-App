//Query selectors
const workButton = document.querySelector("#workButton");
const bankButton = document.querySelector("#bankButton");
const loanButton = document.querySelector("#getALoanButton");
const dropdownMenu = document.querySelector("#laptopDropdownList");

let payBalance = document.querySelector("#payBalance");
let bankBalance = document.querySelector("#bankBalance");
let loanBalance = document.querySelector("#loanBalance");

//Event listeners
workButton.addEventListener("click", increasePayBalance);
bankButton.addEventListener("click", transferWorkMoneyToBank);
loanButton.addEventListener("click", getALoan);

//Functions
function increasePayBalance() {
  payBalance.innerText = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(parseInt(payBalance.innerText) + 100);
}

function transferWorkMoneyToBank() {
  bankBalance.innerText = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(parseInt(payBalance.innerText) + parseInt(bankBalance.innerText));
  payBalance.innerText = 0;
}

function getALoan() {
  const requestedLoanNumber = Number(window.prompt("Type a number", ""));

  if (
    parseInt(loanBalance.innerText) === 0 &&
    requestedLoanNumber <= parseInt(bankBalance.innerText) * 2
  ) {
    loanBalance.innerText = new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
    }).format(requestedLoanNumber);
    document.querySelector("#hiddenLoan").removeAttribute("hidden");
    document.querySelector("#repayLoanButton").removeAttribute("hidden");
  } else if (parseInt(loanBalance.innerText) > 0) {
    alert("You already have a loan you need to pay off!");
  } else {
    alert("That loan is too large!");
  }
}

//Using the async/await method
const laptopElement = document.getElementById(laptopName);

async function fetchLaptops() {
  try {
    const laptopResponse = await fetch(
      "https://hickory-quilled-actress.glitch.me/computers"
    );
    const laptops = await laptopResponse.json();
    return laptops;
  } catch (error) {
    console.log(error);
  }
}

const laptops = await fetchLaptops();

const addToDropDown = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  dropdownMenu.appendChild(laptopElement);
};

laptops.forEach((c) => addToDropDown(c));

function onChange() {
  let value = dropdownMenu.value;
  let text = dropdownMenu.options[dropdownMenu.selectedIndex].text;

  document.querySelector("#laptopPrice").innerText = new Intl.NumberFormat(
    "sv-SE",
    {
      style: "currency",
      currency: "SEK",
    }
  ).format(parseInt(laptops[value - 1].price));

  // const newLaptopElement = document.createElement("li");
  document.querySelector("#featureList").innerText = laptops[value - 1].specs;
  document.querySelector("#laptopName").innerText = laptops[value - 1].title;
  document.querySelector("#laptopInfo").innerText =
    laptops[value - 1].description;
  document.querySelector("#laptopImage").src =
    laptops[value - 1].image.toString();
}

dropdownMenu.onchange = onChange;
onChange();

// const newLaptopElement = document.createElement("p");
// newLaptopElement.innerText = oneLaptop[0].title;
// laptopElement.append(newLaptopElement);
