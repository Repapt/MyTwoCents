var products = [];

const displayProducts = () => {
    console.log(products);
    for (product of products) {
        var node = document.createElement('p');
        var textnode = document.createTextNode(product.price);
        node.appendChild(textnode);
        document.getElementById('root').appendChild(node);
    }
}

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
    if (req.msg === "display_product") {
        products.push(req.data.product);
        displayProducts();
    }
});


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
        msg: "get_products",
    }, function (res) {
        console.log(res);
        if (res) {
            products = res;
            displayProducts();
        }
    });
});