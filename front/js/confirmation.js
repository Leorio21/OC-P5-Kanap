function getUrlData(paramToSearch) {
    const url = new URL(window.location.href);
    const data = url.searchParams.get(paramToSearch);

    return data
}

function displayOrderId() {
    const orderId = getUrlData("orderId")
console.log(orderId)
    document.getElementById("orderId").innerHTML = orderId
}

displayOrderId()