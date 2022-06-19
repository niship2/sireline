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
    
    setOptions(options)
    setNetwork(network)
    setGraphd(graphd)
  }; 

  //useEffect(()=>{
  //  movetosearchhorse("フジキセキ")
  //})

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
      
    layout: {
      hierarchical: false,
      improvedLayout:false,
    },
    edges: { color: "#000000"},
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
    clusterByCmoduclass("アイルハヴアナザー")
    clusterByCmoduclass("アグネスタキオン")
    clusterByCmoduclass("アグネスデジタル")
    clusterByCmoduclass("アグネスフライト")
    clusterByCmoduclass("アサティス")
    clusterByCmoduclass("アジュディケーティング")
    clusterByCmoduclass("アスワン")
    clusterByCmoduclass("アッミラーレ")
    clusterByCmoduclass("アドマイヤコジーン")
    clusterByCmoduclass("アドマイヤジャパン")
    clusterByCmoduclass("アドマイヤベガ")
    clusterByCmoduclass("アドマイヤボス")
    clusterByCmoduclass("アドマイヤマックス")
    clusterByCmoduclass("アドマイヤムーン")
    clusterByCmoduclass("アフリート")
    clusterByCmoduclass("アラジ")
    clusterByCmoduclass("アルカセット")
    clusterByCmoduclass("アルデバラン")
    clusterByCmoduclass("アレミロード")
    clusterByCmoduclass("アンバーシャダイ")
    clusterByCmoduclass("ウイニングチケット")
    clusterByCmoduclass("ウォーエンブレム")
    clusterByCmoduclass("ウォーニング")
    clusterByCmoduclass("ウッドマン")
    clusterByCmoduclass("エアジハード")
    clusterByCmoduclass("エイシンサンディ")
    clusterByCmoduclass("エイシンフラッシュ")
    clusterByCmoduclass("エピファネイア")
    clusterByCmoduclass("エブロス")
    clusterByCmoduclass("エリシオ")
    clusterByCmoduclass("エルコンドルパサー")
    clusterByCmoduclass("エルハーブ")
    clusterByCmoduclass("エンドスウィープ")
    clusterByCmoduclass("エンパイアメーカー")
    clusterByCmoduclass("エーピーインディ")
    clusterByCmoduclass("オジジアン")
    clusterByCmoduclass("オペラハウス")
    clusterByCmoduclass("オルフェーヴル")
    clusterByCmoduclass("オレハマッテルゼ")
    clusterByCmoduclass("オンファイア")
    clusterByCmoduclass("オース")
    clusterByCmoduclass("カコイーシーズ")
    clusterByCmoduclass("カジノドライヴ")
    clusterByCmoduclass("カネヒキリ")
    clusterByCmoduclass("カリスタグローリ")
    clusterByCmoduclass("カリズマティック")
    clusterByCmoduclass("カンパニー")
    clusterByCmoduclass("カーネギー")
    clusterByCmoduclass("カーリアン")
    clusterByCmoduclass("キズナ")
    clusterByCmoduclass("キャプテンスティーヴ")
    clusterByCmoduclass("キングカメハメハ")
    clusterByCmoduclass("キンググローリアス")
    clusterByCmoduclass("キングズベスト")
    clusterByCmoduclass("キングヘイロー")
    clusterByCmoduclass("キングマンボ")
    clusterByCmoduclass("キンシャサノキセキ")
    clusterByCmoduclass("クリエイター")
    clusterByCmoduclass("クリスタルグリッターズ")
    clusterByCmoduclass("クリミナルタイプ")
    clusterByCmoduclass("クロコルージュ")
    clusterByCmoduclass("クロフネ")
    clusterByCmoduclass("グラスワンダー")
    clusterByCmoduclass("グランデラ")
    clusterByCmoduclass("グランプリボス")
    clusterByCmoduclass("グルームダンサー")
    clusterByCmoduclass("ケイムホーム")
    clusterByCmoduclass("ケープブランコ")
    clusterByCmoduclass("コマンダーインチーフ")
    clusterByCmoduclass("コロナドズクエスト")
    clusterByCmoduclass("コンデュイット")
    clusterByCmoduclass("ゴールデンフェザント")
    clusterByCmoduclass("ゴールドアリュール")
    clusterByCmoduclass("ゴールドシップ")
    clusterByCmoduclass("ゴールドヘイロー")
    clusterByCmoduclass("ゴーンウェスト")
    clusterByCmoduclass("サウスヴィグラス")
    clusterByCmoduclass("サクラチトセオー")
    clusterByCmoduclass("サクラバクシンオー")
    clusterByCmoduclass("サクラプレジデント")
    clusterByCmoduclass("サクラユタカオー")
    clusterByCmoduclass("サクラローレル")
    clusterByCmoduclass("サッカーボーイ")
    clusterByCmoduclass("サドラーズウェルズ")
    clusterByCmoduclass("サニーブライアン")
    clusterByCmoduclass("サマーサスピション")
    clusterByCmoduclass("サムライハート")
    clusterByCmoduclass("サンシャインフォーエヴァー")
    clusterByCmoduclass("サンダーガルチ")
    clusterByCmoduclass("サンデーサイレンス")
    clusterByCmoduclass("シアトリカル")
    clusterByCmoduclass("シアトルスルー")
    clusterByCmoduclass("シアトルダンサー２")
    clusterByCmoduclass("シニスターミニスター")
    clusterByCmoduclass("シャンハイ")
    clusterByCmoduclass("シャーディー")
    clusterByCmoduclass("ショウナンカンプ")
    clusterByCmoduclass("シルヴァーチャーム")
    clusterByCmoduclass("シンボリクリスエス")
    clusterByCmoduclass("シンボリルドルフ")
    clusterByCmoduclass("シーキングザゴールド")
    clusterByCmoduclass("ジェイドロバリー")
    clusterByCmoduclass("ジェニュイン")
    clusterByCmoduclass("ジェネラス")
    clusterByCmoduclass("ジャイアンツコーズウェイ")
    clusterByCmoduclass("ジャスタウェイ")
    clusterByCmoduclass("ジャングルポケット")
    clusterByCmoduclass("ジョリーズヘイロー")
    clusterByCmoduclass("スウェプトオーヴァーボード")
    clusterByCmoduclass("スキャターザゴールド")
    clusterByCmoduclass("スキャン")
    clusterByCmoduclass("スクリーンヒーロー")
    clusterByCmoduclass("スクワートルスクワート")
    clusterByCmoduclass("スズカフェニックス")
    clusterByCmoduclass("スズカマンボ")
    clusterByCmoduclass("スタテューオブリバティ")
    clusterByCmoduclass("スターオブコジーン")
    clusterByCmoduclass("スターオヴコジーン")
    clusterByCmoduclass("スターリングローズ")
    clusterByCmoduclass("ステイゴールド")
    clusterByCmoduclass("ストラヴィンスキー")
    clusterByCmoduclass("ストロングリターン")
    clusterByCmoduclass("ストーミングホーム")
    clusterByCmoduclass("ストームキャット")
    clusterByCmoduclass("スペシャルウィーク")
    clusterByCmoduclass("スマートファルコン")
    clusterByCmoduclass("スリルショー")
    clusterByCmoduclass("ゼンノエルシド")
    clusterByCmoduclass("ゼンノロブロイ")
    clusterByCmoduclass("ソウルオブザマター")
    clusterByCmoduclass("ソングオブウインド")
    clusterByCmoduclass("ソヴィエトスター")
    clusterByCmoduclass("タイキシャトル")
    clusterByCmoduclass("タイキブリザード")
    clusterByCmoduclass("タイトスポット")
    clusterByCmoduclass("タイムパラドックス")
    clusterByCmoduclass("タニノギムレット")
    clusterByCmoduclass("タバスコキャット")
    clusterByCmoduclass("タマモクロス")
    clusterByCmoduclass("タヤスツヨシ")
    clusterByCmoduclass("タートルボウル")
    clusterByCmoduclass("ダイナガリバー")
    clusterByCmoduclass("ダイワメジャー")
    clusterByCmoduclass("ダノンシャンティ")
    clusterByCmoduclass("ダンカーク")
    clusterByCmoduclass("ダンシングブレーヴ")
    clusterByCmoduclass("ダンジグ")
    clusterByCmoduclass("ダンスインザダーク")
    clusterByCmoduclass("チチカステナンゴ")
    clusterByCmoduclass("チーフベアハート")
    clusterByCmoduclass("ティッカネン")
    clusterByCmoduclass("ティンバーカントリー")
    clusterByCmoduclass("テイエムオペラオー")
    clusterByCmoduclass("テンビー")
    clusterByCmoduclass("ディアブロ")
    clusterByCmoduclass("ディープインパクト")
    clusterByCmoduclass("ディープスカイ")
    clusterByCmoduclass("ディープブリランテ")
    clusterByCmoduclass("デインヒル")
    clusterByCmoduclass("デザートキング")
    clusterByCmoduclass("デヒア")
    clusterByCmoduclass("デュラブ")
    clusterByCmoduclass("デュランダル")
    clusterByCmoduclass("トゥザグローリー")
    clusterByCmoduclass("トウカイテイオー")
    clusterByCmoduclass("トウショウボーイ")
    clusterByCmoduclass("トニービン")
    clusterByCmoduclass("トワイニング")
    clusterByCmoduclass("トーセンジョーダン")
    clusterByCmoduclass("トーセンホマレボシ")
    clusterByCmoduclass("ドゥラメンテ")
    clusterByCmoduclass("ドクターデヴィアス")
    clusterByCmoduclass("ドリームジャーニー")
    clusterByCmoduclass("ナカヤマフェスタ")
    clusterByCmoduclass("ナリタトップロード")
    clusterByCmoduclass("ナリタブライアン")
    clusterByCmoduclass("ニホンピロウイナー")
    clusterByCmoduclass("ニューイングランド")
    clusterByCmoduclass("ヌレイエフ")
    clusterByCmoduclass("ネオユニヴァース")
    clusterByCmoduclass("ノヴェリスト")
    clusterByCmoduclass("ノーザンテースト")
    clusterByCmoduclass("ハンセル")
    clusterByCmoduclass("ハーツクライ")
    clusterByCmoduclass("ハービンジャー")
    clusterByCmoduclass("バゴ")
    clusterByCmoduclass("バトルプラン")
    clusterByCmoduclass("バブルガムフェロー")
    clusterByCmoduclass("バンブーアトラス")
    clusterByCmoduclass("パイロ")
    clusterByCmoduclass("パラダイスクリーク")
    clusterByCmoduclass("パークリージェント")
    clusterByCmoduclass("ビワハヤヒデ")
    clusterByCmoduclass("ピルサドスキー")
    clusterByCmoduclass("ファスリエフ")
    clusterByCmoduclass("ファルブラヴ")
    clusterByCmoduclass("ファンタスティックライト")
    clusterByCmoduclass("フォーティナイナー")
    clusterByCmoduclass("フォーティーナイナーズサン")
    clusterByCmoduclass("フサイチコンコルド")
    clusterByCmoduclass("フサイチソニック")
    clusterByCmoduclass("フサイチペガサス")
    clusterByCmoduclass("フジキセキ")
    clusterByCmoduclass("フリオーソ")
    clusterByCmoduclass("フレンチデピュティ")
    clusterByCmoduclass("ブライアンズタイム")
    clusterByCmoduclass("ブラックタイアフェアー")
    clusterByCmoduclass("ブラックタイド")
    clusterByCmoduclass("ブラックタキシード")
    clusterByCmoduclass("ブラックホーク")
    clusterByCmoduclass("ブレイヴェストローマン")
    clusterByCmoduclass("プリサイスエンド")
    clusterByCmoduclass("ヘクタープロテクター")
    clusterByCmoduclass("ヘニーヒューズ")
    clusterByCmoduclass("ベルシャザール")
    clusterByCmoduclass("ペンタイア")
    clusterByCmoduclass("ホリスキー")
    clusterByCmoduclass("ホワイトマズル")
    clusterByCmoduclass("ボストンハーバー")
    clusterByCmoduclass("マイニング")
    clusterByCmoduclass("マイネルラヴ")
    clusterByCmoduclass("マジェスティックウォリアー")
    clusterByCmoduclass("マツリダゴッホ")
    clusterByCmoduclass("マヤノトップガン")
    clusterByCmoduclass("マリエンバード")
    clusterByCmoduclass("マルゼンスキー")
    clusterByCmoduclass("マンハッタンカフェ")
    clusterByCmoduclass("マーベラスサンデー")
    clusterByCmoduclass("ミシル")
    clusterByCmoduclass("ミスターシービー")
    clusterByCmoduclass("ミスタープロスペクター")
    clusterByCmoduclass("ミラクルアドマイヤ")
    clusterByCmoduclass("ミルジョージ")
    clusterByCmoduclass("ムーンバラッド")
    clusterByCmoduclass("メイショウオウドウ")
    clusterByCmoduclass("メイショウサムソン")
    clusterByCmoduclass("メイショウドトウ")
    clusterByCmoduclass("メイショウボーラー")
    clusterByCmoduclass("メジロマックイーン")
    clusterByCmoduclass("メジロライアン")
    clusterByCmoduclass("モガミ")
    clusterByCmoduclass("モンテロッソ")
    clusterByCmoduclass("モーリス")
    clusterByCmoduclass("ヤマニンゼファー")
    clusterByCmoduclass("ヨハネスブルグ")
    clusterByCmoduclass("ラストタイクーン")
    clusterByCmoduclass("ラッキーソヴリン")
    clusterByCmoduclass("ラムタラ")
    clusterByCmoduclass("リアルインパクト")
    clusterByCmoduclass("リアルシャダイ")
    clusterByCmoduclass("リズム")
    clusterByCmoduclass("リンカーン")
    clusterByCmoduclass("リンドシェーバー")
    clusterByCmoduclass("リーチザクラウン")
    clusterByCmoduclass("ルーラーシップ")
    clusterByCmoduclass("ルールオブロー")
    clusterByCmoduclass("ロイヤルスキー")
    clusterByCmoduclass("ロイヤルタッチ")
    clusterByCmoduclass("ロックオヴジブラルタル")
    clusterByCmoduclass("ロドリゴデトリアーノ")
    clusterByCmoduclass("ローエングリン")
    clusterByCmoduclass("ロージズインメイ")
    clusterByCmoduclass("ロードカナロア")
    clusterByCmoduclass("ワイルドラッシュ")
    clusterByCmoduclass("ワークフォース")
    clusterByCmoduclass("ヴァーミリアン")
    clusterByCmoduclass("ヴィクトワールピサ")
    clusterByCmoduclass("ベーカバド")

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
    <Checkbox checked={physicschecked} onChange={handleChange} />
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