import React, { useRef,useState, useLayoutEffect,useEffect ,useContext} from 'react';
import type { FC } from 'react';

import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
//import am5hierarchy from "@amcharts/amcharts5"
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { resolve } from 'path/posix';


type Props = {
  id?: string;
};
 
type PropsWithChild = {
  comp1: string;
  comp2: string;
  height: number;

};


let jsdata = {
    name: "Root",
    value: 0,
    children: [
        {
        name: "1",
        linkWith: ["2"],
        children: [
            {
            name: "A",
            children: [
                { name: "A1", value: 1 },
                { name: "A2", value: 1 },
                { name: "A3", value: 1 },
                { name: "A4", value: 1 },
                { name: "A5", value: 1 }
            ]
            },
            {
            name: "B",
            children: [
                { name: "B1", value: 1 },
                { name: "B2", value: 1 },
                { name: "B3", value: 1 },
                { name: "B4", value: 1 },
                { name: "B5", value: 1 }
            ]
            },
            {
            name: "C",
            children: [
                { name: "C1", value: 1 },
                { name: "C2", value: 1 },
                { name: "C3", value: 1 },
                { name: "C4", value: 1 },
                { name: "C5", value: 1 }
            ]
            }
        ]
        },

        {
        name: "2",
        linkWith: ["3"],
        children: [
            {
            name: "D", value:1
            },
            {
            name: "E", value:1
            }
        ]
        },
        {
        name: "3",
        children: [
            {
            name: "F",
            children: [
                { name: "F1", value: 1 },
                { name: "F2", value: 1 },
                { name: "F3", value: 1 },
                { name: "F4", value: 1 },
                { name: "F5", value: 1 }
            ]
            },
            {
            name: "H",
            children: [
                { name: "H1", value: 1 },
                { name: "H2", value: 1 },
                { name: "H3", value: 1 },
                { name: "H4", value: 1 },
                { name: "H5", value: 1 }
            ]
            },
            {
            name: "G",
            children: [
                { name: "G1", value: 1 },
                { name: "G2", value: 1 },
                { name: "G3", value: 1 },
                { name: "G4", value: 1 },
                { name: "G5", value: 1 }
            ]
            }
        ]
        }
    ]
    };


function NetworkChart({comp1="キヤノン株式会社",comp2="株式会社リコー",height=1000}:PropsWithChild) {         
    useLayoutEffect(() => {

        
        let root = am5.Root.new("chartdiv3");

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create wrapper container
        let container = root.container.children.push(
        am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.verticalLayout
        })
        );

        let data = jsdata

       


        // Create series
        // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
        let series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
            singleBranchOnly: false,
            downDepth: 1,
            topDepth: 1,
            maxRadius: 25,
            minRadius: 12,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            idField: "name",
            linkWithStrength: 0.3,
            linkWithField: "linkWith",
            manyBodyStrength: -15,
            centerStrength: 0.5
            })
        );

        series.get("colors").set("step", 2);

        series.data.setAll([data]);
        series.set("selectedDataItem", series.dataItems[0]);

        // Make stuff animate on load
        series.appear(1000, 100);
        
        
        return () => root.dispose();
        
    },[]);
    
    return (
    <div>  
        <Container maxWidth="lg">
        <Grid>
            
            <div id="chartdiv" style={{ width: "100%", height:1000 }}></div>
            
        </Grid>
        </Container>
    </div>
    );



}

export default NetworkChart