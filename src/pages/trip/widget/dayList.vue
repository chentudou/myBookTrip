<template>
    <div class="current">
        <div class="cityDateMap">
            <g-map :map='page.poiList'></g-map>
            <div class="cityDate">
                <!-- <span class="NoDay" v-if="!NoDay" >DAY1</span> -->
                <span class="NoDay"  >DAY{{NoDay+1}}</span>
                <span class="travelName">{{page.activity.traveldayName}}</span>
                <p class="date">{{page.date}}</p>
            </div>
        </div>
        <div class="tripInfo">
            <!-- <div class="diary" v-if="page.activity.travelDescription"> -->
                <router-link :to="{name:'diray',params:{dayId:page.activity.id}}" tag="div" class="diary" v-if="page.activity.travelDescription">
                    <p class="diaryTitle">今日笔记</p>
                    <p class="diaryInner">{{page.activity.travelDescription}}</p>
                    <i class="flightIcon"></i>
                </router-link>
            <!-- </div> -->
            <ul class="flight" v-if="page.flightList.length">
                <li class="flightItem clearfix" v-for="(item,idx) in page.flightList" :key="idx">
                    <div class="fromCity fl">
                        <p class="fromTime">{{item.arrivalTime}}</p>
                        <p class="fromAirport">{{item.departureAirport}}</p>
                    </div>
                    <div class="flightType fl">{{item.shift}}</div>
                    <div class="addressCity fl">
                        <p class="addressTime">{{item.departureTime}}</p>
                        <p class="addressAirport">{{item.endStation}}</p>
                    </div>
                    <i class="flightIcon"></i>
                </li>
            </ul>
            <ul>
                <router-link class="poiItem" v-for="(item,idx) in page.poiList" :key="idx"
                         :to="{name:'detail',params:{poiId:item.id}}" tag="li"
                   >
                    <div class="poiInfo">
                        <div class="clearfix">
                            <img class="poiImg fl" :src="item.url" alt="">
                            <div class="viewName fl">
                                <p class="cnName">{{item.cnName}}</p>
                                <p class="enName">{{item.enName}}</p>
                            </div>
                        </div>
                        <span class="distance">{{latLngDistance[idx]}}</span>
                        <i class="viewIcon"></i>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import gMap from "@/components/ggMap";
export default {
    props: {
        current: Object,
        NoDay:Number
    },
    data() {
        return {
        mapData: [],
        page:{
            activity:{},
            date:"",
            poiList:[],
            flightList:[]
        },
        latLngArr:[],
        latLngDistance:[]
        };
    },
    watch: {
        NoDay(a,b){
            //console.log(a)
            if(a) a=1;
        },  
        current(a, b) {
             //console.log(a, b);
            this.page={
                activity:{},
                date:"",
                poiList:[],
                flightList:[]
            };
            this.latLngArr.length=0;
            this.latLngDistance.length=0;
            a.eventVoList.map((team,idx)=>{
                if(team.poi){
                    this.page.poiList.push(team.poi);
                }else if(team.flight){
                    this.page.flightList.push( team.flight );
                }
            })
            this.page.activity=a.day;
            this.page.date=a.date;
            //console.log('当前页的所有数据',this.page)
        },
        'page.poiList'(){
            //console.log('1111111111')
            this.page.poiList.map(item=>{
            this.latLngArr.push({
                lat:item.latitude,
                lng:item.longitude
                })
            })
            this.designDistance();
        }
    },
    mounted() {
        
    },
    methods: {
        /* 计算两个经纬度之间距离 */
        designDistance(){
            if(this.latLngArr.length){
                for(let i=0;i<this.latLngArr.length;i++){
                    if(this.latLngArr[i+1]){
                        this.latLngDistance[i]=this.latLngToKm(this.latLngArr[i],this.latLngArr[i+1]);
                    }else{
                        break;
                    }
                }
            }else{
                return
            }
        },
        /* 经纬度换算距离 */
        latLngToKm(obj_1,obj_2){
            var f = this.getRad((obj_1.lat + obj_2.lat)/2);
            var g = this.getRad((obj_1.lat - obj_2.lat)/2);
            var l = this.getRad((obj_1.lng - obj_2.lng)/2);
                    
            var sg = Math.sin(g);
            var sl = Math.sin(l);
            var sf = Math.sin(f);
                    
            var s,c,w,r,d,h1,h2;
            var a = 6378.1370;
            var fl = 1/298.257;
                    
            sg = sg*sg;
            sl = sl*sl;
            sf = sf*sf;
                    
            s = sg*(1-sl) + (1-sf)*sl;
            c = (1-sg)*(1-sl) + sf*sl;
                    
            w = Math.atan(Math.sqrt(s/c));
            r = Math.sqrt(s*c)/w;
            d = 2*w*a;
            h1 = (3*r -1)/2/c;
            h2 = (3*r +1)/2/s;
            let v=d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
            let km=v ? `${v.toFixed(3)} km` :'暂无数据';
            return km;
        },
        getRad(d) {
            return d * Math.PI / 180.0;
        }        
    },
  components: {
    gMap
  }
};
</script>
<style scoped>

