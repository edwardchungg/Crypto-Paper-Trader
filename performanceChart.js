var myChart;


// Pie Chart

const createPieChart = (bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity) => {
    
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
          labels: ["Bitcoin", "Chainlink", "Dogecoin", "Ethereum", "Litecoin"],
          datasets: [{
            label: "Portfolio Diversity",
            backgroundColor: ["rgba(242, 169, 0, 0.8)", "rgba(46, 93, 220,0.8)","rgba(217, 189, 98,0.8)","rgba(178, 168, 236, 0.8)","rgba(136, 203, 245 ,0.8)"],
            data: [bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Portfolio Diversity ($)'
          }
        }
    });

}



// Bar chart

const createBarChart = (bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity) => {
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
        labels: ["Bitcoin", "Chainlink", "Dogecoin", "Ethereum", "Litecoin"],
        datasets: [
            {
            label: "Portfolio Diversity",
            backgroundColor: ["rgba(242, 169, 0, 0.8)", "rgba(46, 93, 220,0.8)","rgba(217, 189, 98,0.8)",  ,"rgba(136, 203, 245 ,0.8)"],
            data: [bitcoinEquity,chainlinkEquity,dogecoinEquity,ethereumEquity,litecoinEquity]
            }
        ]
        },
        options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Portfolio Diversity ($)'
        }
        }
    });
}


// Doughnut Chart

const createDoughnutChart = (cash,equity) => {
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Cash", "Equity"],
          datasets: [
            {
              label: "Cash vs Equity",
              backgroundColor: ["rgba(94, 186, 125, 0.8)","rgba(136, 203, 245 ,0.8)"],
              data: [cash,equity]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Cash vs Equity'
          }
        }
    });
}

// Performance Chart

const createPerformanceChart = (time,value) => {

    if (myChart){
      myChart.destroy();
    }

    // get last price of value and check to see if profit is above 1,000,000
    const lastItem = value[value.length - 1];
    var lineColor;
    var fillColor;
    let ctx = document.getElementById("line-chart").getContext('2d');
    var gradient = ctx.createLinearGradient(0,0,0,400);
    if (parseFloat(lastItem) >= 1000000){
        lineColor='green';
        gradient.addColorStop(0,'rgba(0,256,0,0.4');
        gradient.addColorStop(1,'rgba(0,256,0,0.1');
    }
    else{
        lineColor='red';
        gradient.addColorStop(0,'rgba(256,0,0,0.4');
        gradient.addColorStop(1,'rgba(256,0,0,0.1');
    }

    myChart = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: time,
          datasets: [{ 
              data: value,
              label: "Portfolio",
              borderColor: lineColor,
              fill: true,
              backgroundColor: gradient,
              borderJoinsStyle: 'round',
              borderCapsStyle: 'round',
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: .2,
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              },
              display: false
            }],
            yAxes: [{
              gridLines: {drawOnChartArea: false
              },
              display: true
            }]
          },
          legend: {
            display: false
          }
        }
      });
}