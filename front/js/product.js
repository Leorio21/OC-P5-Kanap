function collectProduct() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    fetch("http://localhost:3000/api/products/" + id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(product){
        let tagTitle = document.getElementsByTagName("title");
        tagTitle[0].innerHTML = product.name;

        let elemIllustration = document.createElement("img");

        elemIllustration.setAttribute("src", product.imageUrl);
        elemIllustration.setAttribute("alt", product.altTxt);

        document.getElementsByClassName("item__img")[0].appendChild(elemIllustration);

        document.getElementById("title").textContent = product.name;

        document.getElementById("price").textContent = product.price;

        document.getElementById("description").textContent = product.description;

        for (let i in product.colors) {
            let elemOption = document.createElement("option");

            elemOption.setAttribute("value", product.colors[i]);
            elemOption.textContent = product.colors[i];

            document.getElementById("colors").appendChild(elemOption);
        }


    })
}

collectProduct();