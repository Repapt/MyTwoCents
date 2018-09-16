var products = [];

const displayProducts = () => {
    console.log(products);
    for (product of products) {
        var productDiv = document.createElement('div');
        var node = document.createElement('p');
        var textnode = document.createTextNode('$' + product['price'] + " CAD - " + product['rating']);
        node.appendChild(textnode);
        productDiv.appendChild(node);
        var meterNode = document.createElement('meter')
        meterNode.min = "0";
        meterNode.low = "4";
        meterNode.high = "10";
        meterNode.max = "10"
        meterNode.value = product['rating'];
        productDiv.appendChild(meterNode);
        document.getElementById('root').appendChild(productDiv);
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
