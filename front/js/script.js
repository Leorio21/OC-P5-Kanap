/**
 * It fetches a product from the server and returns the product as a JSON object.
 * @param [id] - The id of the product you want to fetch.
 * @returns A promise.
 */
async function fetchProduct(id = "") {
    const products = await fetch(`http://localhost:3000/api/products/${id}`)
    return products.json()
}

/**
 * It fetches the products from the API, then loops through the products and creates a link, article,
 * image, title and description for each product.
 */
async function displayProducts() {
    const products = await fetchProduct()

    for (let product of products ) {

        const linkElem = document.createElement("a");
        const articleElem = document.createElement("article");
        const imgElem = document.createElement("img");
        const titleElem = document.createElement("h3");
        const descriptionElem = document.createElement("p");

        imgElem.setAttribute("src", product.imageUrl);
        imgElem.setAttribute("alt", product.altTxt);

        titleElem.setAttribute("class", "ProductName");
        titleElem.textContent = product.name;

        descriptionElem.setAttribute("class", "productDescription");
        descriptionElem.textContent = product.description;

        linkElem.setAttribute("href", `./product.html?id=${product._id}`);

        articleElem.appendChild(imgElem);
        articleElem.appendChild(titleElem);
        articleElem.appendChild(descriptionElem);

        linkElem.appendChild(articleElem);
        

        document.getElementById("items").appendChild(linkElem);
    }
}

displayProducts();