.cityDateMap {
  width: 94.67%;
  margin: 0 auto .75rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;    height: 11.25rem;
  box-shadow: 0px 0px 6px rgba(89, 53, 0, 0.29);
}
.cityDate{
    font-size:.7rem;
font-family:PingFang-SC-Regular;
color:rgba(61,36,0,1);padding-left: .75rem;
}
.NoDay{
margin-top: .75rem;
font-family:PingFang-SC-Bold;
color:rgba(51,51,51,1);
}
.date{
    font-size:.5rem;padding-top: .4rem
}
.tripInfo{
    margin: 0 3% 0 4%;
    padding-left: 7.5%;
    border-left: 1px solid #D9D9D9;
}
/* 当日笔记样式 */
.diary{
    border:1px solid rgba(242,242,242,1);position: relative;
border-radius: 8px ;    margin-bottom: .75rem;
box-shadow:0px 6px 3px rgba(89,53,0,0.06) ;    height: 3.5rem;
}
.diaryTitle{
    color:#3D2400;font-size: .7rem;background: #f9f9f9;padding: .3rem .55rem;
}
.diaryInner{
    font-size:.5rem;color:rgba(153,153,153,1);padding: .35rem .5rem;overflow: hidden;height: 2.1rem;line-height: .84rem;
        display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    width: 100%;
}
/* 航班样式 */
.flightItem{
    padding: .5rem .5rem .7rem;    margin-bottom: .75rem;
    border-radius: 8px ;border: 1px solid rgba(227,227,227,1);
    box-shadow:0px 6px 3px rgba(89,53,0,0.06);    position: relative;
    font-family:PingFang-SC-Regular;text-align: center;
    
}
.flightIcon{
    background: url('./images/view.png') no-repeat;position: absolute;
    position: absolute;
    display: block;
    width: 1rem;
    height: 1rem;
    left: -1.720rem;
    top: -5%;
    background-size: .5rem;
}
.fromTime,.addressTime{
    font-size:.8rem;padding-bottom: .5rem;
color:rgba(61,36,0,1);
}
.flightType{
    font-size:.4rem;margin: .7rem 1.7rem 0;
color:rgba(153,153,153,1);width: 2.1rem;
    text-align: center;
    background: url('./images/flight.png') no-repeat;
    background-size: 100% 20%;
    padding-bottom: .75rem;
    background-position: 0 60%;
}
.addressAirport,.fromAirport{
    font-size:.5rem;
color:rgba(153,153,153,1);
}
/* poi信息 */
.poiItem{
        margin-bottom:2rem;background: url('./images/view.png') no-repeat;
        position: relative;
}
.viewIcon{
    background: url('./images/view.png') no-repeat;position: absolute;
    position: absolute;
    display: block;
    width: 1rem;
    height: 1rem;
    left: -1.685rem;
    top: -5%;
    background-size: .5rem;
}
.poiImg{
    width: 2rem;height: 2.1rem;margin-right: 1rem;
}
.cnName{
    color:#FE9601;font-size: .7rem;padding-bottom: .65rem;
}
.enName{
    color:#999;font-size: .5rem;

}
.distance{
 color: #999;font-size: .45rem;position: absolute;margin-top: 0.5rem;
 background: url('./images/distance.png');background-size: .4rem;
    background-position: 0% 45%;    background-repeat: no-repeat;
    left: -1.65rem;
    padding-left: 1rem;
}
</style>
