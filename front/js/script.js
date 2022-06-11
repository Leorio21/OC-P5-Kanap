function collectProduct() {
    return fetch("http://localhost:3000/api/products")
}

function displayProducts() {
    collectProduct()
    .then(function(res) {
        return res.json()
    })
    .then(function(productsList){
        for (let i in productsList ) {

            let elemLink = document.createElement("a");
            let elemArticle = document.createElement("article");
            let elemIllustration = document.createElement("img");
            let elemTitle = document.createElement("h3");
            let elemDescription = document.createElement("p");

            elemIllustration.setAttribute("src", productsList[i].imageUrl);
            elemIllustration.setAttribute("alt", productsList[i].altTxt);

            elemTitle.setAttribute("class", "ProductName");
            elemTitle.textContent = productsList[i].name;

            elemDescription.setAttribute("class", "productDescription");
            elemDescription.textContent = productsList[i].description;

            elemLink.setAttribute("href", "./product.html?id=" + productsList[i]._id);

            elemArticle.appendChild(elemIllustration);
            elemArticle.appendChild(elemTitle);
            elemArticle.appendChild(elemDescription);

            elemLink.appendChild(elemArticle);
            

            document.getElementById("items").appendChild(elemLink);
        }
    })
}

displayProducts();


/*
let obj1 = {
    "name" : "toto",
    "id" : 1,
    "color" : "blue",
    "qty" : 1
}

let obj2 = {
    "name" : "toto",
    "id" : 1,
    "color" : "red",
    "qty" : 1
}


let obj3 = {
    "name" : "titi",
    "id" : 2,
    "color" : "red",
    "qty" : 1
}

let obj4 = {
    "name" : "toto",
    "id" : 1,
    "color" : "red"
}

let obj5 = {
    "name" : "toto",
    "id" : 1,
    "color" : "green"
}

let obj6 = {
    "name" : "tata",
    "id" : 3,
    "color" : "red"
}

let array = []

array.push(obj1)
array.push(obj2)
array.push(obj3)

console.log(array)

let arrayJson = JSON.stringify(array)

console.log(arrayJson)

let inCart = false;

let jsonToArray = JSON.parse(arrayJson, (prop, val) => {
    if (val.id == obj4.id && val.color == obj4.color) {
        val.qty++
        inCart = true
    }
})

if (!inCart) {
    jsonToArray.push(obj4)
}

console.log(jsonToArray)*/