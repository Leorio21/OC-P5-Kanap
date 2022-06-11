async function fetchProduct(id = "") {
    const products= await fetch(`http://localhost:3000/api/products/${id}`)
    return products.json();
}

async function displayProducts() {
    const products = await fetchProduct()

    for (let product of products ) {

        const elemLink = document.createElement("a");
        const elemArticle = document.createElement("article");
        const elemIllustration = document.createElement("img");
        const elemTitle = document.createElement("h3");
        const elemDescription = document.createElement("p");

        elemIllustration.setAttribute("src", product.imageUrl);
        elemIllustration.setAttribute("alt", product.altTxt);

        elemTitle.setAttribute("class", "ProductName");
        elemTitle.textContent = product.name;

        elemDescription.setAttribute("class", "productDescription");
        elemDescription.textContent = product.description;

        elemLink.setAttribute("href", `./product.html?id=${product._id}`);

        elemArticle.appendChild(elemIllustration);
        elemArticle.appendChild(elemTitle);
        elemArticle.appendChild(elemDescription);

        elemLink.appendChild(elemArticle);
        

        document.getElementById("items").appendChild(elemLink);
    }
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