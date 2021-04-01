const createTable = (tableData) => {

    var elem = document.getElementById('orders-table');
    
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

        let tableContainer = document.getElementById('table-container');
        tableContainer.appendChild(table);
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