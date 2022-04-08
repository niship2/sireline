import React, { useRef,useState, useLayoutEffect,useEffect ,useContext} from 'react';
//import './App.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { resolve } from 'path/posix';
import { appl1,appl2 } from '../selectbox'
import Select from 'react-select'
import { number } from 'prop-types';

type Props = {
  children?: string;
};


function Comp1vis(props: any) {
  const [applicant1,setAppl] = useState("キヤノン株式会社")
  const [applicant2,setAppl2] = useState("株式会社リコー")
  const [count, setCount] = useState(0)
  
  const applchange:any= (e: { value: React.SetStateAction<string>; }) => {
    setAppl(e.value);
    //console.log(e.value);
  }
  const applchange2:any = (e: { value: React.SetStateAction<string>; }) => {
    setAppl2(e.value);
    //console.log(e.value);
  }

  const options = [
    { value: '凸版印刷', label: '凸版印刷' },
    { value: '大日本印刷', label: '大日本印刷' },
    { value: 'トッパン・フォームズ', label: 'トッパン・フォームズ' },
    { value: 'トッパン・', label: 'トッパン・' },
  ]


  

  //console.log(applicant1)
  useLayoutEffect(() => {
        
        let root = am5.Root.new("chartdiv3");
        root.setThemes([
          am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
            arrangeTooltips: false
            })
          );


        // Load external data
        //let url = "/api/compdata?applicant1=" + applicant1 + "&applicant2=" + applicant2;
        let url = "https://us-central1-techsize.cloudfunctions.net/get_comp1?applicant1=" + applicant1 + "&applicant2=" + applicant2;
  
        // Handle loaded data
        am5.net.load(url).then((result)=> {
          const data = am5.JSONParser.parse(result.response);
          chart.getNumberFormatter().set("numberFormat", "#.#s");
          let legend = chart.children.push(
            am5.Legend.new(root, {
              centerX: am5.p50,
              x: am5.p50
            })
          );

          let yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
              categoryField: "wipo_clas",
              renderer: am5xy.AxisRendererY.new(root, {
                inversed: true,
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
              })
            })
          );

          yAxis.data.setAll(data);
          let xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererX.new(root, {})
            })
          );

          function createSeries(field: string, labelCenterX: number | am5.Percent, pointerOrientation: string, rangeValue: number) {
            let series = chart.series.push(
              am5xy.ColumnSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: field,
                categoryYField: "wipo_clas",
                sequencedInterpolation: true,
                clustered: false,
                tooltip: am5.Tooltip.new(root, {
                  
                  //pointerOrientation: pointerOrientation,
                  labelText: "{categoryY}: {valueX}"
                })
              })
            );
      
            series.columns.template.setAll({
              height: am5.p100
            });
      
            series.bullets.push(function() {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  centerY: am5.p50,
                  text: "{valueX}",
                  populateText: true,
                  centerX: labelCenterX
                })
              });
            });
      
            series.data.setAll(data);
            series.appear();
      
            let rangeDataItem:any = xAxis.makeDataItem({
              value: rangeValue
            });
            
            xAxis.createAxisRange(rangeDataItem );
            rangeDataItem.get("grid").setAll({
              strokeOpacity: 1,
              stroke: series.get("stroke")
            });
      
            let label = rangeDataItem.get("label");
            label.setAll({
              text: "",//.toUpperCase(),
              fontSize: "1.1em",
              fill: series.get("stroke"),
              paddingTop: 0,
              isMeasured: false,
              centerX: labelCenterX
            });
            label.adapters.add("dy", function() {
              return -chart.plotContainer.height();
            });
      
            return series;
          }

          createSeries("A_appcount", am5.p100, "right", -50);
          createSeries("B_appcount", 0, "left", 40);


          chart.set("cursor", am5xy.XYCursor.new(root, {}));
          

        }).catch(function(result) {
          // This gets executed if there was an error loading URL
          // ... handle error
          console.log("Error loading " + result.response);
        });
  
      //}
      //root.current = root;
      return () => {
        root.dispose();

      };

      
    },   
    //[]);
    );
    return (
      <div>
        <Container maxWidth="lg">
        <Grid container spacing={1}>
      <Grid item xs={5}>
      <Select options={options}
        value={options.find(obj => obj.value === applicant1)}
        onChange = {applchange}
        isSearchable
        />
      </Grid>
      <Grid item xs={1}>
        vs.
      </Grid>
      <Grid item xs={5}>
      <Select options={options}
        value={options.find(obj => obj.value === applicant2)}
        onChange={applchange2}
        />

      </Grid>
    </Grid>
    </Container>

    
    <Container maxWidth="lg">
      <Grid>
        <div id="chartdiv3" style={{ width: "100%", height: "1000px" }}></div>
      </Grid>
    </Container>

      </div>
      );
  }


  export default Comp1vis;