// This is our 2d Array to string method 
// (2D Array) => (string)
// Example: 'Bob,1234,Bob@example.com,Mark,5678,Mark@example.com'

const arrToString = (arr) => {
    let str = "";
    for (let item of arr) {
        if (Array.isArray(item)){
            str += arrToString(item);
        }
        else{
            str += item + ',';
        }
    }
    return str;
}

//This is our formatting method that parses our string to our intended format to allow it to be used in both arr/str functions
// (string delimited by commas) => (string delimited by commas and semicolons)
// Example: 'Bob,1234,Bob@example.com;Mark,5678,Mark@example.com'

const addSemicolons = (str, arraySize) => {
    let newString = "";
    let count = 0;
    for (let i = 0; i < str.length; i++){
        if (str.charAt(i) == ','){
            count++;
            if ((count % arraySize == 0) && count != 0){
                newString += ";";
            }
            else{
                newString += str.charAt(i);
            }
        }
        else{
            newString += str.charAt(i);
        }
    }
    if ((newString.charAt(newString.length - 1)) == ";"){
        
        return newString.slice(0,-1);   
    }
    return newString;
}


// This is our string to array method that will be used to convert a string to a 2d array.
// Needs a ; to separate arrays
const stringToArray = (str) => {

    if (str == "" || str == null){
        return null;
    }

    let arr = [];
    console.log(str);
    arr = str.split(';');
    for(let i = 0; i < arr.length; i++){
       arr[i] = arr[i].split(',');
    };
    return arr;
    
}

const createTable = (tableData) => {

    var elem = document.getElementById('orders-table');
    console.log(elem);
    
    if (typeof elem != 'undefined' &&  elem != null)
    {
    elem.parentNode.removeChild(elem);
    }

    
    // Create Table Object and assign ID
    var table = document.createElement('table');
    table.setAttribute("id","orders-table");
    table.setAttribute("class", "col table");


    //If local storage is null 
    if (tableData == null || tableData == ""){
        // Create Header
    
        var tableHeader = document.createElement('tr');
        var table0 = document.createElement('th');
        var table1 = document.createElement('th');
        var table2 = document.createElement('th');
        var table3 = document.createElement('th');
        var table4 = document.createElement('th');
        var table5 = document.createElement('th');

        table0.innerHTML="Order ID";
        table1.innerHTML="Order Type";
        table2.innerHTML="Cryptocurrency";
        table3.innerHTML="Quantity";
        table4.innerHTML="Price";
        table5.innerHTML="Total Cost";

        tableHeader.appendChild(table0);
        tableHeader.appendChild(table1);
        tableHeader.appendChild(table2);
        tableHeader.appendChild(table3);
        tableHeader.appendChild(table4);
        tableHeader.appendChild(table5);
        table.appendChild(tableHeader);


        document.body.appendChild(table);
        return;
    }

    // If localstorage is not null
    else{
        
        

        // Create Header

        var tableHeader = document.createElement('tr');
        var table0 = document.createElement('th');
        var table1 = document.createElement('th');
        var table2 = document.createElement('th');
        var table3 = document.createElement('th');
        var table4 = document.createElement('th');
        var table5 = document.createElement('th');

        table0.innerHTML="Order ID";
        table1.innerHTML="Order Type";
        table2.innerHTML="Cryptocurrency";
        table3.innerHTML="Quantity";
        table4.innerHTML="Price";
        table5.innerHTML="Total Cost";

        tableHeader.appendChild(table0);
        tableHeader.appendChild(table1);
        tableHeader.appendChild(table2);
        tableHeader.appendChild(table3);
        tableHeader.appendChild(table4);
        tableHeader.appendChild(table5);

        //Create Body
        var tableBody = document.createElement('tbody');

        tableData.forEach(function(rowData) {
        var row = document.createElement('tr');

        //Change color row depending on buy or sell
        if(rowData[1] == 'buy'){
            row.setAttribute("class", "table-success");
        } else if (rowData[1] == 'sell'){
            row.setAttribute("class", "table-danger");
        }

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            if (cellData=="bitcoin-current-price"){
                cell.appendChild(document.createTextNode("bitcoin"));
            }
            else if (cellData=="chainlink-current-price"){
                cell.appendChild(document.createTextNode("chainlink"));
            }
            else if (cellData=="dogecoin-current-price"){
                cell.appendChild(document.createTextNode("dogecoin"));
            }
            else if (cellData=="ethereum-current-price"){
                cell.appendChild(document.createTextNode("ethereum"));
            }
            else if (cellData=="litecoin-current-price"){
                cell.appendChild(document.createTextNode("litecoin"));
            }
            else{
                cell.appendChild(document.createTextNode(cellData));
            }
            
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
        });
        table.appendChild(tableHeader);
        table.appendChild(tableBody);
        let tableContainer = document.getElementById('table-container');
        tableContainer.appendChild(table);


    }

    
}

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
