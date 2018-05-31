<template>
<div class="mapContent">
  <div id="map" class="map">
  </div>
</div>
</template>
<script>
/* import { mapGetters } from "vuex";
import MarkerClusterer from "marker-precluster";
import viewMarker from "@/handler/viewMarker"; */

export default {
  props: {
    map: ""
  },
  mounted() {
    //this.markers = this.map;
    //console.log(this.map)
    //this.createMarker();
  },
  data() {
    return {
      markers: [],
      popBoxData: [],
      childMsg: {},
      isPopBox: false,
      latLngArr: [],
      ggMarkers: "",
      zoom: 14,
      viewName: []
    };
  },
  watch: {
    map(a, b) {
      //console.log("watch-------map", a, b);
      this.markers = this.map;
      //console.log(this.markers)
      this.createMarker();
    }
  },
  methods: {
    createMap(params) {
        if (params) this.designZoom(params);
        let center = params
            ? { lat: Number(params.centerLat), lng: Number(params.centerLng) }
            : { lat: 39.9, lng: 116.38 };
        //console.log(center, this.zoom);
        let ggMap = new google.maps.Map(document.getElementById("map"), {
            center: center,
            zoom: params ? this.zoom : 12,
            mapTypeId: "roadmap",
            mapTypeControl: false, //地图左上角的{卫星模式、地形模式}
            streetViewControl: false, //地图右下角的{‘小人’}
            zoomControl: true,
            scaleControl: true,
            rotateControl: false,
            fullscreenControl: true //地图右上角{全屏}
        });
      /* 在地图上画点坐标 */
        let labels=['1','2','3','4','5','6','7','8','9','10','11','12']
        for (let i = 0; i < this.latLngArr.length; i++) {
            var marker = new google.maps.Marker({
            position: this.latLngArr[i],
            map: ggMap,
            label: labels[i]
            });
            /* 添加景点信息 */
            var infowindow = new google.maps.InfoWindow({
                content: '<p>'+this.viewName[i]+'</p>'
            });
            infowindow.open(ggMap,marker) 
        }
        
        /* 画线 */
        var flightPath = new google.maps.Polyline({
            path: this.latLngArr,
            geodesic: true,
            strokeColor: "#1493e3",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });

        flightPath.setMap(ggMap);
    },
    /* 获取到数据后----1，特定数据传递到子组件（生成样式）  2，提取经纬度设置地图的中心点和缩放值 */
    createMarker() {
        //console.log("地图数据--1")
        this.popBoxData.length = 0;
        this.latLngArr.length = 0;
        //console.log("this.latLngArr", this.markers);
        for (let i = 0; i < this.markers.length; i++) {
            /* 过滤弹框里的内容并展示 
            this.popBoxData.push({
            id: this.markers[i].poi.id,
            title: this.markers[i].poi.cnName || this.markers[i].poi.enName
            });*/
            /* 所有经纬度 */
            this.latLngArr.push({
            lat: this.markers[i].latitude,
            lng: this.markers[i].longitude
            });
            this.viewName.push(
            this.markers[i].cnName || this.markers[i].enName
            );
        }
        /* 创建地图--并设置中心坐标 */
        let a = this.designCenter();
        //console.log("aaaaaaa", a);
        this.createMap(a);
    },
    /* 计算经纬度里面最东、南、西、北 的四个值 */
    maxMinVal() {
        let latArr = [],
            lngArr = [];
        for (let i = 0; i < this.latLngArr.length; i++) {
            latArr.push(this.latLngArr[i].lat);
            lngArr.push(this.latLngArr[i].lng);
        }
        return {
            maxLat: Math.max.apply(Math, latArr),
            minLat: Math.min.apply(Math, latArr),
            maxLng: Math.max.apply(Math, lngArr),
            minLng: Math.min.apply(Math, lngArr)
        };
    },
    /* 设计中心点和最大差（经度或纬度） */
    designCenter() {
        let maxMin = this.maxMinVal();
        return {
            centerLat: (Number(maxMin.maxLat) + Number(maxMin.minLat)) / 2,
            centerLng: (Number(maxMin.maxLng) + Number(maxMin.minLng)) / 2,
            maxDiff: Math.max.apply(Math, [
            maxMin.maxLat - maxMin.minLat,
            maxMin.maxLng - maxMin.minLng
            ])
        };
    },
    /* 计算缩放比例 */
    designZoom(params) {
        if (this.markers.length <= 4) {
            this.zoom = 13;
        } else if (this.markers.length > 4) {
            let round = params.maxDiff.toFixed(6) * 1000000;
            let min = 120000,
            medium = 300000,
            max = 600000;
            //console.log("xiaoshu", round);
            if (round < min) {
            this.zoom = 15;
            } else if (medium > round && round > min) {
            this.zoom = 12;
            } else if (max > round && round > medium) {
            this.zoom = 11;
            } else if (round > max) {
            this.zoom = 10;
            }
        }
    }
  }
};
</script>
<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
}
.mapContent {
width: 100%;
    margin-bottom: .6rem;
    height: 8.25rem;
}
.poiList {
  width: 230px;
  position: fixed;
  padding: 10px 20px;
  top: 100px;
  right: 0;
  box-shadow: 0px 1px 16px 1px rgba(25, 25, 25, 0.19);
}
.title {
  color: #666;
  font-size: 18px;
  padding-left: 14px;
  padding-bottom: 10px;
  width: 131px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index {
  width: 18px;
  height: 18px;
  background-color: #fd9600;
  font-size: 14px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  margin-top: 4px;
}
.elRate {
  margin-left: 30px;
}
.addToTrip {
  /*   background-image: url("../images/addToTrip.png");
 */
  background-repeat: no-repeat;
  background-size: 18px 18px;
  width: 18px;
  height: 18px;
}
.right {
  padding: 20px 0 20px 20px;
}
.infoWin {
  background: #fff;
  overflow: hidden;
  padding: 10px 15px;
  border-radius: 5px;
}
.marker {
  width: 28px;
  height: 35px;
  display: inline-block;
  text-align: center;
  line-height: 1;
  padding-top: 5px;
  font-size: 16px;
  color: red;
}
</style>
<style>
.mapBomb {
  animation: mapBombBox 0.7s infinite;
  -moz-animation: mapBombBox 0.7s infinite; /* Firefox */
  -webkit-animation: mapBombBox 0.7s infinite; /* Safari 和 Chrome */
}
@keyframes mapBombBox {
  0% {
    transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(0px, -4px);
    transform: translate(0px, -4px);
    transform: translate(0px, -4px);
  }
  50% {
    transform: translate(0px, -8px);
    transform: translate(0px, -8px);
    transform: translate(0px, -8px);
  }
  75% {
    transform: translate(0px, -4px);
    transform: translate(0px, -4px);
    transform: translate(0px, -4px);
  }
  100% {
    transform: translate(0px, 0px);
    transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
}
@-moz-keyframes mapBombBox {
  0% {
    -moz-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
  }
  25% {
    -moz-transform: translate(0px, -4px);
    -moz-transform: translate(0px, -4px);
    -moz-transform: translate(0px, -4px);
  }
  50% {
    -moz-transform: translate(0px, -8px);
    -moz-transform: translate(0px, -8px);
    -moz-transform: translate(0px, -8px);
  }
  75% {
    -moz-transform: translate(0px, -4px);
    -moz-transform: translate(0px, -4px);
    -moz-transform: translate(0px, -4px);
  }
  100% {
    -moz-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
  }
}
@-webkit-keyframes mapBombBox {
  0% {
    -webkit-transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
  }
  25% {
    -webkit-transform: translate(0px, -4px);
    -webkit-transform: translate(0px, -4px);
    -webkit-transform: translate(0px, -4px);
  }
  50% {
    -webkit-transform: translate(0px, -8px);
    -webkit-transform: translate(0px, -8px);
    -webkit-transform: translate(0px, -8px);
  }
  75% {
    -webkit-transform: translate(0px, -4px);
    -webkit-transform: translate(0px, -4px);
    -webkit-transform: translate(0px, -4px);
  }
  100% {
    -webkit-transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
  }
}
@-ms-keyframes mapBombBox {
  0% {
    -ms-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
  }
  25% {
    -ms-transform: translate(0px, -4px);
    -ms-transform: translate(0px, -4px);
    -ms-transform: translate(0px, -4px);
  }
  50% {
    -ms-transform: translate(0px, -8px);
    -ms-transform: translate(0px, -8px);
    -ms-transform: translate(0px, -8px);
  }
  75% {
    -ms-transform: translate(0px, -4px);
    -ms-transform: translate(0px, -4px);
    -ms-transform: translate(0px, -4px);
  }
  100% {
    -ms-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
  }
}
</style>
