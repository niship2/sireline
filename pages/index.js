//import Graph from "react-graph-vis";
//import GraphVis from 'react-graph-vis'
import dynamic from "next/dynamic";
import React, {useState,useContext,useCallback, useEffect,useRef} from "react";
import GetRaceHorse from "../components/getRacehorse";
import { Button,Box,TextField,Checkbox,FormGroup,FormControlLabel  } from "@material-ui/core"
import graphd2 from "../public/sireline.json"


// 追加
const Graph = dynamic(() => import('react-graph-vis'), {
  ssr: false,
})


const App = () => {

  const [network,setNetwork] = useState(null)
  const [physicschecked,setphysicschecked] = useState(false)
  const [ graphd, setGraphd ] = useState(graphd2[0]);
  
  
  const handleChange = (event) => { 
    setphysicschecked(event.target.checked)
    options.physics["enabled"] = event.target.checked
    network.physics["enabled"] = event.target.checked
    
    setOptions(options)
    network.setOptions(options)
    setNetwork(network)
    
  }; 

  useEffect(()=>{
    //movetosearchhorse("サンデーサイレンス")

  },[])

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
  },)
  

  function movetosearchhorse(search){
    //console.log("moveto")
    //console.log(network)
    try{
    network.moveTo({
      position: network.getPosition(search), 
      scale: 2.0,
      })
    const connectednodes = network.getConnectedNodes(inputhorse)
    alert(connectednodes)
    }catch{}
  }
   
  
  const [options,setOptions]=useState({
    nodes:{
      shape:"box"
      ,font:{size:5}
      ,group:"Modularity Class"
    },
    edges: {
      smooth: {
        type: "curvedCW"
      }
    },      
    layout: {
      hierarchical: false,
      improvedLayout:false,
    },
    physics:{enabled: physicschecked}
  });

  
  
  function clusterByCmoduclass(searchid) {
    //console.log("cluste")
    //console.log(network)
    const selectednode = graphd.graph.nodes.filter(val=> val.id == searchid)
    const modu_num = selectednode[0].attributes['Modularity Class']
    const x = selectednode[0].x
    const y = selectednode[0].y
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
    //console.log(network)
    setNetwork(network)
  }

  function clustering(){
    clusterByCmoduclass("フジキセキ")    
    clusterByCmoduclass("アイルハヴアナザー")
    clusterByCmoduclass("アグネスタキオン")
    clusterByCmoduclass("アグネスデジタル")

  }


  


//  const [state, setState] = useState({
  const state={
    graph:graphd.graph,
    events: {
      select: ({ nodes, edges,pointer: { canvas } }) => {
        
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
        clusterByCmoduclass(nodes[0])
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
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={physicschecked} onChange={handleChange} size="small"  />} label="動かす" />
    </FormGroup>
<Button
  onClick={() => {
    clustering();
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