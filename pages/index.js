//import Graph from "react-graph-vis";
//import GraphVis from 'react-graph-vis'
import dynamic from "next/dynamic";
import React, {useState,useContext, useEffect} from "react";
import GetRaceHorse from "../components/getRacehorse";
import { Button,Box,TextField,Checkbox,FormGroup,FormControlLabel  } from "@material-ui/core"
import { useAmp } from "next/amp";
import graphd2 from "../public/sireline.json"

// 追加
const Graph = dynamic(() => import('react-graph-vis'), {
  ssr: false,
  
})




const App = () => {



  const [network,setNetwork] = useState()
 

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

  const [ graphd, setGraphd ] = useState(graphd2[0]);
  //let {graphd,isLoading,isError} = GetRaceHorse();
 
  //最初の時だけgraphdが失敗するので入れておく。
  //if (typeof graphd === 'undefined'){
  //  graphd = {
  //    graph:{
  //      nodes: [],  
  //      edges: [] 
  //    }
  //  }
  //
  //}else{}

  
  function clusterByCmoduclass(searchid) {
    //console.log(graphd.graph.nodes[0].attributes["Modularity Class"])
    console.log(graphd)
    network.setData(graphd.graph);

    console.log(graphd.graph.nodes)

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
        id: "cidCluster",
        borderWidth: 3,
        shape: "database",
      },
    };
    network.cluster(clusterOptionsByData);
    Setnetwork(network)
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
        
        
      },
      doubleClick: ({nodes, pointer: { canvas } }) => {
        //alert(canvas.x)
        //createNode(canvas.x, canvas.y);
        clusterByCmoduclass(nodes.Id)
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
    <Button
  onClick={() => {
    clusterByCmoduclass("サンデーサイレンス");
  }}
>
  Click me
</Button>
    <TextField id="outlined-basic" label="馬名入力"
    placeholder="フジキセキ"
    onChange={(event) => setInputhorse(event.target.value)} />

    <Graph 
      graph={graphd.graph}
      options={options} 
      events={events} 
      style={{ height: "800px" }}
    
      getNetwork={network => {
        setNetwork(network)

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