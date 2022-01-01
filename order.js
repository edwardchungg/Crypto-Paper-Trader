const createOrder = (arr) => {
    
    // arr = new order array

    // Retrieve localStorage "allOrders" string
    // If this is the first order
    var totalArray;
    if (localStorage.getItem("allOrders") == null){
        totalArray = [arr];
        
    }
    // If this is not the first order
    else {

        var string = localStorage.getItem("allOrders");
        // Parse string into 2d Array
        totalArray = stringToArray(string);
        console.log(totalArray);

        // push order into 2D Array
        totalArray.push(arr);

    }
    
    // Print array into console
    console.log(totalArray);

    // parse order into string (delimited by commas)
    let allOrders = addSemicolons(arrToString(totalArray), 6);

    // parse all Orders into (,,;,,;) notation
//    addSemicolons(allOrders, 6);
    console.log("NEW STRING: " + allOrders);

    // Update localStorage with updated string

    localStorage.setItem("allOrders", allOrders);

    // Update Table
    createTable(totalArray);
}


const orderSubmit = (coin) => {

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

    // Grab Buy/Sell Value
    let orderType = document.querySelector('input[name="order-type"]:checked').value;

    // Grab Cryptocurrency value
    let cryptocurrency = `${coin}-current-price`;

    // Grab Order Quantity
    let quantity = document.getElementById(`${coin}-order-quantity`).value;

    // Grab Coin Price from localStorage
    let price = localStorage.getItem(cryptocurrency);

    let totalCost = price * quantity;
    
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

        currentCost = ((currentCost * currentQuantity) + (parseFloat(totalCost))) / (currentQuantity + parseFloat(quantity));

        // Total Shares = Total Shares + New Shares
        currentQuantity = currentQuantity + parseFloat(quantity);

        currentCash = currentCash - parseFloat(totalCost);
    }



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