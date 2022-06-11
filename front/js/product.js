async function fetchProduct(id = "") {
    const product = await fetch(`http://localhost:3000/api/products/${id}`);
    return product.json();
}

async function displayProduct() {

    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    const product = await fetchProduct(id)

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

displayProduct();