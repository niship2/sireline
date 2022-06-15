//import Graph from "react-graph-vis";
import dynamic from "next/dynamic";
import React, {useState,useEffect} from "react";
import getRaceHorse from "../components/getRacehorse";

// 追加
const Graph = dynamic(() => import('react-graph-vis'), {
  ssr: false,
})


const App = () => {
  
  const [options,SetOptions]=useState({
    nodes:{shape:"box",font:"5px"},
    layout: {hierarchical: false,
      improvedLayout:false,},
    edges: { color: "#000000"},
    physics:{enabled: true}
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
    
  }


  const {events,setEvents} = useState({
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        alert(canvas.x)
        //createNode(canvas.x, canvas.y);
      }
    }
   
  })

//  const [state, setState] = useState({
//    counter: 10,
//    graph:data.graph,//graphd, //data.graph,
//    events: {
//      select: ({ nodes, edges }) => {
//        console.log("Selected nodes:");
//        console.log(nodes);
//        console.log("Selected edges:");
//        console.log(edges);
//        alert("Selected node: " + nodes);
//      },
//      doubleClick: ({ pointer: { canvas } }) => {
//        alert(canvas.x)
//        //createNode(canvas.x, canvas.y);
//      }
//    }
//  })

//  const { graph, events } = state;


  return (
    <>
    <div>
    
    <Graph graph={graphd.graph} options={options} events={events} style={{ height: "800px" }} />
    </div>
    </>
  );

}

export default App