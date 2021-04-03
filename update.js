
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
    })/*
    .catch(error => {
        console.log("fetchAPI Error: " + error);
    });*/
}


const update = () => {

    // Establish variables

    //  Calculate Total equity:
    let equity = parseFloat(
    (localStorage.getItem('bitcoin-current-price')) * parseFloat(localStorage.getItem('bitcoin-count')) 
    + (localStorage.getItem('chainlink-current-price')) * parseFloat(localStorage.getItem('chainlink-count'))
    + (localStorage.getItem('dogecoin-current-price')) * parseFloat(localStorage.getItem('dogecoin-count'))
    + (localStorage.getItem('ethereum-current-price')) * parseFloat(localStorage.getItem('ethereum-count'))
    + (localStorage.getItem('litecoin-current-price')) * parseFloat(localStorage.getItem('litecoin-count'))
    );
    var totalValue = (parseFloat(localStorage.getItem("cash")) + equity).toFixed(2);
    let totalReturns = ((parseFloat(localStorage.getItem('cash')) + equity) - 1000000).toFixed(2);
    let totalReturnsPercentage = (totalReturns / (1000000) * 100).toFixed(2);


    // Bitcoin
    let bitcoinTotalCost = (parseFloat(localStorage.getItem('bitcoin-count')) * parseFloat(localStorage.getItem('bitcoin-avg-price'))).toFixed(2);
    let bitcoinEquity =  ( parseFloat(localStorage.getItem('bitcoin-count')) * parseFloat(localStorage.getItem("bitcoin-current-price"))).toFixed(2);
    let bitcoinReturns = (bitcoinEquity - bitcoinTotalCost).toFixed(2);
    let bitcoinReturnsPercentage = ((bitcoinReturns / bitcoinTotalCost) * 100).toFixed(2);

    // Chainlink
    let chainlinkTotalCost =  (parseFloat(localStorage.getItem('chainlink-count')) * parseFloat(localStorage.getItem('chainlink-avg-price'))).toFixed(2);
    let chainlinkEquity = ( parseFloat(localStorage.getItem('chainlink-count')) * parseFloat(localStorage.getItem("chainlink-current-price"))).toFixed(2);
    let chainlinkReturns = (chainlinkEquity - chainlinkTotalCost).toFixed(2);
    let chainlinkReturnsPercentage = ((chainlinkReturns / chainlinkTotalCost) * 100).toFixed(2);

    // Dogecoin
    let dogecoinTotalCost = (parseFloat(localStorage.getItem('dogecoin-count')) * parseFloat(localStorage.getItem('dogecoin-avg-price'))).toFixed(2);
    let dogecoinEquity = ( parseFloat(localStorage.getItem('dogecoin-count')) * parseFloat(localStorage.getItem("dogecoin-current-price"))).toFixed(2);
    let dogecoinReturns = (dogecoinEquity - dogecoinTotalCost).toFixed(2);
    let dogecoinReturnsPercentage = ((dogecoinReturns / dogecoinTotalCost) * 100).toFixed(2);

    // Ethereum
    let ethereumTotalCost =  (parseFloat(localStorage.getItem('ethereum-count')) * parseFloat(localStorage.getItem('ethereum-avg-price'))).toFixed(2);
    let ethereumEquity = ( parseFloat(localStorage.getItem('ethereum-count')) * parseFloat(localStorage.getItem("ethereum-current-price"))).toFixed(2);
    let ethereumReturns = (ethereumEquity - ethereumTotalCost).toFixed(2);
    let ethereumReturnsPercentage = ((ethereumReturns / ethereumTotalCost) * 100).toFixed(2);

    // Litecoin
    let litecoinTotalCost = (parseFloat(localStorage.getItem('litecoin-count')) * parseFloat(localStorage.getItem('litecoin-avg-price'))).toFixed(2);
    let litecoinEquity = ( parseFloat(localStorage.getItem('litecoin-count')) * parseFloat(localStorage.getItem("litecoin-current-price"))).toFixed(2);
    let litecoinReturns = (litecoinEquity - litecoinTotalCost).toFixed(2);
    let litecoinReturnsPercentage = ((litecoinReturns / litecoinTotalCost) * 100).toFixed(2);

    // Get current page
    let path = window.location.pathname;
    let page = path.split("/").pop();

    // Page = Index.html
    console.log(page);
    if (page == "" || page == "index.html"){


        //Display Current Prices:
        document.getElementById("bitcoin-current-span").innerText = localStorage.getItem("bitcoin-current-price");
        document.getElementById("chainlink-current-span").innerText = localStorage.getItem("chainlink-current-price");
        document.getElementById("dogecoin-current-span").innerText = localStorage.getItem("dogecoin-current-price");
        document.getElementById("ethereum-current-span").innerText = localStorage.getItem("ethereum-current-price");
        document.getElementById("litecoin-current-span").innerText = localStorage.getItem("litecoin-current-price");

    


        //Display Portfolio Information:
        document.getElementById("total-portfolio-value").innerText = totalValue;
        document.getElementById('total-equity').innerText = equity.toFixed(2);
        document.getElementById('total-cash').innerText = ((parseFloat(localStorage.getItem("cash"))).toFixed(2));
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
        else{
            document.getElementById('total-returns-percentage').innerText = ' (0%)';
        }

        // Bitcoin Display

        document.getElementById('bitcoin-current-quantity').innerText = localStorage.getItem('bitcoin-count');
        document.getElementById('bitcoin-average-cost').innerText = (parseFloat(localStorage.getItem('bitcoin-avg-price'))).toFixed(2);
        document.getElementById('bitcoin-total-cost').innerText = bitcoinTotalCost;
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
        else{
            document.getElementById('bitcoin-returns-percentage').innerText = ' (0%)';
        }

        // Bitcoin

        document.getElementById('bitcoin-current-quantity').innerText = localStorage.getItem('bitcoin-count');
        document.getElementById('bitcoin-average-cost').innerText = (parseFloat(localStorage.getItem('bitcoin-avg-price'))).toFixed(2);
        document.getElementById('bitcoin-total-cost').innerText = bitcoinTotalCost;
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
        else{
            document.getElementById('bitcoin-returns-percentage').innerText = ' (0%)';
        }
        
        // Chainlink

        document.getElementById('chainlink-current-quantity').innerText = localStorage.getItem('chainlink-count');
        document.getElementById('chainlink-average-cost').innerText = (parseFloat(localStorage.getItem('chainlink-avg-price'))).toFixed(2);
        document.getElementById('chainlink-total-cost').innerText = chainlinkTotalCost;
        document.getElementById('chainlink-equity').innerText = chainlinkEquity;
        document.getElementById('chainlink-returns').innerText = chainlinkReturns;
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
        else{
            document.getElementById('chainlink-returns-percentage').innerText = ' (0%)';
        }
        
        
        // Dogecoin

        document.getElementById('dogecoin-current-quantity').innerText = localStorage.getItem('dogecoin-count');
        document.getElementById('dogecoin-average-cost').innerText = parseFloat(localStorage.getItem('dogecoin-avg-price')).toFixed(4);
        document.getElementById('dogecoin-total-cost').innerText= dogecoinTotalCost;
        document.getElementById('dogecoin-equity').innerText = dogecoinEquity;
        document.getElementById('dogecoin-returns').innerText = dogecoinReturns;
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
        else{
            document.getElementById('dogecoin-returns-percentage').innerText = ' (0%)';
        }
        
        // Ethereum
        
        document.getElementById('ethereum-current-quantity').innerText = localStorage.getItem('ethereum-count');
        document.getElementById('ethereum-average-cost').innerText = (parseFloat(localStorage.getItem('ethereum-avg-price'))).toFixed(2);
        document.getElementById('ethereum-total-cost').innerText = ethereumTotalCost;
        document.getElementById('ethereum-equity').innerText = ethereumEquity;
        document.getElementById('ethereum-returns').innerText = ethereumReturns;
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
        else{
            document.getElementById('ethereum-returns-percentage').innerText = ' (0%)';
        }
        
        // Litecoin

        document.getElementById('litecoin-current-quantity').innerText = localStorage.getItem('litecoin-count');
        document.getElementById('litecoin-average-cost').innerText = parseFloat(localStorage.getItem('litecoin-avg-price'));
        document.getElementById('litecoin-total-cost').innerText= litecoinTotalCost;
        document.getElementById('litecoin-equity').innerText = litecoinEquity;
        document.getElementById('litecoin-returns').innerText = litecoinReturns;
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
        else{
            document.getElementById('litecoin-returns-percentage').innerText = ' (0%)';
        }


            createTable(stringToArray(localStorage.getItem("allOrders")));
        }

    // Page = orderHistory.html
    if(page == "orderHistory.html"){
        createTable(stringToArray(localStorage.getItem("allOrders")));
    }

    // Page = performance.html
    if (page == "performance.html"){

        //Display Total Value of Portfolio:
    
        document.getElementById("total-portfolio-value").innerText = totalValue;
        document.getElementById('total-equity').innerText = equity.toFixed(2);
        document.getElementById('total-cash').innerText = ((parseFloat(localStorage.getItem("cash"))).toFixed(2));
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
        else{
            document.getElementById('total-returns-percentage').innerText = ' (0%)';
        }


        createPieChart(bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity);
        createBarChart(bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity);
        createDoughnutChart(((parseFloat(localStorage.getItem("cash"))).toFixed(2)),equity.toFixed(2));
    }


    // Append historialPerformance to localStorage
    historicalPerformance(totalValue);                                       

}

const dropdownListener = (value) => {
    document.getElementById("form-current-price").innerText = localStorage.getItem(value);
}
const quantityListener = (value) => {
    document.getElementById("form-order-value").innerText = (value * localStorage.getItem(document.getElementById("crypto-type").value)).toFixed(2);
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
    setInterval(updateMarket,60000); 
    // Update Prices every 1 minute
 });
initializeLocalStorage();

