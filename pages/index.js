//import Graph from "react-graph-vis";
//import GraphVis from 'react-graph-vis'
import dynamic from "next/dynamic";
import React, {useState,useContext} from "react";
import getRaceHorse from "../components/getRacehorse";
import { Box,TextField,Checkbox,FormGroup,FormControlLabel  } from "@material-ui/core"

// 追加
const Graph = dynamic(() => import('react-graph-vis'), {
  ssr: false,
  
})








const App = () => {



  const [network,Setnetwork] = useState(null)
 

  const [inputhorse,setInputhorse] = useState('フジキセキ');
  function movetosearchhorse(search){
    try{
    network.moveTo({
      position: network.getPosition(search), //{x: 1000, y: 0},
      scale: 2.0,
      })

    const connectednodes = network.getConnectedNodes(inputhorse)
    //alert(connectednodes)
    }catch{

    }
    

  }
  
  if (network === null){}else{
    movetosearchhorse(inputhorse)
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

  //setGraphd(data.graph) 


  var {graphd,isLoading,isError} = getRaceHorse();
  
  //setGraphd(graphd.graph) 

  //最初の時だけgraphdが失敗するので入れておく。
  if (typeof graphd === 'undefined'){
    graphd = {
      graph:{
        nodes: [
          {id:"アイルビーバウンド",label:"アイルビーバウンド",x:10,y:10},
          {id:"ドラセナ",label:"ドラセナ",x:300,y:300},
        ],  
        edges: [
          {from: "アイルビーバウンド",to:"ドラセナ"}
        ]    
      }
    }
  
  }else{
    //var container = document.getElementById('mynetwork');
    //var network = new vis.Network(container, graphd.graph,options);
    

  }

  
  const [state, setState] = useState({
    counter: 10,
    events: {
      select: ({ nodes, edges,pointer: { canvas } }) => {
        
        const node_url = "https://ja.wikipedia.org/wiki/"+nodes
        //const node_url = encodeURI("https://www.jbis.or.jp/horse/result/?keyword="+nodes)
        let result = window.confirm('Wikipediaの馬名リンクに飛びますか？');
        if( result ) {
          window.open(node_url, '_blank');
        }
        else {
            
        }
        
        //console.log(nodes);
        //console.log("Selected edges:");
        //console.log(edges);
        //alert(nodes);
        //alert(nodes.Id)
        //alert(canvas.x)
        
        
      },
      doubleClick: ({ pointer: { canvas } }) => {
        //alert(canvas.x)
        //createNode(canvas.x, canvas.y);
      },
      afterDrawing:({})=>{
        //alert("描画しました")
      }
    }
  })

  const { events } = state;

  return (
    <>
    <div>
    <TextField id="outlined-basic" label="馬名入力"
    placeholder="フジキセキ"
    onChange={(event) => setInputhorse(event.target.value)} />
    <Graph 
      graph={graphd.graph}
      options={options} 
      events={events} 
      style={{ height: "800px" }}
    
      getNetwork={network => {
        Setnetwork(network)
        
        //console.log(network.getViewPosition())
        //options.physics.enabled = falase
        //SetOptions(options)
        
      }} 
      />
    </div>
    </>
  );

}

export default App