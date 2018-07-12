
let productCart = [
    { productName:'iphone-x', qty: 10, price: 1000 },
    { productName:'macbook pro', qty: 200, price: 2000 },
    { productName:'iwatch', qty: 100, price: 550 },
    { productName:'macbook air', qty: 100, price: 1000 },
    { productName:'iphone 8', qty: 300, price: 700 },
    { productName:'iphone 7', qty: 100, price: 550 },
    { productName:'ipad Retina', qty: 20, price: 1000 },
    { productName:'ipad', qty: 10, price: 700 },
    { productName:'Magic Mouse', qty: 50, price: 300 },
    { productName:'Magic Trackpad', qty: 75, price: 200 } 
];

function costOfProductForQtyGreaterThan(quantity) {
    return productCart.reduce((cost, {qty, price}) => {
        return (qty > quantity) ? cost + qty * price : cost; 
    }, 0);
}

function costOfProduct(productName) {
    for (let product of productCart) {
        if (product.productName === productName) {
            return product.qty * product.price; 
        }
    }
    return 0;
}

console.log(costOfProductForQtyGreaterThan(100));
console.log(costOfProduct('ipad'));