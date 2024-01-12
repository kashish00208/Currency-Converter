const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select")

let btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const msg = document.querySelector(".msg")
const toCurr = document.querySelector(".To select");

window.addEventListener("load",()=>{
    UpdateExchange();
})

for(let select of dropdown){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        select.append(newOption);
        if(select.name === 'from' && currcode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === 'to' && currcode === "INR"){
            newOption.selected = "selected"
        }
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    UpdateExchange();
})
const UpdateExchange = async() =>{
    let amount = document.querySelector(".input")
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<1){
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmt = amtVal * rate;
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `
} 