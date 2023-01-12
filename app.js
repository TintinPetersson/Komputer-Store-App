let workButton = document.querySelector("#workButton");
workButton.addEventListener("click", increasePayBalance);


function increasePayBalance() {
    let payBalance = 100;
    document.querySelector("#payBalance").innerHTML = payBalance;
    payBalance += 100;
}








const url = 'https://hickory-quilled-actress.glitch.me/computers';

fetch(url)
    .then((response) => {
        console.log(response)
      return response.json();
    })