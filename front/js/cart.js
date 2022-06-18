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

    for (const product of myCart) {
        if (product.id == id && product.color == color) {
            break
        }
        index++
    }

    if (quantity > 0) {
        myCart[index].quantity = quantity
    } else {
        myCart.splice(index, 1)
    }

    localStorage.setItem("myCart", JSON.stringify(myCart))
}

/**
 * It loops through the products in the cart, fetches the product from the server, and then updates the
 * total quantity and price.
 */
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
 * It takes a data object, sends it to the server, and returns the response as a JSON object.
 * @param data - {
 * @returns The response from the server.
 */
async function fetchOrder(data) {
    const reponse = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(data)
        });

    return reponse.json()
}

/* It's adding an event listener to the element with the id "order". When the element is clicked, the
function is called. */
document.getElementById("order").onclick = async function(event) {
    event.preventDefault();
    let contactIsValid = true
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    }
    
    let firstNameErrorTxt = " "
    let lastNameErrorTxt = " "
    let addressErrorTxt = " "
    let cityErrorTxt = " "
    let emailErrorTxt = " "

    document.getElementById("firstNameErrorMsg").innerHTML = firstNameErrorTxt
    document.getElementById("lastNameErrorMsg").innerHTML = lastNameErrorTxt
    document.getElementById("addressErrorMsg").innerHTML = addressErrorTxt
    document.getElementById("cityErrorMsg").innerHTML = cityErrorTxt
    document.getElementById("emailErrorMsg").innerHTML = emailErrorTxt

    if (!contact.firstName.match(/^[a-zÀ-ÖØ-öø-ÿ -]+$/i)) {
        contactIsValid = false
        firstNameErrorTxt = "Prénom invalide - Ce champ ne peut être vide - Caractères autorisés a-z A-Z espace tiret"
    }

    if (!contact.lastName.match(/^[a-z -]+$/i)) {
        contactIsValid = false
        lastNameErrorTxt = "Nom invalide - Ce champ ne peut être vide - Caractères autorisés a-z A-Z espace tiret"
    }

    if (!contact.address.match(/^[0-9a-zÀ-ÖØ-öø-ÿ -]+$/i)) {
        contactIsValid = false
        addressErrorTxt = "Adresse invalide - Ce champ ne peut être vide - Caractères autorisés a-z A-Z 0-9 espace tiret"
    }

    if (!contact.city.match(/^[0-9]{5} [a-z -]+$/i)) {
        contactIsValid = false
        cityErrorTxt = "Ville invalide - Ce champ ne peut être vide - La ville doit être sous la forme:<br>00000 VILLE"
    }

    if (!contact.email.match(/^([a-z0-9-_\.]+)\@([a-z0-9-]+)\.([a-z-]{2,})$/i)) {
        contactIsValid = false
        emailErrorTxt = "Email invalide - Ce champ ne peut être vide - L'adresse mail doit être sous la forme:<br>example@example.xx"
    }
    
    if (contactIsValid) {
        const myCart = getCart()
        let products = []
        for (let product of myCart) {
            products.push(product.id)
        }
        const formData = {contact, products}
        const response = await fetchOrder(formData)

        //localStorage.removeItem("myCart")

        document.location.href=`./confirmation.html?orderId=${response.orderId}`;

    } else {
        document.getElementById("firstNameErrorMsg").innerHTML = firstNameErrorTxt
        document.getElementById("lastNameErrorMsg").innerHTML = lastNameErrorTxt
        document.getElementById("addressErrorMsg").innerHTML = addressErrorTxt
        document.getElementById("cityErrorMsg").innerHTML = cityErrorTxt
        document.getElementById("emailErrorMsg").innerHTML = emailErrorTxt
    }
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