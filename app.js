let workButton = document.querySelector("#workButton");
workButton.addEventListener("click", increasePayBalance);


function increasePayBalance() {
    let payBalance = 100;
    document.querySelector("#payBalance").innerHTML = payBalance;
    payBalance += 100;
}











//Using the async/await method
const laptopElement = document.getElementById(laptopName);

async function fetchLaptops(){
    try{
      const laptopResponse = await fetch("https://hickory-quilled-actress.glitch.me/computers");
      const laptops = await laptopResponse.json();
      return laptops;
    }
    catch (error)
    {
      console.log(error);
    }
}

const laptops = await fetchLaptops();

console.log(laptops[0].title); 

const oneLaptop = laptops.filter(laptop => laptop.id === 1);


// const newLaptopElement = document.createElement("p");
// newLaptopElement.innerText = oneLaptop[0].title;
// laptopElement.append(newLaptopElement);