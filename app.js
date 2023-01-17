//DOM
const workButton = document.querySelector("#workButton");
const bankButton = document.querySelector("#bankButton");
const loanButton = document.querySelector("#getALoanButton");
const repayLoanButton = document.querySelector("#repayLoanButton");
const dropdownMenu = document.querySelector("#laptopDropdownList");
const buyNowButton = document.querySelector("#buyNowButton");
const payBalance = document.querySelector("#payBalance");
const bankBalance = document.querySelector("#bankBalance");
const loanBalance = document.querySelector("#loanBalance");

//Event listeners
workButton.addEventListener("click", increasePayBalance);
bankButton.addEventListener("click", transferWorkMoneyToBank);
loanButton.addEventListener("click", getALoan);
repayLoanButton.addEventListener("click", repayLoan);
buyNowButton.addEventListener("click", buyLaptop);

//Functions
function increasePayBalance() {
  payBalance.innerText = parseInt(payBalance.innerText) + 100;
}
function transferWorkMoneyToBank() {
  if(parseInt(loanBalance.innerText) === 0)
  {
    bankBalance.innerText = parseInt(payBalance.innerText) + parseInt(bankBalance.innerText);
    payBalance.innerText = 0;
  }
  else
  {
    if(parseInt(loanBalance.innerText) - (parseInt(payBalance.innerText) / 10) <= 0){

      bankBalance.innerText = (parseInt(bankBalance.innerText) + parseInt(payBalance.innerText)) - parseInt(loanBalance.innerText);
      loanBalance.innerText = 0;
      payBalance.innerText = 0;
      document.querySelector("#hiddenLoan").setAttribute("hidden", "hidden");
      document.querySelector("#repayLoanDiv").setAttribute("hidden", "hidden");
    }
    else{
      const mandatoryRepayOfLoan = parseInt(payBalance.innerText) / 10;

      bankBalance.innerText = (parseInt(payBalance.innerText) + parseInt(bankBalance.innerText)) - mandatoryRepayOfLoan;
      loanBalance.innerText = parseInt(loanBalance.innerText) - mandatoryRepayOfLoan;
  
      payBalance.innerText = 0;
    }
  }
}
function getALoan() {
  const requestedLoanNumber = parseInt(window.prompt("Type a number", ""));

  if (parseInt(loanBalance.innerText) === 0 && requestedLoanNumber <= parseInt(bankBalance.innerText) * 2 && requestedLoanNumber > 0) 
{
    loanBalance.innerText = requestedLoanNumber;
    bankBalance.innerText = parseInt(bankBalance.innerText) + requestedLoanNumber;
    document.querySelector("#hiddenLoan").removeAttribute("hidden");
    document.querySelector("#repayLoanDiv").removeAttribute("hidden");

  } else if (parseInt(loanBalance.innerText) > 0) {
    alert("You already have a loan you need to pay off.");
  } else if(requestedLoanNumber < 0) {
    alert("You can only use positive values.");
  } else if(isNaN(requestedLoanNumber)){
    alert("You can only use numbers.")
  } else{
    const maxLoan = parseInt(bankBalance.innerText) * 2;
    alert("That loan is too large. Max amount you can loan is: " + maxLoan)
  }
}
function repayLoan(){
  if(parseInt(loanBalance.innerText) - parseInt(payBalance.innerText) <= 0){

    const repayedLoanBelowZero = parseInt(loanBalance.innerText) - parseInt(payBalance.innerText);

    bankBalance.innerText = parseInt(bankBalance.innerText) + Math.abs(repayedLoanBelowZero);
    loanBalance.innerText = 0;

    document.querySelector("#hiddenLoan").setAttribute("hidden", "hidden");
    document.querySelector("#repayLoanDiv").setAttribute("hidden", "hidden");
  }
  else{
    loanBalance.innerText = parseInt(loanBalance.innerText) - parseInt(payBalance.innerText);
  }
  payBalance.innerText = 0;
}
function buyLaptop(){
  const laptopPrice = document.querySelector("#laptopPrice").innerText;
  const laptopName = document.querySelector("#laptopName").innerText;

  
  if(parseInt(bankBalance.innerText) >= parseInt(laptopPrice)){

    bankBalance.innerText = parseInt(bankBalance.innerText) - parseInt(laptopPrice);

    alert("Congratulations!\n\nYou succesfully bought a new laptop. \n\n" + laptopName + " is now yours!")
  }else{
    alert("You cannot afford that laptop at this time.\n\n You need: " + (parseInt(laptopPrice) - parseInt(bankBalance.innerText)) + " kr more.")
  }
}