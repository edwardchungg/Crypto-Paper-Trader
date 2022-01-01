// Updates localStorage with historical Performance
//          Currently refreshing every minute under the updateMarket() function
// !!!!! Need to determine how this data will be handled !!!!!! 
//       Will we limit the data to only the last 100 entries?
//       Will we make the data show the last minute, last 5 minutes, hour, or day?


const historicalPerformance = (totalValue) => {

    var dataArray;

    let d = new Date();
    let time = d.toTimeString();
    dataArray = [];
    let newArray = [time.slice(0,8), totalValue];

    if (localStorage.getItem('historicalPerformance') == null){
        dataArray.push(newArray);
    }
    else {
        let history = localStorage.getItem('historicalPerformance');
        dataArray = stringToArray(history);

        dataArray.push(newArray);
        
    }    
    
    let string = arrToString(dataArray);


    localStorage.setItem('historicalPerformance', addSemicolons(string, 2));
    updatePerformanceChart();
}

const updatePerformanceChart = () => {
    let data = stringToArray(localStorage.getItem('historicalPerformance'));

    let timeArray = [];
    let valueArray = [];
    for (let item of data){
        timeArray.push(item[0]);
        valueArray.push(item[1]);
    }
    // Get current page
    let path = window.location.pathname;
    let page = path.split("/").pop();
    if (page == "performance.html" || page =="index.html"){
        createPerformanceChart(timeArray,valueArray);
    }

}
