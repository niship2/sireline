import React, { useRef, useLayoutEffect,useState,useEffect,FC } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Select from 'react-select'
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import styled from 'styled-components';

// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;

type PropsWithChild = {
    comp1: string;
    comp2: string;
    ipc_level: string;
    height:number;
  };


//const PortofolioChart: FC = ({appl1='キヤノン株式会社',height=800}:PropsWithChild)=>{
function PortofolioChart({comp1='キヤノン株式会社',comp2='株式会社リコー',height=600}:PropsWithChild) {
  const [applicant1,setAppl] = useState(comp1)
  const [applicant2,setAppl2] = useState(comp2)
  const [options,setOptions] = useState([{"value":"キヤノン株式会社","label":"キヤノン株式会社"}])
  const [options2,setOptions2] = useState([{"value":"株式会社リコー","label":"株式会社リコー"}])  

  //{ value: React.SetStateAction<string>; }
  const applchange:any= (e:any) => {
    const applnames = e.map((obj:any) => obj.value).join("$|^")
    //console.log(applnames)
    setAppl("^" + applnames +"$")
    //setAppl(e.value)
  }
  const applchange2:any = (e: { value: React.SetStateAction<string>; }) => {
    const applnames = e.map((obj:any) => obj.value).join("$|^")
    //console.log(applnames)
    setAppl2("^" + applnames +"$")
    
  }

  function getoptions(rowData:any) {
    return {"value":rowData.H_APPLICANT,"label":rowData.H_APPLICANT};
  }


  function  applChange(e) {
    
    let url_appl = "https://get-applicantsname-byrunjg3yq-uc.a.run.app/?appname=" + e.target.value;
         
    fetch(url_appl)
    .then(result => result.json())
        .then(rowData =>{
          let fuga2 = rowData.map(getoptions)                  
          setOptions(fuga2)
          setAppl(fuga2[0].value)            
        }
        )
}

function applChange2(e) {
  let url_appl = "https://get-applicantsname-byrunjg3yq-uc.a.run.app/?appname=" + e.target.value;
   
  fetch(url_appl)
  .then(result => result.json())
      .then(rowData =>{
        let fuga2 = rowData.map(getoptions)                  
        setOptions2(fuga2)
        setAppl2(fuga2[0].value)            
      }
      )
}


  function changeattrname(rowData:any) {
    return {"x":(rowData.cos_sim_percent+rowData.sojo_sim_percent)/2,
            "y":rowData.hokan_sim_percent,
            "value":(rowData.cos_sim_percent+rowData.sojo_sim_percent)/2 + rowData.hokan_sim_percent,
            "title":rowData.comp_2,
            "x2":80,
            "y2":0,
            "value2":1
        };
  }



  useLayoutEffect(() => {
    
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
  
    let url = "https://get-tbl2-byrunjg3yq-uc.a.run.app/?appl1="+ applicant1 +"&appl2="+ applicant2 + "&ipc_level=FTdef";
  
    // Handle loaded data
    
    am5.net.load(url).then((result) => {
      const rawdata = am5.JSONParser.parse(result.response)
      
      console.log(rawdata);
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX:true,
        pinchZoomY:true
      }));
    

        chart.get("colors").set("step", 2);
   

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
        tooltip: am5.Tooltip.new(root, {})
        }));
    
    
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));



        // Add heat rule
        // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
        let series0 = chart.series.push(am5xy.LineSeries.new(root, {
            calculateAggregates: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "y",
            valueXField: "x",
            valueField: "value",
            tooltip: am5.Tooltip.new(root, {
                labelText: "x: {valueX}, y: {valueY}, 出願人: {title}"
            })
        }));

        // Add bullet
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
        let circleTemplate = am5.Template.new({});
        series0.bullets.push(function() {
            let graphics = am5.Circle.new(root, {
            fill: series0.get("fill"),
        }, circleTemplate);
        return am5.Bullet.new(root, {
            sprite: graphics
        });
        });

        // Add heat rule
        // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
        series0.set("heatRules", [{
        target: circleTemplate,
        min: 3,
        max: 35,
        dataField: "value",
        key: "radius"
        }]);


  
  
        // Create second series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series1 = chart.series.push(am5xy.LineSeries.new(root, {
            calculateAggregates: true,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "y2",
            valueXField: "x2",
            valueField: "value2",
            tooltip: am5.Tooltip.new(root, {
            labelText: "x: {valueX}, y: {valueY}, value: {value}"
            })
        }));
  
        // Add bullet
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
        let starTemplate = am5.Template.new({});
        series1.bullets.push(function() {
            let graphics = am5.Star.new(root, {
            fill: series1.get("fill"),
            spikes: 8,
            innerRadius: am5.percent(70),
            }, starTemplate);
            return am5.Bullet.new(root, {
            sprite: graphics
            });
        });
  
  
        // Add heat rule
        // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
        series1.set("heatRules", [{
            target: starTemplate,
            min: 3,
            max: 50,
            dataField: "value",
            key: "radius"
        }]);
  
  
        series0.strokes.template.set("strokeOpacity", 0);
        series1.strokes.template.set("strokeOpacity", 0);
  
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        chart.set("cursor", am5xy.XYCursor.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            snapToSeries: [series0, series1]
        }));
  
        // Add scrollbars
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));
  
        chart.set("scrollbarY", am5.Scrollbar.new(root, {
            orientation: "vertical"
        }));

        let data = rawdata.map(changeattrname);

  
        series0.data.setAll(data);
        series1.data.setAll(data);
  
  
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series0.appear(1000);
        series1.appear(1000);
  
        chart.appear(1000, 100);
    

 

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
      <Grid item xs={5}>
      <StyledInput
      placeholder="企業1検索"
      onKeyPress={(e) =>{
          if(e.key == 'Enter') {
            
            e.preventDefault()
            applChange(e)
            
          }
        }
        }
      />
      
      <Select options={options}        
        value = {options.find(obj => obj.value === applicant1)}
        onChange = {applchange}
        isSearchable
        isMulti
        />
      </Grid>
      <Grid item xs={1}>
        vs.
      </Grid>
      <Grid item xs={5}>
      <StyledInput
      placeholder="企業2検索"
      onKeyPress={(e) =>{
        if(e.key == 'Enter') {
          e.preventDefault()
          
          applChange2(e)
          
        }
      }
      }  
      />
      <Select options={options2}
        value={options2.find(obj => obj.value === applicant2)}
        onChange={applchange2}
        isSearchable
        isMulti
        />
      </Grid>
    </Grid>
    </Container>

    
    <Container maxWidth="lg">
      <Grid>
        <div id="chartdiv" style={{ width: "100%", height: height }}></div>
      </Grid>
    </Container>

      </div>
    

  );
}

export default PortofolioChart