/**
 * It fetches a product from the server and returns the product as a JSON object.
 * @param [id] - The id of the product you want to fetch.
 * @returns A promise that resolves to the product.json()
 */
 async function fetchProduct(id = "") {
    const product = await fetch(`http://localhost:3000/api/products/${id}`)
    return product.json()
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
 * It clears the cart by setting the innerHTML of the cart__items element to an empty string.
 */
function displayClear() {
    document.getElementById("cart__items").innerHTML = ""
}


function updateCart(id, color, quantity) {
    myCart = getCart()
    
    for (const product of myCart) {
        if (product.id == id && product.color == color) {
            product.quantity = quantity
        }
    }

    localStorage.setItem("myCart", JSON.stringify(myCart))
}

/**
 * It displays the products in the cart
 */
async function displayProducts() {

    const myCart = getCart()

    let totalQuantity = 0
    let totalPrice = 0

    let pos = 0

    for (let cartProduct of myCart) {
        const product = await fetchProduct(cartProduct.id)

        totalQuantity += cartProduct.quantity
        totalPrice += (product.price * cartProduct.quantity)

        const articleElem = document.createElement("article")
        articleElem.setAttribute("class", "cart__item")
        articleElem.setAttribute("data-id", cartProduct.id)
        articleElem.setAttribute("data-color", cartProduct.color)

        const divImgElem = document.createElement("div")
        divImgElem.setAttribute("class", "cart__item__img")

        const imgElem = document.createElement("img")
        imgElem.setAttribute("src", product.imageUrl)
        imgElem.setAttribute("atl", product.altTxt)

        divImgElem.appendChild(imgElem)

        const divContentElem = document.createElement("div")
        divContentElem.setAttribute("class", "cart__item__content")

        const divDescriptionElem = document.createElement("div")
        divDescriptionElem.setAttribute("class", "cart__item__content__description")

        const titleElem = document.createElement("h2")
        titleElem.innerHTML = product.name

        const colorElem = document.createElement("p")
        colorElem.innerHTML = cartProduct.color

        const priceElem = document.createElement("p")
        priceElem.innerHTML = `${product.price},00 €`

        divDescriptionElem.appendChild(titleElem)
        divDescriptionElem.appendChild(colorElem)
        divDescriptionElem.appendChild(priceElem)

        const divSettingsElem = document.createElement("div")
        divSettingsElem.setAttribute("class", "cart__item__content__settings")

        const divQuantityElem = document.createElement("div")
        divQuantityElem.setAttribute("class", "cart__item__content__settings__quantity")

        const quantityElem = document.createElement("p")
        quantityElem.innerHTML = "Qté : "

        const inputQuantityElem = document.createElement("input")
        inputQuantityElem.setAttribute("type", "number")
        inputQuantityElem.setAttribute("class", "itemQuantity")
        inputQuantityElem.setAttribute("name", "itemQuantity")
        inputQuantityElem.setAttribute("min", "1")
        inputQuantityElem.setAttribute("max", "100")
        inputQuantityElem.setAttribute("value", cartProduct.quantity)
        inputQuantityElem.addEventListener('change', (event) => {
            let quantity = parseInt(inputQuantityElem.value)
            if (quantity > 0 && quantity <= 100) {
                updateCart(cartProduct.id, cartProduct.color, quantity)
                displayClear()
                displayProducts()
            } else {
                alert("Vous devez saisir une quantité d'article entre 1 et 100")
            }
        })

        divQuantityElem.appendChild(quantityElem)
        divQuantityElem.appendChild(inputQuantityElem)

        const divDeleteElem = document.createElement("div")
        divDeleteElem.setAttribute("class", "cart__item__content__settings__delete")

        const deleteElem  = document.createElement("p")
        deleteElem.setAttribute("class", "deleteItem")
        deleteElem.innerHTML = "Supprimer"

        divDeleteElem.appendChild(deleteElem)

        divSettingsElem.appendChild(divQuantityElem)
        divSettingsElem.appendChild(divDeleteElem)

        divContentElem.appendChild(divDescriptionElem)
        divContentElem.appendChild(divSettingsElem)

        articleElem.appendChild(divImgElem)
        articleElem.appendChild(divContentElem)

        document.getElementById("cart__items").appendChild(articleElem)
        document.getElementById("totalQuantity").innerHTML = totalQuantity
        document.getElementById("totalPrice").innerHTML = totalPrice

        pos++
    }
    
}
/*
document.getElementsByClassName("itemQuantity").onclick = function() {
    alert("click")
}

/*document.getElementById("totalPrice").onclick = function() {
    document.getElementById("cart__items").innerHTML= ""
    displayProducts()
}*/

displayProducts()