
const fetchAPI =  async (url) => {
    const retrieve = await fetch(url);
    return await retrieve.json();
}


const updateMarket = () => {
    fetchAPI("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cchainlink%2Cdogecoin%2Clitecoin&vs_currencies=usd")
    .then(data => {

        // Console Logs
        console.log(data);
        console.log("Bitcoin Price: " + data.bitcoin.usd);
        console.log("Chainlink Price: " + data.chainlink.usd);
        console.log("Dogecoin Price: " + data.dogecoin.usd);
        console.log("Ethereum Price: " + data.ethereum.usd);
        console.log("Litecoin Price: " + data.litecoin.usd);

        //Push data to localStorage
        localStorage.setItem("bitcoin-current-price", data.bitcoin.usd);
        localStorage.setItem("chainlink-current-price", data.chainlink.usd);
        localStorage.setItem("dogecoin-current-price", data.dogecoin.usd);
        localStorage.setItem("ethereum-current-price", data.ethereum.usd);
        localStorage.setItem("litecoin-current-price", data.litecoin.usd);

        update();
    })
    .catch(error => {
        console.log("fetchAPI Error: " + error);
    });
}


const update = () => {

    //Create allOrders Table
    createTable(stringToArray(localStorage.getItem("allOrders")));

    //Display Current Prices:
    document.getElementById("bitcoin-current-span").innerText = localStorage.getItem("bitcoin-current-price");
    document.getElementById("chainlink-current-span").innerText = localStorage.getItem("chainlink-current-price");
    document.getElementById("dogecoin-current-span").innerText = localStorage.getItem("dogecoin-current-price");
    document.getElementById("ethereum-current-span").innerText = localStorage.getItem("ethereum-current-price");
    document.getElementById("litecoin-current-span").innerText = localStorage.getItem("litecoin-current-price");

    //Calculate Total Assets:
    let assets = parseFloat(
        (localStorage.getItem('bitcoin-current-price')) * parseFloat(localStorage.getItem('bitcoin-count')) 
        + (localStorage.getItem('chainlink-current-price')) * parseFloat(localStorage.getItem('chainlink-count'))
        + (localStorage.getItem('dogecoin-current-price')) * parseFloat(localStorage.getItem('dogecoin-count'))
        + (localStorage.getItem('ethereum-current-price')) * parseFloat(localStorage.getItem('ethereum-count'))
        + (localStorage.getItem('litecoin-current-price')) * parseFloat(localStorage.getItem('litecoin-count'))
        );
    console.log(assets);


    //Display Total Value of Portfolio:
    document.getElementById("total-portfolio-value").innerText = (parseFloat(localStorage.getItem("cash")) + assets).toFixed(2);
    document.getElementById('total-equity').innerText = assets.toFixed(2);
    document.getElementById('total-cash').innerText = ((parseFloat(localStorage.getItem("cash"))).toFixed(2));
    let totalReturns = ((parseFloat(localStorage.getItem('cash')) + assets) - 1000000).toFixed(2);
    let totalReturnsPercentage = (totalReturns / (1000000) * 100).toFixed(2);
    console.log(totalReturnsPercentage);
    if (totalReturnsPercentage == 0){
        document.getElementById('total-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('total-returns-percentage').innerText = ' (' + totalReturnsPercentage + '%)';
    }
    
    document.getElementById('total-returns').innerText = totalReturns;
    if (totalReturns > 0){
        document.getElementById('returns-text').style.color = 'green';
        document.getElementById('returns-plus').innerText = '+';
    }
    else if (totalReturns < 0){
        document.getElementById('returns-text').style.color = 'red';
    }



    //Display Current Shares and Equity:

    // Bitcoin

    document.getElementById('bitcoin-current-quantity').innerText = localStorage.getItem('bitcoin-count');
    document.getElementById('bitcoin-average-cost').innerText = (parseFloat(localStorage.getItem('bitcoin-avg-price'))).toFixed(2);
    let bitcoinTotalCost = (parseFloat(localStorage.getItem('bitcoin-count')) * parseFloat(localStorage.getItem('bitcoin-avg-price'))).toFixed(2);
    document.getElementById('bitcoin-total-cost').innerText = bitcoinTotalCost;
    let bitcoinEquity =  ( parseFloat(localStorage.getItem('bitcoin-count')) * parseFloat(localStorage.getItem("bitcoin-current-price"))).toFixed(2);
    let bitcoinReturns = (bitcoinEquity - bitcoinTotalCost).toFixed(2);
    let bitcoinReturnsPercentage = ((bitcoinReturns / bitcoinTotalCost) * 100).toFixed(2);
    document.getElementById('bitcoin-equity').innerText = bitcoinEquity;
    document.getElementById('bitcoin-returns').innerText = bitcoinReturns;
    if ((bitcoinReturnsPercentage == 0) || bitcoinTotalCost == 0){
        document.getElementById('bitcoin-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('bitcoin-returns-percentage').innerText = ' (' + bitcoinReturnsPercentage + '%)';
    }
    if(bitcoinReturns > 0){
        document.getElementById('bitcoin-returns-text').style.color='green';
        document.getElementById('bitcoin-returns-plus').innerText = '+';
    }
    else if (bitcoinReturns < 0){
        document.getElementById('bitcoin-returns-text').style.color='red';
    }
    
    // Chainlink

    document.getElementById('chainlink-current-quantity').innerText = localStorage.getItem('chainlink-count');
    document.getElementById('chainlink-average-cost').innerText = (parseFloat(localStorage.getItem('chainlink-avg-price'))).toFixed(2);
    let chainlinkTotalCost =  (parseFloat(localStorage.getItem('chainlink-count')) * parseFloat(localStorage.getItem('chainlink-avg-price'))).toFixed(2);
    document.getElementById('chainlink-total-cost').innerText = chainlinkTotalCost;
    let chainlinkEquity = ( parseFloat(localStorage.getItem('chainlink-count')) * parseFloat(localStorage.getItem("chainlink-current-price"))).toFixed(2);
    document.getElementById('chainlink-equity').innerText = chainlinkEquity;
    let chainlinkReturns = (chainlinkEquity - chainlinkTotalCost).toFixed(2);
    document.getElementById('chainlink-returns').innerText = chainlinkReturns;
    let chainlinkReturnsPercentage = ((chainlinkReturns / chainlinkTotalCost) * 100).toFixed(2);
    console.log("chainlinkReturnsPercentage: " + chainlinkReturnsPercentage);
    if ((chainlinkReturnsPercentage == 0) || chainlinkTotalCost == 0) {
        document.getElementById('chainlink-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('chainlink-returns-percentage').innerText = ' (' + chainlinkReturnsPercentage + '%)';
    }
    
    if(chainlinkReturns > 0){
        document.getElementById('chainlink-returns-text').style.color='green';
        document.getElementById('chainlink-returns-plus').innerText = '+';
    }
    else if (chainlinkReturns < 0){
        document.getElementById('chainlink-returns-text').style.color='red';
    }
    
    
    // Dogecoin

    document.getElementById('dogecoin-current-quantity').innerText = localStorage.getItem('dogecoin-count');
    document.getElementById('dogecoin-average-cost').innerText = parseFloat(localStorage.getItem('dogecoin-avg-price')).toFixed(4);
    let dogecoinTotalCost = (parseFloat(localStorage.getItem('dogecoin-count')) * parseFloat(localStorage.getItem('dogecoin-avg-price'))).toFixed(2);
    document.getElementById('dogecoin-total-cost').innerText= dogecoinTotalCost;
    let dogecoinEquity = ( parseFloat(localStorage.getItem('dogecoin-count')) * parseFloat(localStorage.getItem("dogecoin-current-price"))).toFixed(2);
    document.getElementById('dogecoin-equity').innerText = dogecoinEquity;
    let dogecoinReturns = (dogecoinEquity - dogecoinTotalCost).toFixed(2);
    document.getElementById('dogecoin-returns').innerText = dogecoinReturns;
    let dogecoinReturnsPercentage = ((dogecoinReturns / dogecoinTotalCost) * 100).toFixed(2);
    document.getElementById('dogecoin-returns-percentage').innerText = ' (' + dogecoinReturnsPercentage + '%)';
    if (dogecoinReturnsPercentage == 0 || dogecoinTotalCost == 0){
        document.getElementById('dogecoin-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('dogecoin-returns-percentage').innerText = ' (' + dogecoinReturnsPercentage + '%)';
    }
    if(dogecoinReturns > 0){
        document.getElementById('dogecoin-returns-text').style.color='green';
        document.getElementById('dogecoin-returns-plus').innerText = '+';
    }
    else if (dogecoinReturns < 0){
        document.getElementById('dogecoin-returns-text').style.color='red';
    }
    
    // Ethereum
    
    document.getElementById('ethereum-current-quantity').innerText = localStorage.getItem('ethereum-count');
    document.getElementById('ethereum-average-cost').innerText = (parseFloat(localStorage.getItem('ethereum-avg-price'))).toFixed(2);
    let ethereumTotalCost =  (parseFloat(localStorage.getItem('ethereum-count')) * parseFloat(localStorage.getItem('ethereum-avg-price'))).toFixed(2);
    document.getElementById('ethereum-total-cost').innerText = ethereumTotalCost;
    let ethereumEquity = ( parseFloat(localStorage.getItem('ethereum-count')) * parseFloat(localStorage.getItem("ethereum-current-price"))).toFixed(2);
    document.getElementById('ethereum-equity').innerText = ethereumEquity;
    let ethereumReturns = (ethereumEquity - ethereumTotalCost).toFixed(2);
    document.getElementById('ethereum-returns').innerText = ethereumReturns;
    let ethereumReturnsPercentage = ((ethereumReturns / ethereumTotalCost) * 100).toFixed(2);
    document.getElementById('ethereum-returns-percentage').innerText = ' (' + ethereumReturnsPercentage + '%)';
    if (ethereumReturnsPercentage == 0 || ethereumTotalCost == 0){
        document.getElementById('ethereum-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('ethereum-returns-percentage').innerText = ' (' + ethereumReturnsPercentage + '%)';
    }
    if(ethereumReturns > 0){
        document.getElementById('ethereum-returns-text').style.color='green';
        document.getElementById('ethereum-returns-plus').innerText = '+';
    }
    else if (ethereumReturns < 0){
        document.getElementById('ethereum-returns-text').style.color='red';
    }
    
    // Litecoin

    document.getElementById('litecoin-current-quantity').innerText = localStorage.getItem('litecoin-count');
    document.getElementById('litecoin-average-cost').innerText = parseFloat(localStorage.getItem('litecoin-avg-price'));
    let litecoinTotalCost = (parseFloat(localStorage.getItem('litecoin-count')) * parseFloat(localStorage.getItem('litecoin-avg-price'))).toFixed(2);
    document.getElementById('litecoin-total-cost').innerText= litecoinTotalCost;
    let litecoinEquity = ( parseFloat(localStorage.getItem('litecoin-count')) * parseFloat(localStorage.getItem("litecoin-current-price"))).toFixed(2);
    document.getElementById('litecoin-equity').innerText = litecoinEquity;
    let litecoinReturns = (litecoinEquity - litecoinTotalCost).toFixed(2);
    document.getElementById('litecoin-returns').innerText = litecoinReturns;
    let litecoinReturnsPercentage = ((litecoinReturns / litecoinTotalCost) * 100).toFixed(2);
    document.getElementById('litecoin-returns-percentage').innerText = ' (' + litecoinReturnsPercentage + '%)';
    if (litecoinReturnsPercentage == 0 || litecoinTotalCost == 0){
        document.getElementById('litecoin-returns-percentage').innerText = ' (<0.01%)';
    }
    else{
        document.getElementById('litecoin-returns-percentage').innerText = ' (' + litecoinReturnsPercentage + '%)';
    }
    if(litecoinReturns > 0){
        document.getElementById('litecoin-returns-text').style.color='green';
        document.getElementById('litecoin-returns-plus').innerText = '+';
    }
    else if (litecoinReturns < 0){
        document.getElementById('litecoin-returns-text').style.color='red';
    }


}

const dropdownListener = (value) => {
    document.getElementById("form-current-price").innerText = localStorage.getItem(value);
}
const quantityListener = (value) => {
    
    document.getElementById("form-order-value").innerText = (value * localStorage.getItem(document.getElementById("crypto-type").value)).toFixed(2);
}

const orderSubmit = () => {

    // 1. Complete the order calculations 
    // Need to write this function
    // Will return an array
    

    // 2. Create array containing order 
    // [OrderID, OrderType, Cryptocoin, Quantity, Price, TotalCost]

//    let order = [orderID, orderType, cryptocurrency, Quantity, Price, TotalCost];

    // 3. Append order array to allOrders array
    // {[...], [...], [...]}
    // Note: 
    // - 1. Retrieve value of localStorage "allOrders" and parse it to a 2D Array.
    // - 2. Append our order array to this 2D array.
    // - 3. Reassign the localStorage string to our newly updated 2D array as a string ( delimited by , and ; ).
    // -    new cell = ,
    // -    new array = ;


    let orderID = generateOrderID();
    console.log("count of orderID:" + orderID);

    // Grab Buy/Sell Value
    let orderType = document.querySelector('input[name="order-type"]:checked').value;
    console.log(orderType);

    // Grab Cryptocurrency value
    let cryptocurrency = document.getElementById("crypto-type").value;
    console.log(cryptocurrency);

    // Grab Order Quantity
    let quantity = document.getElementById("order-quantity").value;
    console.log(quantity);

    // Grab Coin Price from localStorage
    let price = localStorage.getItem(document.getElementById("crypto-type").value);
    console.log(price);

    let totalCost = price * quantity;
    console.log(totalCost.toFixed(2));
    
    let order = [orderID,orderType,cryptocurrency,quantity,price,totalCost.toFixed(2)];

    orderCalculate(orderType,cryptocurrency,quantity,price,totalCost);
    update();
    createOrder(order);
    createTable(stringToArray(localStorage.getItem("allOrders")));
}

const orderCalculate = (orderType,cryptocurrency,quantity,price,totalCost) =>{
    
    var currentQuantity,currentCost, currentCash;
    
    currentCash = parseFloat(localStorage.getItem('cash'));

    if (cryptocurrency == 'bitcoin-current-price'){
        currentQuantity = parseFloat(localStorage.getItem('bitcoin-count'));
        currentCost = parseFloat(localStorage.getItem('bitcoin-avg-price'));
    }
    else if (cryptocurrency == 'chainlink-current-price'){
        currentQuantity = parseFloat(localStorage.getItem('chainlink-count'));
        currentCost = parseFloat(localStorage.getItem('chainlink-avg-price'));
    }
    else if (cryptocurrency == 'dogecoin-current-price'){
        currentQuantity = parseFloat(localStorage.getItem('dogecoin-count'));
        currentCost = parseFloat(localStorage.getItem('dogecoin-avg-price'));

    }
    else if (cryptocurrency == 'ethereum-current-price'){
        currentQuantity = parseFloat(localStorage.getItem('ethereum-count'));
        currentCost = parseFloat(localStorage.getItem('ethereum-avg-price'));
    }
    else if (cryptocurrency == 'litecoin-current-price'){
        currentQuantity = parseFloat(localStorage.getItem('litecoin-count'));
        currentCost = parseFloat(localStorage.getItem('litecoin-avg-price'));
    }

    if (orderType == 'sell') {
        if (quantity > currentQuantity){
            alert('You tried to sell more than you own!')
            throw error('You tried to sell more than you own!');
        }
        else{
            currentQuantity = currentQuantity - parseFloat(quantity);
            currentCash = currentCash + (parseFloat(totalCost));
            if (currentQuantity == 0) {
                console.log("currentQuantity: " + currentQuantity);
                console.log("quantity: " + quantity);
                currentCost = 0;
            }
        }
    }
    else{ //orderType = 'buy'

        if (parseFloat(totalCost) > parseFloat(localStorage.getItem('cash'))){
            alert('You do not have enough cash!');
            throw error('You tried to buy more than you own!');
        }

        // Average Cost = (Original Cost * Original Shares) + (New Cost + New Shares)
        //                ------------------------------------------------------------
        //                                             Total Shares
        console.log("Quantity: " + quantity);
        console.log("currentCost: " + currentCost);
        console.log("currentQuantity: "+ currentQuantity);
        console.log("totalCost: " + totalCost);
        currentCost = ((currentCost * currentQuantity) + (parseFloat(totalCost))) / (currentQuantity + parseFloat(quantity));

        // Total Shares = Total Shares + New Shares
        currentQuantity = currentQuantity + parseFloat(quantity);

        currentCash = currentCash - parseFloat(totalCost);
    }

    console.log("currenCost: " + currentCost);
    console.log("currentQuantity: " + currentQuantity);

    if (cryptocurrency == 'bitcoin-current-price'){
        localStorage.setItem("bitcoin-count", currentQuantity);
        localStorage.setItem("bitcoin-avg-price", currentCost);
    }
    else if (cryptocurrency == 'chainlink-current-price'){
        localStorage.setItem("chainlink-count", currentQuantity);
        localStorage.setItem("chainlink-avg-price", currentCost);
    }
    else if (cryptocurrency == 'dogecoin-current-price'){
        localStorage.setItem("dogecoin-count", currentQuantity);
        localStorage.setItem("dogecoin-avg-price", currentCost);
    }
    else if (cryptocurrency == 'ethereum-current-price'){
        localStorage.setItem("ethereum-count", currentQuantity);
        localStorage.setItem("ethereum-avg-price", currentCost);
    }
    else if (cryptocurrency == 'litecoin-current-price'){
        localStorage.setItem("litecoin-count", currentQuantity);
        localStorage.setItem("litecoin-avg-price", currentCost);
    }
    
    localStorage.setItem('cash', currentCash);

}

const generateOrderID = () => {
    let count = 0;

    // Retrieve All Orders
    if ((localStorage.getItem("allOrders") == null)) {
        return 0;
    }
    else{
        let string = localStorage.getItem("allOrders");

        //Parse to 2D Array
        let array = stringToArray(string);
    
        //Get the length of Array (number of orders)
        count = array.length;
        
        return count;
    }
    


}

const initializeLocalStorage = () => {
    if (localStorage.getItem("allOrders") == null) {
    }
    if (localStorage.getItem("cash") == null){
        localStorage.setItem('cash', 1000000);
    }
    if (localStorage.getItem('bitcoin-count') == null){
        localStorage.setItem('bitcoin-count', 0);
    }
    if (localStorage.getItem('chainlink-count') == null){
        localStorage.setItem('chainlink-count', 0);
    }
    if (localStorage.getItem('dogecoin-count') == null){
        localStorage.setItem('dogecoin-count', 0);
    }
    if (localStorage.getItem('ethereum-count') == null){
        localStorage.setItem('ethereum-count', 0);
    }
    if (localStorage.getItem('litecoin-count') == null){
        localStorage.setItem('litecoin-count', 0);
    }
    if (localStorage.getItem('bitcoin-avg-price') == null){
        localStorage.setItem('bitcoin-avg-price', 0);
    }
    if (localStorage.getItem('chainlink-avg-price') == null){
        localStorage.setItem('chainlink-avg-price', 0);
    }
    if (localStorage.getItem('dogecoin-avg-price') == null){
        localStorage.setItem('dogecoin-avg-price', 0);
    }
    if (localStorage.getItem('ethereum-avg-price') == null){
        localStorage.setItem('ethereum-avg-price', 0);
    }
    if (localStorage.getItem('litecoin-avg-price') == null){
        localStorage.setItem('litecoin-avg-price', 0);
    }
    
}

const reset = () => {
    localStorage.clear();
    updateMarket();
    window.location.reload();
}
updateMarket();
$(document).ready(function() {
    setInterval(updateMarket,30000); 
    // Update Prices every 30 seconds
 });
initializeLocalStorage();


