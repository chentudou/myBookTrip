<template>
  <div class="index" :style="'height:'+winHeight+'px'">
    <div class="tripBook" @click="linkView">
        <img class="coverImg" v-if="info.url" :src="info.url" alt="">
        <img class="coverImg" v-else src="./images/indexFirst.png" alt="">
        <p class="tripName">{{info.tripName}}</p>
        <p class="tripInfo">{{info.goTime}}出发·共{{info.dayNum}}天</p>
        <p class="company">{{info.company}}为您提供</p>
    </div>
    <p class="technology">- 中国旅游服务平台提供技术支持 -</p>
  </div>
</template>
<script>
import formatDate from '@/handler/formatDate';
import api from "@/handler/tranfer";

export default {
  data () {
    return {
      winHeight:
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight),
      info:{}    
    }
  },
  created () {
      this.getTravelId();
  },
  methods: {
    fetchData(params){
      console.log(params)
      api.get('/trip/tripCover',params).then(res=>{
        console.log('11111',res)
        this.info={
          url:res.item.url,
          company:res.item.company,
          tripName:res.item.travelName,
          goTime:formatDate(res.item.travelTime,0),
          dayNum:res.item.codes,
          travelId:res.item.id
        }
      })
    },
    getTravelId(){
      let params={
        travelId:this.$route.query.travelId
      }
      this.fetchData(params);
    },
    linkView(){
      this.$router.push({name:"preview",params:{travelId:this.info.travelId}})
    }
  }
  
}
</script>
<style scoped>
.index{
  text-align: center;font-family:PingFang-SC-Regular;overflow: hidden;
}
.tripBook{
  border-radius: 0 30px 30px 0 ;width:85.33%;margin: 1.2rem auto 1.5rem;
box-shadow:0px 5px 6px rgba(0,0,0,0.33);text-align: center;height: 88%;
}
.coverImg{
  height: 68%;width: 100%;    border-radius: 0 30px 0 0;
}
.tripName{
  font-size:1.2rem;padding-top: 1.7rem;
  font-family:PingFang-SC-Bold;
color:rgba(78,78,78,1);
}
.tripInfo{
font-size:.6rem;padding-top: 1rem;
padding-bottom: 2rem;
color:rgba(153,153,153,1);
}
.company{
font-size:.45rem;padding-bottom: 0.75rem;
color:rgba(180,180,180,1);
}

.technology{
  font-size:.45rem;

color:rgba(153,153,153,1);
}
</style>
