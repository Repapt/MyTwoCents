const parsePrice = (priceStr) => {
    const priceRegex = /\d+\.\d+/g;
    console.log(priceStr);
    var matches = priceRegex.exec(priceStr);
    console.log(matches);
    return matches[0];
};

const priceElement = document.evaluate('//span[contains(@id,"ourprice") or contains(@id,"saleprice") or contains(@id,"dealprice")]/text()', document, null, XPathResult.ANY_TYPE, null);
const price = priceElement.iterateNext().nodeValue;
console.log(parsePrice(price));