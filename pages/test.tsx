useEffect(()=>{
    try{
      let clusterIndex = 0;
      let clusters = [];
      let lastClusterZoomLevel = 0;
      let clusterFactor = 0.9;
      // set the first initial zoom level
      network.once("initRedraw", function () {
        if (lastClusterZoomLevel === 0) {
          lastClusterZoomLevel = network.getScale();
        }
      });

      // we use the zoom event for our clustering
      network.on("zoom", function (params) {
        if (params.direction == "-") {
          if (params.scale < lastClusterZoomLevel * clusterFactor) {
            makeClusters(params.scale);
            lastClusterZoomLevel = params.scale;
          }
        } else {
          openClusters(params.scale);
        }
      });

      // if we click on a node, we want to open it up!
      network.on("selectNode", function (params) {
        if (params.nodes.length == 1) {
          if (network.isCluster(params.nodes[0]) == true) {
            network.openCluster(params.nodes[0]);
          }
        }
      });

      // make the clusters
      function makeClusters(scale) {
        var clusterOptionsByData = {
          processProperties: function (clusterOptions, childNodes) {
            clusterIndex = clusterIndex + 1;
            var childrenCount = 0;
            for (var i = 0; i < childNodes.length; i++) {
              childrenCount += childNodes[i].childrenCount || 1;
            }
            clusterOptions.childrenCount = childrenCount;
            clusterOptions.label = "# " + childrenCount + "";
            clusterOptions.font = { size: childrenCount *0.01 + 30 };
            clusterOptions.id = "cluster:" + clusterIndex;
            clusters.push({ id: "cluster:" + clusterIndex, scale: scale });
            return clusterOptions;
          },
          clusterNodeProperties: {
            borderWidth: 3,
            shape: "database",
            font: { size: 30 },
          },
        };
        network.clusterOutliers(clusterOptionsByData);
        if (false){
          //if(document.getElementById("stabilizeCheckbox").checked === true) {
          // since we use the scale as a unique identifier, we do NOT want to fit after the stabilization
          network.setOptions({ physics: { stabilization: { fit: false } } });
          network.stabilize();
        }
      }

      // open them back up!
      function openClusters(scale) {
        var newClusters = [];
        var declustered = false;
        for (var i = 0; i < clusters.length; i++) {
          if (clusters[i].scale < scale) {
            network.openCluster(clusters[i].id);
            lastClusterZoomLevel = scale;
            declustered = true;
          } else {
            newClusters.push(clusters[i]);
          }
        }
        clusters = newClusters;
        if (
          declustered === true //&&
          //document.getElementById("stabilizeCheckbox").checked === true
        ) {
          // since we use the scale as a unique identifier, we do NOT want to fit after the stabilization
          network.setOptions({ physics: { stabilization: { fit: false } } });
          network.stabilize();
        }
      }

    }catch{
      console.log("error")
    }

  })