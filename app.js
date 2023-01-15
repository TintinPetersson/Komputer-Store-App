//Query selectors
const workButton = document.querySelector("#workButton");
const bankButton = document.querySelector("#bankButton");
const loanButton = document.querySelector("#getALoanButton");
const repayLoanButton = document.querySelector("#repayLoanButton");
const dropdownMenu = document.querySelector("#laptopDropdownList");

let payBalance = document.querySelector("#payBalance");
let bankBalance = document.querySelector("#bankBalance");
let loanBalance = document.querySelector("#loanBalance");

//Event listeners
workButton.addEventListener("click", increasePayBalance);
bankButton.addEventListener("click", transferWorkMoneyToBank);
loanButton.addEventListener("click", getALoan);
repayLoanButton.addEventListener("click", repayLoan);

//Functions
function increasePayBalance() {
  payBalance.innerText = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", })
    .format(parseInt(payBalance.innerText) + 100);
}
function transferWorkMoneyToBank() {
  if(parseInt(loanBalance.innerText) === 0)
  {
    bankBalance.innerText = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK",})
      .format(parseInt(payBalance.innerText) + parseInt(bankBalance.innerText));
    payBalance.innerText = 0;
  }
  else
  {
    const mandatoryLoanAmount = parseInt(payBalance.innerText) / 10;

    bankBalance.innerText = parseInt(payBalance.innerText) + parseInt(bankBalance.innerText) - mandatoryLoanAmount;
    loanBalance.innerText = parseInt(loanBalance.innerText) - mandatoryLoanAmount;

    payBalance.innerText = 0;
  }

  if(parseInt(loanBalance.innerText) === 0)
  loanBalance.innerText = 0;
  document.querySelector("#hiddenLoan").setAttribute("hidden", "hidden");
  document.querySelector("#repayLoanDiv").setAttribute("hidden", "hidden");

}
function getALoan() {
  const requestedLoanNumber = Number(window.prompt("Type a number", ""));

  if (parseInt(loanBalance.innerText) === 0 && requestedLoanNumber <= parseInt(bankBalance.innerText) * 2) 
{
    loanBalance.innerText = new Intl.NumberFormat("sv-SE", {style: "currency", currency: "SEK",})
      .format(requestedLoanNumber);

    document.querySelector("#hiddenLoan").removeAttribute("hidden");
    document.querySelector("#repayLoanDiv").removeAttribute("hidden");

  } else if (parseInt(loanBalance.innerText) > 0) {
    alert("You already have a loan you need to pay off!");
  } else {
    alert("That loan is too large!");
  }
}
function repayLoan(){
  loanBalance.innerText =  new Intl.NumberFormat("sv-SE", {style: "currency", currency: "SEK",})
  .format(parseInt(loanBalance.innerText) - parseInt(payBalance.innerText));

  payBalance.innerText = 0;

  if(parseInt(loanBalance.innerText) === 0)
  document.querySelector("#hiddenLoan").setAttribute("hidden", "hidden");
  document.querySelector("#repayLoanDiv").setAttribute("hidden", "hidden");
}