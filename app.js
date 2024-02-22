let graphGenerated = false;
let distance;
let shot_dir;
let shotsCount = 0;
var chart;

const submit_shot_btn = document.getElementById('submit_shot');
const clear_btn = document.getElementById('clear');

const api_url = "https://api.punkapi.com/v2/beers/random ";
fetch(api_url)
  .then(res => res.json())
  .then(data => console.log(data))
  // this needs work

document.addEventListener('DOMContentLoaded', function() {
  ChartUpdate();
});

clear_btn.addEventListener('click', function() {
  localStorage.clear();
  ChartUpdate();
});

submit_shot_btn.addEventListener('click', () => {
  if (!(distance == 0 && (shot_dir == 'L' || shot_dir == 'R'))) {
    shotsCount = localStorage.length + 1;
    let data = [shot_dir, distance];
    localStorage.setItem(shotsCount, data)
    ChartUpdate();
  }
});

jQuery(function($) {
  $('.distance').click(function() {
    $('.distance').not(this).removeClass('active').html(function() {
      
    });
    distance = $(this).attr("value");
    $(this).addClass('active');
    
  });
});

jQuery(function($) {
  $('.shotDirection').click(function() {
    $('.shotDirection').not(this).removeClass('active').html(function() {
      
    });
    shot_dir = $(this).attr("value");
    
    $(this).addClass('active')
  });
});

function GetData(){
  let Left_Short_data = 0;
  //let Left_OnPoint_data = 0;
  let Left_Long_data = 0;
  let Straight_Short_data = 0;
  let Straight_OnPoint_data = 0;
  let Straight_Long_data = 0;
  let Right_Short_data = 0;
  //let Right_OnPoint_data = 0;
  let Right_Long_data = 0;
  let data = [];

  for (var i = 0; i <= localStorage.length - 1; i++) {
    data = ((localStorage.getItem(localStorage.key(i))).split(","));
    switch(data[0]){
      case 'L':
        switch(data[1])
        {
          case '-1':
            Left_Short_data += 1;
            break;
          case '0':
            //Left_OnPoint_data += 1;
            break;
          case '1':
            Left_Long_data += 1;
            break;
        }
        break;
      case 'S':
        switch(data[1])
        {
          case '-1':
            Straight_Short_data += 1;
            break;
          case '0':
            Straight_OnPoint_data += 1;
            break;
          case '1':
            Straight_Long_data += 1;
            break;
        }
        break;
      case 'R':
        switch(data[1])
        {
          case '-1':
            Right_Short_data += 1;
            break;
          case '0':
            //Right_OnPoint_data += 1;
            break;
          case '1':
            Right_Long_data += 1;
            break;
        }
        break;
    } 
  }
  return [Left_Short_data, Left_Long_data, 
    Straight_Short_data, Straight_OnPoint_data, Straight_Long_data,
    Right_Short_data, Right_Long_data];
}

function ChartUpdate(){

  let playerData = GetData();
  console.log(playerData);

  var options = {
    series: [playerData[0], playerData[1], playerData[2], playerData[3], playerData[4], playerData[5], playerData[6]],
    chart: {
      type: 'pie',
      width: 1000
    },
    labels: ['Short Left', 'Long Left', 'Short Straight', 'In Hole Straight', 'Long Straight','Short Right', 'Long Right',],
    fill: {
      opacity: 0.8
    },
    legend: {
      position: 'bottom',
      fontSize: '36px',
      offsetY: 7,
      labels: {
        colors: ['#FFF']
      },
    },
    dataLabels: {
      style: {
        fontSize: '36px'
      },
    },
    tooltip: {
      style: {
        fontSize: '36px',
        fontFamily: undefined
      },
    },
    theme: {
      palette: 'palette1'
    }
  };

  if (chart != null){
    chart.destroy()
  }
  chart = new ApexCharts(document.getElementById("myChart"), options);
  chart.render();
}
