<template>
    <div>
        <div id="container"></div>
        <div id="info">当前点击坐标为：<span id="position"></span></div>
        <div id="info">当前地址为：<span id="amapdd"></span></div>
    </div>
</template>
<script>
    import AMap from 'vue-amap'
    export default {

        data() {
            return {
                address: '',
                point: this.lnglat,
                marker: []//用来存储标注
            }
        },
        mounted() {
            this.maploading();
        },
        methods: {
            maploading() {
                var position = document.getElementById("position");
                var amapdd = document.getElementById("amapdd");

                var markersArray = null;

                var center = new TMap.LatLng(23.135476, 113.374393);//设置中心点坐标  

                //初始化地图
                var map = new TMap.Map("container", {
                    center: center
                });




                // //绑定点击事件
                map.on("click", function (evt) {

                    // 创建信息窗
                    let info = new TMap.InfoWindow({
                        map,
                        position: map.getCenter()
                    }).close();
                    map.on('click', (evt) => {
                        // 获取click事件返回的poi信息
                        let poi = evt.poi;
                        if (poi) {
                            // 拾取到POI
                            info.setContent(poi.name).setPosition(poi.latLng).open();
                            amapdd.innerHTML = poi.name;//地址显示
                        } else {
                            // 没有拾取到POI
                            info.close();
                        }
                    });
                    var lat = evt.latLng.getLat().toFixed(6);
                    var lng = evt.latLng.getLng().toFixed(6);
                    position.innerHTML = lat + "," + lng;//坐标显示
                    

                    // if (this.marker != undefined) {
                    //     if (this.marker.geometries.length >= 1) {
                    //         console.log("清除标注", this.marker.geometries.length);
                    //         this.marker.setMap(null);
                    //         this.marker = null;
                    //     }
                    // }


                    // this.marker = new TMap.MultiMarker({
                    //     id: 'marker-layer',
                    //     map: map,
                    //     geometries: [{
                    //         "id": 'demo',
                    //         "styleId": 'marker',
                    //         "position": new TMap.LatLng(evt.latLng.lat, evt.latLng.lng),
                    //         "properties": {
                    //             "title": "marker"
                    //         }
                    //     }]
                    // });




                })
            }
        }
    }
</script>

<style type="text/css">
    html,
    body {
        height: 100%;
        margin: 0px;
        padding: 0px;
    }

    #container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    input {
        position: absolute;
        top: 30px;
        z-index: 9999;
    }

    #btn-2d {
        left: 20px;
    }

    #btn-3d {
        left: 80px;
    }
</style>