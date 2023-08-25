"use strict";
let
allPriceInputs = document.querySelectorAll(".inputs .price input"),
title = document.querySelector(".inputs #title"),
price = document.querySelector(".inputs #price"),
taxes = document.querySelector(".inputs #taxes"),
ads = document.querySelector(".inputs #ads"),
discount = document.querySelector(".inputs #discount"),
total = document.querySelector(".inputs #total"),
count = document.querySelector(".inputs #count"),
category = document.querySelector(".inputs #category"),
submit = document.querySelector(".inputs #submit");
let systemMode = "create";
let tmp;
let searchMode = "search-by-title";
allPriceInputs.forEach(input => {
    input.addEventListener("keyup",() => {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
    });
});
let proData = JSON.parse(localStorage.getItem("localData")) || [];
submit.addEventListener("click", () => {
    let object = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    if (systemMode == "create") {
        if(count.value > 1){
            for(let i = 0; i < count.value; i++) {proData.push(object);};
        }else{proData.push(object);};
        
    } else {
        proData[tmp] = object;
        systemMode = "create";
        count.style.pointerEvents = "";
    };
    localStorage.setItem("localData",JSON.stringify(proData));
    show();
    document.querySelectorAll(".inputs input").forEach(e => e.value = "");
    total.innerHTML = "";
});
function show(){
    let items = "";
    for(let i=0; i < proData.length; i++){
        items +=`
        <tr>
            <td>${i+1}</td>
            <td>${proData[i].title}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].total}</td>
            <td>${proData[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
        </tr>`
    };
    document.querySelector("tbody").innerHTML = items;
    proData.length > 0
    ?document.querySelector("#deleteAll").innerHTML = 
    `<button onclick="deleteAll()">delete All (${proData.length})</button>`
    :document.querySelector("#deleteAll").innerHTML = "";
};
show();
function deleteProduct(i){
    proData.splice(i,1)
    localStorage.setItem("localData",JSON.stringify(proData));
    show();
};
function deleteAll(){
    localStorage.clear();
    proData.splice(0);
    show();
};
function updateProduct(i){
    tmp = i
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value = proData[i].ads;
    discount.value = proData[i].discount;
    total.innerHTML = proData[i].total;
    category.value = proData[i].category;
    count.style.pointerEvents = "none";
    systemMode = "update";
    submit.innerHTML = systemMode;
    scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
let searchButtons = document.querySelectorAll('.search-buttons button');
let searchInput = document.querySelector('.outputs #search');
searchButtons.forEach(button => {
    button.addEventListener('click',buttonId => {
        let id = buttonId.target.id;
        id == 'search-by-title'?searchMode = id:searchMode = id;
        searchInput.placeholder = searchMode.replace(/\W/g, ' ');
        searchInput.focus();
        searchInput.value = "";
        show();
    });
});
let searchValue = document.querySelector(".outputs #search");
searchValue.addEventListener("keyup", () => {
    let items = "";
    for(var i = 0; i < proData.length; i++){
        if(searchMode == "search-by-title"){
            if(proData[i].title.includes(searchValue.value.toLowerCase())){
                items += `
                <tr>
                    <td>${i}</td>
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`
            };
        }else{
            if(proData[i].category.includes(searchValue.value.toLowerCase())){
                items += `
                <tr>
                    <td>${i}</td>
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>` 
            };
        };
    };
    document.querySelector("table tbody").innerHTML = items;  
});
