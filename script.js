const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

// 🌍 Currency list
const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "FR",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  JPY: "JP",
  CNY: "CN",
};

// 🔽 Populate dropdowns
for (let select of dropdowns) {
  for (let curr in countryList) {
    let option = document.createElement("option");
    option.value = curr;
    option.innerText = curr;

    if (select.name === "from" && curr === "USD") {
      option.selected = "selected";
    }
    if (select.name === "to" && curr === "INR") {
      option.selected = "selected";
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// 🚩 Update Flag
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

// 💱 Fetch Exchange Rate
async function updateExchangeRate() {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  let fromCurr = document.querySelector("[name='from']").value;
  let toCurr = document.querySelector("[name='to']").value;

  const URL = BASE_URL + fromCurr;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data.rates[toCurr];
  let finalAmount = amtVal * rate;
  console.log("Rate:", rate);
  console.log("Amount:", amtVal);
  console.log("Final:", finalAmount);

  msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`;
  console.log(`${amtVal} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`);
}

// 🔘 Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// 🚀 Load default
window.addEventListener("load", updateExchangeRate);
