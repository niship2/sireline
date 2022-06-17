//import Graph from "react-graph-vis";
//import GraphVis from 'react-graph-vis'
import dynamic from "next/dynamic";
import React, {useState,useContext,useCallback, useEffect,useRef} from "react";
import GetRaceHorse from "../components/getRacehorse";
import { Button,Box,TextField,Checkbox,FormGroup,FormControlLabel  } from "@material-ui/core"
import { useAmp } from "next/amp";
import graphd2 from "../public/sireline.json"

// 追加
const Graph = dynamic(() => import('react-graph-vis'), {
  ssr: false,
  
})




const App = () => {



  const [network,setNetwork] = useState(null)

  useEffect(()=>{
    movetosearchhorse("フジキセキ")
  })

  useEffect(()=>{
    try{
      network.on("selectNode", function (params) {
        if (params.nodes.length == 1) {
          if (network.isCluster(params.nodes[0]) == true) {
            network.openCluster(params.nodes[0]);
          }
        }
      });
    }catch{}
  })


  function movetosearchhorse(search){
    console.log("moveto")
    console.log(network)
    try{
    network.moveTo({
      position: network.getPosition(search), 
      scale: 2.0,
      })
    const connectednodes = network.getConnectedNodes(inputhorse)
    alert(connectednodes)
    }catch{}
  }
   
  
  const [options,SetOptions]=useState({
    nodes:{
      shape:"box"
      ,font:{size:5}
      ,group:"Modularity Class"
    },
      
    layout: {
      hierarchical: false,
      improvedLayout:false,
    },
    edges: { color: "#000000"},
    physics:{enabled: false}
  });

  const [ graphd, setGraphd ] = useState(graphd2[0]);
  
  function clusterByCmoduclass(searchid,x,y) {
    console.log("cluste")
    console.log(network)
       
    //network.setData(graphd.graph);

    //console.log(searchid)
    //network.setData(graphd.graph);

    const selectednode = graphd.graph.nodes.filter(val=> val.id == searchid)
    const modu_num = selectednode[0].attributes['Modularity Class']
    //console.log()

    var clusterOptionsByData = {
      joinCondition: function (childOptions) {
        //console.log(childOptions['attributes']["Modularity Class"])
        //console.log(childOptions['id'])
        return childOptions["attributes"]["Modularity Class"] == modu_num;
      },
      clusterNodeProperties: {
        id: searchid + "グループ",
        label:searchid + "グループ",
        title:searchid + "グループ",
        attributes:{"Modularity Class":modu_num},
        borderWidth: 3,
        shape: "database",
        size:25,
        x:x,
        y:y
      },
    };
    network.cluster(clusterOptionsByData);
    movetosearchhorse("idCluster")
    console.log(network)
    setNetwork(network)
  }


//  const [state, setState] = useState({
  const state={
    graph:graphd.graph,
    events: {
      select: ({ nodes, edges,pointer: { canvas } }) => {

        console.log("nodeselect")
        console.log(nodes)
        
        const node_url = "https://ja.wikipedia.org/wiki/"+nodes
        //const node_url = encodeURI("https://www.jbis.or.jp/horse/result/?keyword="+nodes)
        //let result = window.confirm('Wikipediaの馬名リンクに飛びますか？');
        //if( result ) {
        //  window.open(node_url, '_blank');
        //}
        //else {
        //    
        //}
        
        
      },
      doubleClick: ({nodes, pointer: { canvas } }) => {
        //alert(canvas.x)
        //createNode(canvas.x, canvas.y);
        console.log(network)
        //setNetwork(network)
        clusterByCmoduclass(nodes[0],canvas.x,canvas.y)
      },
      afterDrawing:({})=>{
        //alert("描画しました")
      }
    }
  }

  const { graph, events } = state;

  return (
    <>
    <div>
<Button
  onClick={() => {
    clusterall();
  }}
>
  クラスタでまとめあげ
</Button>
    <TextField id="outlined-basic" label="馬名入力"
    placeholder="フジキセキ"
    //onChange={(event) => setInputhorse(event.target.value)} 
    onChange={(event)=>movetosearchhorse(event.target.value)}
    />

    <Graph 
      graph={graph}
      options={options} 
      events={events} 
      style={{ height: "800px" }}
    
      getNetwork={network => {
        setNetwork(network)
        
      }}
       
      />
    </div>
    </>
  );

}

export default App