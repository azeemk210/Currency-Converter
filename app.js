const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const fromCurr = document.querySelector(".from select").value;
const toCurr = document.querySelector(".to select").value;
const msg = document.querySelector(".msg");

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.textContent = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update the flag based on selected currency
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag = element.parentElement.querySelector("img");
    flag.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let fromCurr = document.querySelector(".from select").value;
    let toCurr = document.querySelector(".to select").value;

    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    // Use the new format: fetch from the base currency only
    const URL = `${baseURL}/${fromCurr.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    let finalAmount = amtValue*rate;
    msg.innerHTML = `${amtValue} ${fromCurr} = ${finalAmount} ${toCurr}`;
});


