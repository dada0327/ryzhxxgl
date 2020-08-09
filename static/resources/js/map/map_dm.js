/**
 * map dm
 */
//地图层

		var raster = new ol.layer.Tile({
		    source: new ol.source.XYZ({
		   		 url :"http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b8d98050533e4f5de79b39713b1f6b59"
			})
		});
	      
		var tuce =new ol.source.XYZ({
		    url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=b8d98050533e4f5de79b39713b1f6b59"
		   		 //url :"http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=b8d98050533e4f5de79b39713b1f6b59"
		});
		var titleLayertuce = new ol.layer.Tile({
			 title:"天地图文字标注",
			 source:tuce
		});
		   var center = [111.61,40.81];//114.68705,38.29321 北京
		   var extent = [105, 38, 120, 53];//117, 30.2, 119, 32.2 左下角 ， 右上角
		   var scaleLineControl = new ol.control.ScaleLine({
			   units: "metric",
			   target: 'scalebar',
               className: 'ol-scale-line'
		   });
        //总图层
        var map = new ol.Map({
            layers: [raster,titleLayertuce],
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
                minZoom:6,
                zoom: 6,
                extent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
                
            })
        });
        
        map.addControl(scaleLineControl);
        
      //标记数据集
			var layer = new ol.layer.Vector({
	              source: new ol.source.Vector()
	          });
        //起始位置
      function dmxx(lx,sj){
        $.ajax({
	         type: "post",
	         cache: false,
	         async: true,
	         url: "../dmxxjk!getdmzycs.action?lx="+lx+"&sj="+sj,
	         success: function (data) {
	        	 datasearchcallback(data);
	             
	         },
	         error: function (err) {
				alert("Error XMLHttpRequest");
	         }
	     });
        }
        
      function datasearchcallback(json) {
			 
	         json = eval("("+json+")");
	         var features = [];
	         //散列点资源
	         
	         var source = new ol.source.Vector();
	         for (var i in json) {
	             var fea = json[i];
	             //features[i] = new ol.Feature(new ol.geom.Point(ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857')));
	             var geometrypt = new ol.geom.Point(ol.proj.transform([parseFloat(fea.lng), parseFloat(fea.lat)], 'EPSG:4326', 'EPSG:3857'));
	             var feature = new ol.Feature({geometry: geometrypt, name: fea.name});
	             feature.set("d",fea.name);
	             source.addFeature(feature);
			 }
		
	       //矢量要素数据源
			
				//聚合标注数据源
			//	var clusterSource = new ol.source.Cluster({
				//	distance: 40,    //聚合的距离参数， 即当标注间的距离小于此值时进行聚合
			//		source: source   //聚合的数据源，即矢量要素数据源对象
			//	});
				
				//加载聚合标注的矢量图层
				var styleCache = {};
				var clusters = new ol.layer.Vector({
					source:source,
					style: getStyles
				});
				map.addLayer(clusters);
			
				//clusterSource.getSource().clear();//移除聚合标注数据中的所有要素
				//map.removeLayer(clusters);    //移除标注图层
				
				
				   function getStyles(feature,resolution){
					   
						var getfn = feature.get('name');
						
						var style = styleCache[getfn];
						
						if(!style){
							style = [new ol.style.Style({
								image: new ol.style.Circle({
									radius: 10,
									stroke:new ol.style.Stroke({
										color: '#fff'
									}),
									fill:new ol.style.Fill({
										color:'#3399cc'
									})
								}),
							text: new ol.style.Text({
								font: '15px Calibri,sans-serif',
								text:getfn,
								stroke:new ol.style.Stroke({
									color: '#fff'
								}),
								fill:new ol.style.Fill({
									color:'red'
								})
							})
						})];
						styleCache[getfn] = style;	
					  }
						return style;
				}
				 //获取雨量值
				   function getFeaturesName(feature){
					   var features = feature.get('features');
					   var name = features[0].get("d");
					  return name;
				   }
				 //移除聚合标注
					document.getElementById('queryButton').onclick = function (){
					//	clusterSource.getSource().clear();//移除聚合标注数据中的所有要素
						map.removeLayer(clusters);    //移除标注图层
					};
	     }
    
 $(function(){
  $("#queryButton").click(function(){ //点击搜索按钮
       //alert("搜索");
    var kssj = $("#kssj").val();
    var jssj = $("#zzsj").val();
    var cxlx = $("#cxlx").val();
    var sj = "";
    if(kssj != ""){
    	sj = kssj.substring(0,4)+kssj.substring(5,7)+kssj.substring(8,10);
    	if(jssj == ""){
    		alert("请输入  检索结束时间");
    		$("#zzsj").focus();
    		return false;
    	}else{
    		sj += ";"+jssj.substring(0,4)+jssj.substring(5,7)+jssj.substring(8,10);
    	}
    }
    	
    	if(cxlx == "qxz"){ //选中请选择 
    		alert("请选择  检索类型");
    		$("#cxlx").focus();
    	    return false;	
    	}else{
			dmxx(cxlx,sj);  
		}
    	
    });
  
});
      	//dmxx();