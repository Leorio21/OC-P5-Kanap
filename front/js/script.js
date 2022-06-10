function collectProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(productsList){
        for (let i in productsList ) {

            let elemLink = document.createElement("a");
            let elemArticle = document.createElement("article");
            let elemIllustration = document.createElement("img");
            let elemTitle = document.createElement("h3");
            let elemDescription = document.createElement("p");

            elemIllustration.setAttribute("src", productsList[i].imageUrl);
            elemIllustration.setAttribute("alt", productsList[i].altTxt);

            elemTitle.setAttribute("class", "ProductName");
            elemTitle.textContent = productsList[i].name;

            elemDescription.setAttribute("class", "productDescription");
            elemDescription.textContent = productsList[i].description;

            elemLink.setAttribute("href", "./product.html?id=" + productsList[i]._id);

            elemArticle.appendChild(elemIllustration);
            elemArticle.appendChild(elemTitle);
            elemArticle.appendChild(elemDescription);

            elemLink.appendChild(elemArticle);
            

            document.getElementById("items").appendChild(elemLink);
        }
    })
    .catch(function(err) {
    // Une erreur est survenue
    });
}

collectProducts();