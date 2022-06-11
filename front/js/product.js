/**
 * It fetches a product from the server and returns the product as a JSON object.
 * @param [id] - The id of the product you want to fetch.
 * @returns A promise that resolves to the product.json()
 */
async function fetchProduct(id = "") {
    const product = await fetch(`http://localhost:3000/api/products/${id}`);
    return product.json();
}

/**
 * It fetches the product data from the server, then it updates the page with the product data.
 */
async function displayProduct() {

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    const product = await fetchProduct(id)

    setCurrentProductId(id)

    document.querySelector("head > title").innerHTML = product.name;

    const elemIllustration = document.createElement("img");

    elemIllustration.setAttribute("src", product.imageUrl);
    elemIllustration.setAttribute("alt", product.altTxt);

    document.querySelector(".item .item__img").appendChild(elemIllustration);

    document.getElementById("title").textContent = product.name;

    document.getElementById("price").textContent = product.price;

    document.getElementById("description").textContent = product.description;

    for (let color of product.colors) {
        const elemOption = document.createElement("option");

        elemOption.setAttribute("value", color);
        elemOption.textContent = color;

        document.getElementById("colors").appendChild(elemOption);
    }

}

/**
 * It takes a product id and stores it in local storage.
 * @param id - the id of the product
 */
function setCurrentProductId(id) {
    localStorage.setItem("currentProduct", JSON.stringify(id))
}

/**
 * It gets the current product id from local storage.
 * @param id - the id of the product
 * @returns The current product id.
 */
function getCurrentProductId(id) {
    return JSON.parse(localStorage.getItem("currentProduct"))
}

/**
 * If there's a cart in localStorage, get it and parse it into an array. Otherwise, return an empty
 * array.
 * @returns The cart array.
 */
function getCart() {
    let cart = []

    if (localStorage.getItem("myCart")) {
        cart = JSON.parse(localStorage.getItem("myCart"))
    }

    return cart
}

/**
 * If the product is already in the cart, increase the quantity, otherwise add the product to the cart.
 * @param newProduct - {
 */
function addToCart(newProduct) {
    let inCart = false
    let myCart = getCart()

    for (const product of myCart) {
        if (product.id == newProduct.id && product.color == newProduct.color) {
            product.quantity = product.quantity + newProduct.quantity
            inCart = true
        }
    }

    if (!inCart) {
        myCart.push(newProduct)
    }

    localStorage.setItem("myCart", JSON.stringify(myCart))
}

/* Adding an event listener to the button with the id "addToCart". */
document.getElementById("addToCart").onclick = function() {
    let quantityValid = false
    let colorValid = false
    let textAlert = ""

    const quantity = parseInt(document.getElementById("quantity").value)

    
    if (document.getElementById("colors").value) {
        colorValid = true
    } else {
        textAlert += "Vous devez choisir une couleur\n"
    }
    
    if (quantity > 0 && quantity <= 100) {
        quantityValid = true
    } else {
        textAlert += "Vous devez saisir une quantité d'article entre 1 et 100\n"
    }

    if (colorValid && quantityValid) {
        let product = {id: "", color: "", quantity: 0}

        product.id = getCurrentProductId()
        product.color = document.getElementById("colors").value
        product.quantity = quantity

        addToCart(product)
    } else {
        alert(textAlert)
    }
}

displayProduct();