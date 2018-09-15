var products = [];

const displayProduct = (product) => {
    chrome.runtime.sendMessage({
        msg: "display_product",
        data: {
            product
        }
    });
}

chrome.runtime.onMessage.addListener(function(req, sender, sendRes) {
    if (req.msg === "get_products") {
        sendRes(products);
    }
});

const getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

const amazonGetInfo = (product) => {
    const priceElement = document.evaluate('//span[contains(@id,"ourprice") or contains(@id,"saleprice") or contains(@id,"dealprice")]/text()', document, null, XPathResult.ANY_TYPE, null);
    const price = priceElement.iterateNext().nodeValue;

    const priceRegex = /\d+\.\d+/g;
    let matches = priceRegex.exec(price);
    product["price"] = matches[0];
    displayProduct(product);
}

const shopifyGetInfo = (product) => {
    getJSON(window.location.href + '.json', (status, response) => {
        if (response) {
            product["name"] = response["product"]["product_type"]
            product["price"] = response["product"]["variants"][0]["price"]
            displayProduct(product);
        }
    });
}

const getPrice = () => {
    let getUrl = window.location;
    let baseUrl = getUrl.host;

    let product = {};

    let gotPrice = false;
    switch (baseUrl) {
        case "www.amazon.ca":
            amazonGetInfo(product);
            products.push(product);
            gotPrice = true;
            break;
    }

    if (!gotPrice) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    shopifyGetInfo(product);
                    products.push(product);
                    gotPrice = true;
                }
            }
        }
        request.open("GET", '/admin', true);
        request.send();
    }
}

getPrice();