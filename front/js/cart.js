let productList = new Map();
/**
 * It fetches a product from the server and returns the product as a JSON object.
 * @param [id] - The id of the product you want to fetch.
 * @returns A promise that resolves to the product.json()
 */
async function fetchProduct(id = "") {
    if (productList[id]) {
        return productList[id];
    }
    const product = await fetch(`http://localhost:3000/api/products/${id}`);
    json = product.json()
    productList[id] = json;
    return json;
}

/**
 * If there's a cart in localStorage, get it and parse it into an array. Otherwise, return an empty
 * array.
 * @returns The cart array.
 */
function getCart() {
    let cart = [];

    if (localStorage.getItem("myCart")) {
        cart = JSON.parse(localStorage.getItem("myCart"));
    }

    return cart;
}

/**
 * It removes an item from the cart by finding the item with the matching id and color and then
 * removing it.
 * @param id - the id of the product
 * @param color - the color of the item
 */
function removeHtmlItem(id, color) {
    const elem = document.getElementsByClassName("cart__item");
    for (let item of elem) {
        if (item.getAttribute("data-id") == id && item.getAttribute("data-color") == color) {
            item.remove();
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
    const myCart = getCart();

    let index = myCart.findIndex((product) => product.id == id && product.color == color)

    switch(quantity) {
        case 0:
            myCart.splice(index, 1);
            break;

        case -1:
            return myCart[index].quantity;

        default:
            myCart[index].quantity = quantity;
    }

    localStorage.setItem("myCart", JSON.stringify(myCart));
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

    document.getElementById("totalQuantity").textContent = totalQuantity
    document.getElementById("totalPrice").textContent = totalPrice
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


/* Adding an event listener to the element with the id "order". */
document.getElementById("order").onclick = async function(event) {
    event.preventDefault();
    const myCart = getCart();
    if (myCart.length == 0) {
        alert('Votre panier est vide')
    } else {
        let contactIsValid = true;
        const contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        }
        
        let firstNameErrorTxt = " ";
        let lastNameErrorTxt = " ";
        let addressErrorTxt = " ";
        let cityErrorTxt = " ";
        let emailErrorTxt = " ";

        if (!contact.firstName.match(/^[a-z??-????-????-?? -]+$/i)) {
            contactIsValid = false;
            firstNameErrorTxt = "Pr??nom invalide - Ce champ ne peut ??tre vide - Caract??res autoris??s a-z A-Z espace tiret";
        }

        if (!contact.lastName.match(/^[a-z -]+$/i)) {
            contactIsValid = false;
            lastNameErrorTxt = "Nom invalide - Ce champ ne peut ??tre vide - Caract??res autoris??s a-z A-Z espace tiret";
        }

        if (!contact.address.match(/^[0-9a-z??-????-????-?? -]+$/i)) {
            contactIsValid = false;
            addressErrorTxt = "Adresse invalide - Ce champ ne peut ??tre vide - Caract??res autoris??s a-z A-Z 0-9 espace tiret";
        }

        if (!contact.city.match(/^[0-9]{5} [a-z??-????-????-?? -]+$/i)) {
            contactIsValid = false;
            cityErrorTxt = "Ville invalide - Ce champ ne peut ??tre vide - La ville doit ??tre sous la forme: 00000 VILLE";
        }

        if (!contact.email.match(/^([a-z0-9-_\.]+)\@([a-z0-9-]+)\.([a-z-]{2,})$/i)) {
            contactIsValid = false;
            emailErrorTxt = "Email invalide - Ce champ ne peut ??tre vide - L'adresse mail doit ??tre sous la forme: example@example.xx";
        }
        
        if (contactIsValid) {
            let products = [];
            for (let product of myCart) {
                products.push(product.id);
            }
            const formData = {contact, products};
            const response = await fetchOrder(formData);

            localStorage.removeItem("myCart");

            document.location.href=`./confirmation.html?orderId=${response.orderId}`;

        } else {
            document.getElementById("firstNameErrorMsg").textContent = firstNameErrorTxt;
            document.getElementById("lastNameErrorMsg").textContent = lastNameErrorTxt;
            document.getElementById("addressErrorMsg").textContent = addressErrorTxt;
            document.getElementById("cityErrorMsg").textContent = cityErrorTxt;
            document.getElementById("emailErrorMsg").textContent = emailErrorTxt;
        }
    }
}

/**
 * It displays the products in the cart
 */
async function displayProducts() {

    const myCart = getCart()

    refreshTotal()

    for (let cartProduct of myCart) {
        const product = await fetchProduct(cartProduct.id)

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
        titleElem.textContent = product.name

        const colorElem = document.createElement("p")
        colorElem.textContent = cartProduct.color

        const priceElem = document.createElement("p")
        priceElem.textContent = `${product.price},00 ???`

        divDescriptionElem.appendChild(titleElem)
        divDescriptionElem.appendChild(colorElem)
        divDescriptionElem.appendChild(priceElem)

        const divSettingsElem = document.createElement("div")
        divSettingsElem.setAttribute("class", "cart__item__content__settings")

        const divQuantityElem = document.createElement("div")
        divQuantityElem.setAttribute("class", "cart__item__content__settings__quantity")

        const quantityElem = document.createElement("p")
        quantityElem.textContent = "Qt?? : "

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
                inputQuantityElem.value = updateCart(cartProduct.id, cartProduct.color, -1)
                alert("Vous devez saisir une quantit?? d'article entre 1 et 100")
            }
        })

        divQuantityElem.appendChild(quantityElem)
        divQuantityElem.appendChild(inputQuantityElem)

        const divDeleteElem = document.createElement("div")
        divDeleteElem.setAttribute("class", "cart__item__content__settings__delete")

        const deleteElem  = document.createElement("p")
        deleteElem.setAttribute("class", "deleteItem")
        deleteElem.textContent = "Supprimer"
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

    }
    
}

displayProducts()