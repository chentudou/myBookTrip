<template>
<transition name="detailPopup">
  <div class="tripView">
    <div class="navBar">
      <nav-bar @pg="sendPgData" :date="dateArr" :pg='page'></nav-bar>
    </div>
      <div  v-touch:left="onSwipeLeft" v-touch:right="onSwipeRight">
        <day-list :current="currentDay" :NoDay="page"></day-list>
      </div>
  </div>
</transition>    
</template>
<script>
import navBar from '@/components/navBar';
import gMap from '@/components/ggMap';
import api from "@/handler/tranfer";
import date  from "@/handler/designSizeDate";
import { TabContainer, TabContainerItem } from 'mint-ui';
import dayList from './widget/dayList';
export default {
  created () {
    this.fetchData();
  },
  data () {
    return {
      newData:{},
      dateArr:[],
      currentDay:{},
      page:0,
      transitionName:'slide-right',
      currentPlay: 'red',  
      percent: 0  
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
    /* page(a,b){
          console.log(a,b);
          let l=this.dateArr.length/2;
          let clientW=window.innerWidth;
          let x= 20 * (clientW / 375);
          let critical=x*3.125;
          console.log('nav',l,x);
          if(a>l){
            this.$nextTick(function(){
              let nav=document.getElementById("inScroll");
              nav.scrollLeft=critical;
          })
          }
          
      } */
  },
  computed: {
    pageMax(){
      return this.dateArr.length-1
    }
  },
  methods: {
    fetchData(){
      let params={
        travelId:this.$route.params.travelId
      }
      api.post('/trip/preview',params).then(resp=>{
        //console.log('res',resp);
        let newItems=resp.items.splice(0, resp.items.length - 1);
       // console.log(newItems);
        let dateWeekArr=date.designSizeDateWeek(resp.items[resp.items.length-1].customTravel.travelTime, newItems.length);
        this.dateArr=date.designSizeDate(resp.items[resp.items.length-1].customTravel.travelTime, newItems.length);
        newItems.map((item,i)=>{
            item.date=dateWeekArr[i];
        })
        this.newData={
            items:  newItems,
            travel: resp.items[0].customTravel,
            fixed:  resp.items[0].customPdf
        };
        this.currentDay=this.newData.items[0];
        //console.log('newData',this.newData,this.currentDay)    
      })
    },
    onSwipeRight(){
      //console.log('111111111111');
      this.page--;
      if(this.page<0) this.page=this.pageMax;
      this.currentDay=this.newData.items[this.page];
    },
    onSwipeLeft(){
      //console.log('2222222222');
      this.$nextTick(function () {  
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      })
      this.currentDay=null;/* 清空数据，防止push后页面数据叠加 */
      this.page++;
      if(this.page>this.pageMax) this.page=0;
      this.currentDay=this.newData.items[this.page];
    },
    sendPgData(i){
      //console.log('i',i);
      this.page=i;
      this.currentDay=this.newData.items[i];
    },
  },
  components: {
    navBar, gMap, dayList
  }
}
</script>
<style scoped>
/*弹出层样式和弹出层动画*/
    .detailPopup{
        width: 100%;
        /*height: 100%;*/
        padding-bottom: 60px;
        background: #fff;
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        transform: translateX(0);
    }
    .detailPopup-enter-active, .detailPopup-leave-active {
        transition: all .5s;
    }
    .detailPopup-enter, .detailPopup-leave-to{
        transform: translateX(100%);
    }
.tripView{
  width: 100%;
    overflow: scroll;
}
.navBar{
  width: 100%;overflow: hidden;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
/* .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8  {
  transform: translateX(10px);
  opacity: 0;
} */
</style>
