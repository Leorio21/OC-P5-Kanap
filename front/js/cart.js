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

/**
 * It removes an item from the cart by finding the item with the matching id and color and then
 * removing it.
 * @param id - the id of the product
 * @param color - the color of the item
 */
function removeHtmlItem(id, color) {
    const elem = document.getElementsByClassName("cart__item")
    for (let item of elem) {
        if (item.getAttribute("data-id") == id && item.getAttribute("data-color") == color) {
            item.remove()
        }
    }
}

/**
 * If the quantity is greater than 0, then update the quantity of the product in the cart. Otherwise,
 * remove the product from the cart.
 * @param id - the id of the product
 * @param color - the color of the product
 * @param quantity - the new quantity of the product
 * @param pos - the position of the product in the cart
 */
function updateCart(id, color, quantity) {
    const myCart = getCart()
    
    let index = 0
    let i = 0

    for (const product of myCart) {
        if (product.id == id && product.color == color) {
            index = i
        }
        i++
    }

    if (quantity > 0) {
        myCart[index].quantity = quantity
    } else {
        myCart.splice(index, 1)
    }

    localStorage.setItem("myCart", JSON.stringify(myCart))
}

async function refreshTotal() {
    const myCart = getCart()

    let totalQuantity = 0
    let totalPrice = 0

    for (let cartProduct of myCart) {
        const product = await fetchProduct(cartProduct.id)

        totalQuantity += cartProduct.quantity
        totalPrice += (product.price * cartProduct.quantity)
    }

    document.getElementById("totalQuantity").innerHTML = totalQuantity
    document.getElementById("totalPrice").innerHTML = totalPrice
}

/**
 * It displays the products in the cart
 */
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
        inputQuantityElem.addEventListener('change', (event) => {
            let quantity = parseInt(inputQuantityElem.value)
            if (quantity > 0 && quantity <= 100) {
                updateCart(cartProduct.id, cartProduct.color, quantity)
                refreshTotal()
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
        deleteElem.addEventListener('click', (event) => {
                removeHtmlItem(cartProduct.id, cartProduct.color)
                updateCart(cartProduct.id, cartProduct.color, 0)
                refreshTotal()
        })

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