"use strict";
let
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
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }else{
        total.innerHTML = '';
    };
};
let productData = JSON.parse(localStorage.getItem("productsData")) || [];
submit.addEventListener("click",() => {
    if(price.value != ""){
        let productObject = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }; 
        if(systemMode === "create"){
            if(productObject.count > 1){
                for(let i = 0; i < productObject.count; i++){
                    productData.push(productObject);
                };
            }else{productData.push(productObject);};
        }else{
            productData[tmp] = productObject;
            systemMode = "create";
            submit.innerHTML = systemMode;
            count.style.pointerEvents = "";
        };
        localStorage.setItem("productsData",JSON.stringify(productData));
        clearInputs();
        showData();
    }else{
        price.focus();
    };
});
function clearInputs(){
    document.querySelectorAll(".inputs input").forEach(e => e.value = "");
    total.innerHTML = '';
};
function showData(){
    let product = '';
    for(let i = 0; i < productData.length; i++){
        product += `
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
        </tr>
    `};
    document.querySelector("table tbody").innerHTML = product;
    let deleteAll = document.querySelector("#deleteAll");
    productData.length > 0
        ?deleteAll.innerHTML = `<button onclick="deleteAll()">Delete all (${productData.length})</button>`
        :deleteAll.innerHTML = "";
};
showData();
function deleteProduct(i){
    if(systemMode == "create"){
        productData.splice(i,1);
        localStorage.productsData = JSON.stringify(productData);
        showData();
    };
};
function deleteAll(){
    if(systemMode == "create"){
        localStorage.clear();
        productData.splice(0);
        showData();
    };
};
function updateProduct(i){
    tmp = i;
    title.value = productData[i].title
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    discount.value = productData[i].discount;
    total.innerHTML = productData[i].total;
    count.style.pointerEvents = "none";
    category.value = productData[i].category;
    systemMode = "update";
    submit.innerHTML = systemMode;
    scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
function getSearchMode(id){
    id == 'search-by-title'?searchMode = id:searchMode = id;
    document.querySelector('#search').placeholder = searchMode.replace(/\W/g, ' ');
    document.querySelector('#search').focus();
    document.querySelector('#search').value = "";
    showData();
};
function searchData(value){
    let product = "";
    for(var i = 0; i < productData.length; i++){
        if(searchMode == "search-by-title"){
            if(productData[i].title.includes(value.toLowerCase())){
                product += `
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
            if(productData[i].category.includes(value.toLowerCase())){
                product += `
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
    document.querySelector("table tbody").innerHTML = product;
};