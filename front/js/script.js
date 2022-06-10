function collectProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(productsList){
        for (let i in productsList ) {

            const elemLink = document.createElement("a");
            const elemArticle = document.createElement("article");
            const elemIllustration = document.createElement("img");
            const elemTitle = document.createElement("h3");
            const elemDescription = document.createElement("p");

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

/*    **********   ZONE CRASH TEST    ************    */


/*const elemt = document.createElement("div");

document.getElementById("items").appendChild(elemt);

elemt.innerHTML = "test";*/
/*<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>*/

          /*
          function collectProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .catch(function(err) {
    // Une erreur est survenue
    });
}

function viewProducts() {
    collectProducts()
    .then(function(result) {
        console.log(result);
});
}

*/