<template>
  <div class="diray">
      <p class="title">
          {{page.title}}
      </p>
      <p class="description">{{page.travelDescription}}</p>
  </div>
</template>
<script>
import api from "@/handler/tranfer";

export default {
    data () {
        return {
            page:{}
        }
    },
    created () {
            this.fetchData()
        },
    methods: {  
        fetchData(){
        let params={
            dayId:this.$route.params.dayId  
        }
        api.get('/trip/diray',params).then(resp=>{
            console.log('res',resp);
            this.page=resp.item;
        })
        },
    }
}
</script>
<style scoped>
.title{
    margin: .8rem 1.2rem 1rem;font-size: #333;border-bottom:1px solid #DEDEDE; padding-bottom: .6rem;
}
.description{
    margin: 0 1.2rem 0;color:#333;font-size: .7rem;line-height: 1.2rem;
}
</style>
