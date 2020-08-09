/**
 * map fj
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
		 var center = [114.68705,38.29321];//114.68705,38.29321 北京
		 var extent = [105, 38, 120, 53];//117, 30.2, 119, 32.2 左下角 ， 右上角
		 var scaleLineControl = new ol.control.ScaleLine({
			 units: "metric"
		 });
        //总图层
        var map = new ol.Map({
            layers: [raster,titleLayertuce],
            target: 'map',
            view: new ol.View({
                center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
                minZoom:6,
                zoom: 6,
                extent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'),
            })
        });
        
        //起始位置

        map.addControl(scaleLineControl);


        //标记数据集
 			var layer = new ol.layer.Vector({
   	              source: new ol.source.Vector()
   	          });
      function fjgjxx(){
    	  //标记层
	      
    	 layer.getSource().clear();
    	 map.removeLayer(layer);
	 	
        $.ajax({
	         type: "post",
	         cache: false,
	         async: true,
	         url: "getfjgjxx",
	         success: function (data) {

	        	 var gjxx = data.split('*');
	        		 for(var i=0;i<gjxx.length-1;i++){
	        			 //alert(i);
	        			 datasearchcallback(gjxx[i],layer);
	        	 }
	             
	         },
	         error: function (err) {
				alert("Error XMLHttpRequest");
	         }
	     });
        }
        
        function datasearchcallback(json,layer) {
           //alert(layer);
           
	        //var obj  = JSON.parse(json);
	         json = eval("("+json+")");
	         
	         var features = [];
	         //散列点资源
	         var source = new ol.source.Vector();
	         var geometry = new ol.geom.LineString();
	         var color = [0,0,205];
	         var fjbh = "0";
	         var rotation = 0;
	         for (var i in json) {
	             var fea = json[i];
	             if(fea.lng!=undefined){
	            	 geometry.appendCoordinate(ol.proj.transform([parseFloat(fea.lng), parseFloat(fea.lat)], 'EPSG:4326', 'EPSG:3857'));
	            	 features[i] = [parseFloat(fea.lng), parseFloat(fea.lat)];
	             }
	            if(fea.fjbh!=undefined){
	            	fjbh = fea.fjbh;
	            	rotation = fea.rotat;
	            }
	          	if(fea.chxx != undefined){
	          		color = [220,20,60];
	          	}  
			 }
	         
				 //获取样式
            var styleFunction = function(feature) {
                var geometry = feature.getGeometry();
                //线段样式
                var styles = [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: '#0044CC'
                    }), 
                    stroke: new ol.style.Stroke({  
                       // lineDash:[1,3,5],
                        width: 2,  
                        color: color 
                    })  
                })
                ];
                return styles;
            };
		  // alert(features[features.length-1]);
	         var anchor = new ol.Feature({
	        	             geometry: new ol.geom.Point(ol.proj.transform(features[features.length-1], 'EPSG:4326', 'EPSG:3857'))
	        	         }); 
	        	         anchor.setStyle(new ol.style.Style({
	        	         	 image: new ol.style.Icon({
	        	                  anchor: [0.5, 1],
	        	                  crossOrigin: 'anonymous',
	        	                  src: './resources/images/map/airplanes.png',
	        	                  rotation: rotation * Math.PI/180
	        	              })
	        	         }));
	        	         // 添加到之前的创建的layer中去
	        	
	          layer.getSource().addFeature(anchor);
	          
	       	  //layer.getSource().removeFeature(anchor);
	         var feature = new ol.Feature({  
	             geometry:geometry
	         });
	         feature.set("d",fjbh);
	         source.addFeature(feature);
	         
	         //feature.set("anchorid",anchor);
	         //alert(feature.get("anchorid"));
	         //标记点集
	         var vector = new ol.layer.Vector({
	             source: source,
	             style: styleFunction
	         });
	        // vector.getSource().clear();
	         //map.removeLayer(vector);
	         map.addLayer(vector);
	         map.removeLayer(layer);
	         map.addLayer(layer);
	         /*
	        
	         
	         */
	         
	         /*********************显示弹出层**************************/
	        
			    var container = document.getElementById("popup");
		        var content = document.getElementById("popup-content");
		        var popupCloser = document.getElementById("popup-closer");
		        var overlay = new ol.Overlay({
		            element: container,
		            autoPan: true
		        });
		        
		        map.on('pointermove',function(e){
		        	var pixel = map.getEventPixel(e.originalEvent);
		        	var hit = map.hasFeatureAtPixel(pixel);
		        	map.getTargetElement().style.cursor = hit ? 'pointer' : '';
		        });
		        
		        map.on('click',function(e){
		        	 container.style.display = "block";
		        	 var pixel = map.getEventPixel(e.originalEvent);
		             console.log(pixel);
		             map.forEachFeatureAtPixel(pixel,function(feature){
		               
		                 var coodinate = e.coordinate;
		                 
		                 var fgetk = feature.get("d");
		                 //alert(fgetk);  
		                 if(fgetk!=undefined){
		                	 content.innerHTML = fgetk;
		                	  overlay.setPosition(coodinate);
		                	  
				                 map.addOverlay(overlay);
				                 //alert(overlay.getPositioning());
		                 }
		                 //content.innerHTML = "<p>飞机编号：XXX<br>经度："+coordinate10[0]+"<br>纬度："+coordinate10[1]+"<br>起飞时间:2019-07-13 12:00:01 <br>当前时间:2019-07-13 15:20:21</p>";
		                 popupCloser.addEventListener('click',function(){
		    	             overlay.setPosition(undefined);
		    	             popupCloser.blur();
		    	         });
		             });
		        });
	         
        }
        
        var animationId = null;
      //  clearInterval(ts);
      fjgjxx();
      if(animationId !== null){
    	  window.clearInterval(animationId);
      }
        
      //  animationId= window.setInterval(fjgjxx, 4000 * 60);