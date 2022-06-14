/**
 * It takes a parameter, searches the URL for that parameter, and returns the value of that parameter.
 * @param paramToSearch - The parameter you want to search for in the URL.
 * @returns The value of the parameter in the URL.
 */
function getUrlData(paramToSearch) {
    const url = new URL(window.location.href);
    const data = url.searchParams.get(paramToSearch);

    return data
}

/**
 * It takes the value of the URL parameter "orderId" and displays it on the page.
 */
function displayOrderId() {
    const orderId = getUrlData("orderId")
console.log(orderId)
    document.getElementById("orderId").innerHTML = orderId
}

displayOrderId()