import React, { useRef, useLayoutEffect,useState,useEffect,FC } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Select from 'react-select'
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';

type PropsWithChild = {
    appl1: String;
    height: number;
  };


//const PortofolioChart: FC = ({appl1='キヤノン株式会社',height=800}:PropsWithChild)=>{
function PortofolioChart({appl1='キヤノン株式会社',height=600}:PropsWithChild) {
  const [applicant1,setAppl] = useState(appl1)
  const [options,setOptions] = useState([
    { value: '凸版印刷', label: '凸版印刷' },
    { value: '大日本印刷', label: '大日本印刷' },
    { value: 'トッパン・フォームズ', label: 'トッパン・フォームズ' },
    { value: 'トヨタ自動車株式会社', label: 'トヨタ自動車株式会社' },
    { value: '日本製鉄', label: '日本製鉄' },
    { value: 'グーグル', label: 'グーグル' },       
    { value: 'マイクロソフト', label: 'マイクロソフト' },           
    { value: '富士フイルム', label: '富士フイルム' },               
    { value: 'ダイキン工業', label: 'ダイキン工業' },                   
  ])

  useEffect(() => {
    let url_appl = "https://get-applicantsname-byrunjg3yq-uc.a.run.app/";
    fetch(url_appl)
    .then(result => result.json())
        .then(applData =>setOptions(applData))
  }, []);


  const applchange = (e:any) => {
    setAppl(e.value);
    //console.log(e.value);
  }

  useLayoutEffect(() => {
    
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    

    let url = "https://get-portfolio-peryear-byrunjg3yq-uc.a.run.app?applicant1=" + applicant1;
  
    // Handle loaded data
    
    am5.net.load(url).then((result) => {
      
      
      const rawdata = am5.JSONParser.parse(result.response)
      //console.log(rawdata)

      let yearData:any = {};
      let firstYear = 2010;
      let lastYear = 2021;
      let currentYear = firstYear;

      let tempymin = 0
      let tempymax = 1
      let tempval = 5
      for (var year = firstYear; year <= lastYear; year++) {
        const data:any = [];
        Object.keys(rawdata).forEach(function (key) {
          let tempyear = Number(rawdata[key]['year'])
          if(tempyear == year){
              let x = rawdata[key]['x']*100
              let y = rawdata[key]['y']*100
              let value = rawdata[key]['value']
              let field = rawdata[key]['patclass']
              let H_APPLICANT = rawdata[key]['H_APPLICANT']

              if(y<tempymin){tempymin = y}
              if(y>tempymax){tempymax = y}
              if(value>tempval){tempval = value}

              data.push({
                x: x,
                y: y,
                value: value,
                field: field,
                year: tempyear,
                H_APPLICANT:H_APPLICANT
              })
          }else{}

        })
        
        yearData[year] = data
      }
      console.log(yearData)

      const yAxismin = tempymin -0.1
      const yAxismax = tempymax +0.1
      const xAxismin = 0
      const xAxismax = 150
      const maxnodesize = tempval + 0.5
      const ycenter = yAxismax/2
      const xcenter = xAxismax/2

  

      
    
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY"
      }));
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: xAxismin,
      max: xAxismax,
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.children.push(am5.Label.new(root, { text: "正規化後TS値*100", x: am5.p50, centerX: am5.p50 }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: yAxismin,
      max: yAxismax,
      renderer: am5xy.AxisRendererY.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    yAxis.children.moveValue(am5.Label.new(root, { text: "注目度*100", rotation: -90, y: am5.p50, centerX: am5.p50 }), 0);

    
    // color fills
    let series0 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "ax",
      valueYField: "ay",
      fill: am5.color(0x91d1da)
    }));
    series0.fills.template.setAll({ fillOpacity: 0.9, visible: true });
    series0.strokes.template.set("forceHidden", true);
    series0.data.setAll([
      { ax: xAxismin, ay: ycenter },
      { ax: xcenter, ay: ycenter},
      { ax: xcenter, ay: yAxismax+100 },
      { ax: xAxismin, ay: yAxismax+100 }
    ]);
    
    let series1 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "ax",
      valueYField: "ay",
      fill: am5.color(0x48b2b7)
    }));
    series1.fills.template.setAll({ fillOpacity: 0.9, visible: true });
    series1.strokes.template.set("forceHidden", true);
    series1.data.setAll([
      { ax: xAxismin, ay: ycenter },
      { ax: xcenter, ay: ycenter },
      { ax: xcenter, ay: yAxismin-100 },
      { ax: xAxismin, ay: yAxismin-100 }
    ]);
    
    let series2 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "ax",
      valueYField: "ay",
      fill: am5.color(0xe3853c)
    }));
    series2.fills.template.setAll({ fillOpacity: 0.9, visible: true });
    series2.strokes.template.set("forceHidden", true);
    series2.data.setAll([
      { ax: xAxismax, ay: ycenter },
      { ax: xcenter, ay: ycenter },
      { ax: xcenter, ay: yAxismin-100 },
      { ax: xAxismax, ay: yAxismin-100 }
    ]);
    
    let series3 = chart.series.push(am5xy.LineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "ax",
      valueYField: "ay",
      fill: am5.color(0xe8c634)
    }));
    series3.fills.template.setAll({ fillOpacity: 0.9, visible: true });
    series3.strokes.template.set("forceHidden", true);
    series3.data.setAll([
      { ax: xAxismax, ay: ycenter },
      { ax: xcenter, ay: ycenter },
      { ax: xcenter, ay: yAxismax+100 },
      { ax: xAxismax, ay: yAxismax+100 }
    ]);
    
    // move grid forward
    chart.plotContainer.children.moveValue(
      chart.gridContainer,
      chart.plotContainer.children.length - 1
    );
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      calculateAggregates: true,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "y",
      valueXField: "x",
      valueField: "value"
    }));
    
    series.strokes.template.set("visible", false);
    
    // Add bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    //let circleTemplate = am5.Template.new({}); 
    let circleTemplate: am5.Template<am5.Circle> = am5.Template.new({});
    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root, {
        radius: 10,
        fill: am5.color('#ff0000'),
        fillOpacity: 0.6,
        templateField: "bulletSettings",
        tooltipText: "累積特許件数:{value}\n分野:{field}\n出願:{year}年\n出願人:{H_APPLICANT}"
      }, circleTemplate);
      
      return am5.Bullet.new(root, {
        sprite: bulletCircle
      });
    });
  
        // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set("heatRules", [{
      target: circleTemplate,
      min: 3,
      max: 35,
      dataField: "value",
      key: "radius", maxValue: maxnodesize
    }]);
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      yAxis: yAxis
    }));
    
    // Add scrollbars
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    
    chart.set("scrollbarY", am5.Scrollbar.new(root, {
      orientation: "vertical"
    }));
    
    // Label
    let label = chart.plotContainer.children.push(am5.Label.new(root, {
      text: currentYear.toString(),
      fontSize: "5em",
      fill: am5.color(0x000000),
      opacity: 0.3
    }));
    
    // Create controls
    let container = chart.plotContainer.children.push(am5.Container.new(root, {
      y: am5.p100,
      centerX: am5.p50,
      centerY: am5.p100,
      x: am5.p50,
      width: am5.percent(90),
      layout: root.horizontalLayout,
      paddingBottom: 10
    }));
    
    let playButton = container.children.push(am5.Button.new(root, {
      themeTags: ["play"],
      centerY: am5.p50,
      marginRight: 20,
      icon: am5.Graphics.new(root, {
        themeTags: ["icon"]
      })
    }));
    
    playButton.events.on("click", function () {
      if (playButton.get("active")) {
        slider.set("start", slider.get("start") + 0.0001);
      } else {
        slider.animate({
          key: "start",
          to: 1,
          duration: 15000 * (1 - slider.get("start"))
        });
      }
    });
    
    let slider = container.children.push(am5.Slider.new(root, {
      orientation: "horizontal",
      start: 0,
      centerY: am5.p50
    }));
    
    slider.on("start", function (start) {
      if (start === 1) {
        playButton.set("active", false);
      }
    });
    
    slider.events.on("rangechanged", function () {
      updateSeriesData(
        firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
      );
    });
    
    function updateSeriesData(year:any) {
      if (currentYear != year) {
        currentYear = year;
        let data = yearData[year];
    
        let i = 0;
        am5.array.each(data, function (item) {
          series.data.setIndex(i, item);
          i++;
        });
    
        label.set("text", year.toString());
      }
    }
    
    series.data.setAll(yearData[currentYear]);

    }).catch(function(result) {
    // This gets executed if there was an error loading URL
    // ... handle error
    console.log("Error loading " + result.response);
   });
  
    return () => {
      root.dispose();
    };
  }, 
  [applicant1]
  );

  return (
    <div>
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Select options={options}
          value={options.find(obj => obj.value === applicant1)}
          onChange={applchange}
          isSearchable
          />
          <h2>{applicant1} 出願ライフサイクルマップ</h2>
          <div id="chartdiv" style={{ width: "100%", height : height }}></div>
  
      </Grid>
    </Container>
  </div>
    

  );
}

export default PortofolioChart