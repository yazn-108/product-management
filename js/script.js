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
let productData = JSON.parse(localStorage.getItem("localData")) || [];
submit.addEventListener("click", () => {
    let productObject = {
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
            for(let i = 0; i < count.value; i++) {productData.push(productObject);};
        }else{productData.push(productObject);};
        
    } else {
        productData[tmp] = productObject;
        systemMode = "create";
        count.style.pointerEvents = "";
    };
    localStorage.setItem("localData",JSON.stringify(productData));
    shoData();
    document.querySelectorAll(".inputs input").forEach(e => e.value = "");
    total.innerHTML = "";
});
function shoData(){
    let items = "";
    for(let i=0; i < productData.length; i++){
        items +=`
        <tr>
            <td>${i+1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
        </tr>`
    };
    document.querySelector("tbody").innerHTML = items;
    productData.length > 0
    ?document.querySelector("#deleteAll").innerHTML = 
    `<button onclick="deleteAll()">delete All (${productData.length})</button>`
    :document.querySelector("#deleteAll").innerHTML = "";
};
shoData();
function deleteProduct(i){
    productData.splice(i,1)
    localStorage.setItem("localData",JSON.stringify(productData));
    shoData();
};
function deleteAll(){
    localStorage.clear();
    productData.splice(0);
    shoData();
};
function updateProduct(i){
    tmp = i
    title.value = productData[i].title;
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    discount.value = productData[i].discount;
    total.innerHTML = productData[i].total;
    category.value = productData[i].category;
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
        shoData();
    });
});
let searchValue = document.querySelector(".outputs #search");
searchValue.addEventListener("keyup", () => {
    let items = "";
    for(var i = 0; i < productData.length; i++){
        if(searchMode == "search-by-title"){
            if(productData[i].title.includes(searchValue.value.toLowerCase())){
                items += `
                <tr>
                    <td>${i}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`
            };
        }else{
            if(productData[i].category.includes(searchValue.value.toLowerCase())){
                items += `
                <tr>
                    <td>${i}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>` 
            };
        };
    };
    document.querySelector("table tbody").innerHTML = items;  
});
