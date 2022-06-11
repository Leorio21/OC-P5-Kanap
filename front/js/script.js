/**
 * It fetches a product from the server and returns the product as a JSON object.
 * @param [id] - The id of the product you want to fetch.
 * @returns A promise.
 */
async function fetchProduct(id = "") {
    const products= await fetch(`http://localhost:3000/api/products/${id}`)
    return products.json();
}

/**
 * It fetches the products from the API, then loops through the products and creates a link, article,
 * image, title and description for each product.
 */
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

/*function test() {


    let inCart = false

    let myCart = []

    if (localStorage.getItem("myCart")) {
        console.log("existe")
        myCart = JSON.parse(localStorage.getItem("myCart"))
    }

    const obj = obj6

    for (const product of myCart) {
        if (product.id == obj.id && product.color == obj.color) {
            product.qty++
            inCart = true
        }
    }


    if (!inCart) {
        obj.qty = 1
        myCart.push(obj)
    }

    localStorage.setItem("myCart", JSON.stringify(myCart))

}

test()*/