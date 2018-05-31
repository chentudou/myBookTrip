<template>
<div class="inScroll" id="inScroll">
    <ul class="clearfix navContent" id="navContent" :style="{'width':ulWidth+'rem'}">
        <li v-for="(item,idx) in date" class="fl navItem" :key="idx" >
            <p class="navDate">{{item}}</p>
            <p class="navIdx" @click="$emit('pg',idx)" :class="{active:idx==pg}">{{idx+1}}</p>
        </li>
    </ul>        
</div>
  
</template>
<script>
export default {
  props: {
      date:Array,
      pg:Number,
      
  },
  data () {
      return {
          liWidth:3.125,
          critical:''
      }
  },
  computed: {
      ulWidth(){
         return this.date.length*3.125
      },
  },
  watch: {
      pg(a,b){
          let l=this.date.length/2;
          let clientW=window.innerWidth;
          let x= 20 * (clientW / 375);
          this.critical=x*3.125;
          let nav=document.getElementById("inScroll");
          if(a>l){
              nav.scrollLeft=this.critical*l;
          }else if(a<l){
              nav.scrollLeft=-this.critical;
          }
      }
  }
}
</script>
<style scoped>
.inScroll{
  width: 100%;
    overflow: auto;
}
.navContent{
    width: 100%;
}
.navItem{
    width: 3.125rem;
    margin: .3rem 0 .45rem;text-align: center;
}
.navDate{
    font-size: .45rem;color:#909090;margin-bottom: .15rem;
}
.navIdx{
    font-size: .6rem;color:#3D2400;width: 1.5rem;
    text-align: center;line-height: 1.5rem;
    margin: 0 auto;
    height: 1.5rem;
}
.tripScrollBar .active .navIdx{
   color: #0096D5!important;
}
.navIdx.active{
    border-radius: 50%;color: #fff;
    background: #FE9601;
    
}
</style>
