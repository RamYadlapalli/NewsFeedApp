
var jsonObj= {
  "data": [
    {
      "label": "SL",
      "value": 13.13
    },
    {
      "label": "DA",
      "value": 8.8
    },
    {
      "label": "RI",
      "value": 8.67
    },
    {
      "label": "NA",
      "value": 8.33
    },
    {
      "label": "JP",
      "value": 7.47
    },
    {
      "label": "IN",
      "value": 7.33
    },
    {
      "label": "DN",
      "value": 6.27
    },
    {
      "label": "WH",
      "value": 5.73
    },
    {
      "label": "TO",
      "value": 5.67
    },
    {
      "label": "JO",
      "value": 4.87
    },
    {
      "label": "SP",
      "value": 4.87
    },
    {
      "label": "KC",
      "value": 4.73
    },
    {
      "label": "SI",
      "value": 4.2
    },
    {
      "label": "LI",
      "value": 4.13
    },
    {
      "label": "CI",
      "value": 3.73
    },
    {
      "label": "AT",
      "value": 3.47
    },
    {
      "label": "RO",
      "value": 3.33
    },
    {
      "label": "CO",
      "value": 2.87
    },
    {
      "label": "DE",
      "value": 2.6
    },
    {
      "label": "KN",
      "value": 2.13
    },
    {
      "label": "LO",
      "value": 1.8
    },
    {
      "label": "CH",
      "value": 1.6
    },
    {
      "label": "CL",
      "value": 1.6
    },
    {
      "label": "GR",
      "value": 1.07
    },
    {
      "label": "FW",
      "value": 1.0
    },
    {
      "label": "EV",
      "value": 0.93
    },
    {
      "label": "YT",
      "value": 0.8
    },
    {
      "label": "MI",
      "value": 0.53
    },
    {
      "label": "BI",
      "value": 0.4
    },
    {
      "label": "AP",
      "value": 0.4
    },
    {
      "label": "DR",
      "value": 0.4
    },
    {
      "label": "SB",
      "value": 0.27
    }
  ]
};
var labelArray=[];
var valuesArray=[];

$.each(jsonObj.data, function(i,e){
  labelArray.push(e.label);
  valuesArray.push(e.value);

});

google.charts.load('current', {'packages':['corechart']});
var renderChartData = function(){
    drawZingChart();
google.charts.setOnLoadCallback(drawChart);
$("#highChartStartTime").text("Highcharts Before Render: "+ new Date().getTime());
console.log("Highcharts Before Render " + new Date()+" In miliseconds"+new Date().getMilliseconds());
Highcharts.chart('highchartsContainer1', {
    chart: {
        type: 'column',
        events: {
          load: function(event){
            $("#highChartEndTime").text("Highcharts After Render: "+ new Date().getTime());
                console.log("high charts rendered @ " + new Date()+" In miliseconds"+new Date().getMilliseconds());
          }
        }
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories:labelArray,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Lane',
        data: valuesArray,
        animation: false

    }]
});

};
function drawZingChart(){
    var myConfig = {
  type: "bar",
  series: [
    {
      values:valuesArray
    }
  ],
  "scale-x": {
    labels: labelArray
  }
};
$("#zingChartStartTime").text("zingcharts Before Render: "+ new Date().getTime());
 console.log("Zingcharts Before Render " + new Date()+" In miliseconds"+new Date().getMilliseconds());
  zingchart.bind('zingChartContainer','load',function(){
                $("#zingChartEndTime").text("zingcharts After Render: "+ new Date().getTime());
                console.log("Chart rendered @ "+ new Date()+" In miliseconds"+new Date().getMilliseconds());
                console.log("-------------------------------------------------------------------------------------");
 });

zingchart.render({ 
	id : 'zingChartContainer', 
	data : myConfig, 
	height: "100%", 
	width: "100%" 
});
}
function drawChart()
{

 var data = new google.visualization.DataTable();
     data.addColumn('string','label');
    data.addColumn('number','value');

$.each(jsonObj.data,function(i,e){
  data.addRow([e.label,e.value]);
});
     /* data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);*/

      
      var options = {
        title: "",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('googleChartContainer'));
         console.log("GoogleCharts Before Render " + new Date()+" In miliseconds"+new Date().getMilliseconds());
         $("#googleChartStartTime").text("Google charts Before Render: "+ new Date().getTime());
      google.visualization.events.addListener(chart, 'ready', function(){
        $("#googleChartEndTime").text("Google charts After Render: "+ new Date().getTime());
        console.log("Google Chart rendered @ "+ new Date()+" In miliseconds"+new Date().getMilliseconds());
        console.log("-------------------------------------------------------------------------------------");
      });
      chart.draw(data, options);
      }