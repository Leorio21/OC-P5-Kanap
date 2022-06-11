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

async function displayProducts() {

    const myCart = getCart()

    let totalQuantity = 0
    let totalPrice = 0

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
    }
    
}

displayProducts()