const GET_RATING_REQUEST_URL = 'https://twocent.herokuapp.com/'

var products = [];

const displayProduct = (product) => {

    const sendToPopup = () => {
        chrome.runtime.sendMessage({
            msg: "display_product",
            data: {
                product
            }
        });
    };

    var xhr = new XMLHttpRequest();
    xhr.open('GET', GET_RATING_REQUEST_URL + '?cost=' + product["price"]);
    xhr.responseType = 'text';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            console.log(xhr.response);
            product['rating'] = xhr.response;
            sendToPopup();
        }
    };
    if (product['price'] < 20) {
        product['rating'] = Math.floor(Math.random() * 3) + 7;
    } else if (product['price'] > 100) {
        product['rating'] = Math.floor(Math.random() * 2) + 4;
    } else if (product['price'] > 50) {
        product['rating'] = Math.floor(Math.random() * 3) + 5 
    } else {
        product['rating'] = Math.floor(Math.random() * 3) + 6;
    }
    xhr.send();
}

chrome.runtime.onMessage.addListener(function (req, sender, sendRes) {
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

    var priceElement = document.evaluate('//span[contains(@id,"dealprice")]/text()', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    priceElement = priceElement ? priceElement : document.evaluate('//span[contains(@id,"saleprice")]/text()', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    priceElement = priceElement ? priceElement : document.evaluate('//span[contains(@id,"ourprice")]/text()', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    var priceStr = priceElement.nodeValue;

    const priceRegex = /\$\W+?(\d+\.\d+)/g;
    let matches = priceRegex.exec(priceStr);
    console.log(matches);

    if (!matches) {
        const priceRegex = /£\W*(\d+\.\d+)/g;
        let matches = priceRegex.exec(priceStr);
        console.log(matches)
        let price = matches[1];

        const convertURL = "https://xecdapi.xe.com/v1/convert_from.json/?from=GBP&to=CAD&amount="

        var xhr = new XMLHttpRequest();
        xhr.open('GET', convertURL + price, true);
        xhr.setRequestHeader("Authorization", "Basic " + btoa("twocents983088923:6u0vb3uq9v5m2ll6q16qepecvr"))
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                console.log(xhr.response);
                product["price"] = xhr.response['to'][0]['mid'].toFixed(2);
                displayProduct(product);
            }
        }
        xhr.send();

    } else {
        product["price"] = matches[1];
        displayProduct(product);
    }
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
        case "www.amazon.co.uk":
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