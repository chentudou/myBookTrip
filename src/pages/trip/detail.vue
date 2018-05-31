<template>
    <div class="detailPopup">
        <div class="detailImg">
            <img :src="pageData.url" alt="">
            <div class="detailTitle">
                <p class="cnName">{{ pageData.cnName || pageData.enName }}</p>
                <p class="clearfix">
                    <span class="ranking fl">{{pageData.ranking}}</span>
                    <span class="ranking fr">{{pageData.score*10}}%好评率</span>
                </p>
            </div>
            <div class="dataContent" :style="'-webkit-line-clamp: ' + (this.expandContent ? '999' : '4') + ';height: ' + (this.expandContent ? 'auto' : '80px') + ';'">
                <p>简介</p>
                <span>{{ pageData.content }}</span>
            </div>
                <div class="expandContent">
                    <span @click="expandContent = !expandContent">{{ expandContent ? '收起更多介绍' : '展开更多介绍' }}</span>
                </div>
            </div>
            <div class="baseInfo">
                <p>基本信息</p>
                <ul class="baseData">
                    <li class="item clearfix" v-if="pageData.playTime">
                        <div class="fl itemKey">建议游玩：</div>
                        <div class="fl itemValue">{{ pageData.playTime }}</div>
                    </li>
                    <li class="item clearfix" v-if="pageData.openTime">
                        <div class="fl itemKey">营业时间：</div>
                        <div class="fl itemValue">{{ pageData.openTime }}</div>
                    </li>
                    <li class="item clearfix" v-if="pageData.ticketDescription">
                        <div class="fl itemKey">门票：</div>
                        <div class="fl itemValue">{{ pageData.ticketDescription }}</div>
                    </li>
                    <li class="item clearfix" v-if="false">
                        <div class="fl itemKey">地铁：</div>
                        <div class="fl itemValue"></div>
                    </li>
                    <li class="item clearfix" v-if="false">
                        <div class="fl itemKey">路线：</div>
                        <div class="fl itemValue"></div>
                    </li>
                    <li class="item clearfix" v-if="pageData.tel">
                        <div class="fl itemKey">电话：</div>
                        <div class="fl itemValue">{{ pageData.tel }}</div>
                    </li>
                    <li class="item clearfix" v-if="pageData.website">
                        <div class="fl itemKey">网址：</div>
                        <div class="fl itemValue">{{ pageData.website }}</div>
                    </li>
                    <li class="item clearfix" v-if="pageData.tips">
                        <div class="fl itemKey">小贴士：</div>
                        <div class="fl itemValue">{{ pageData.tips }}</div>
                    </li>
                </ul>
            </div>
            
        </div>
</template>
<script>
import api from "@/handler/tranfer";

    export default {
        data () {
            return {
                msg: 'poi数据详情的弹出层',
                expandContent: false,
                pageData:{}
            }
        },
        created () {
            this.fetchData();
        },
        methods: {  
            fetchData(){
            let params={
                poiId:this.$route.params.poiId
            }
            api.get('/trip/detail',params).then(resp=>{
                console.log('res',resp);
                this.pageData=resp.item;
                
            })
            },
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
    /* .detailPopup-enter-active, .detailPopup-leave-active {
        transition: all .5s;
    }
    .detailPopup-enter, .detailPopup-leave-to{
        transform: translateX(100%);
    } */
    /*详情样式*/
    .detailTitle{
        margin-left: .5rem;
        min-height: 50px;padding-bottom: .5rem;
    margin-right: .5rem;margin-bottom: 1.2rem;
        border-bottom: 1px solid #e5e5e5;
    }
    .cnName{
        color: #333;padding-bottom: .65rem;
        font-size: 1rem;
    }
    .ranking{
        color: #FD9600;font-size: .7rem;
    }
       .detailImg img{
            width: 100%;
            height: 9.7rem;
            margin-bottom: .8rem;
        }
    
    .dataContent{
        font-size: .7rem;margin: 0 .5rem;
        line-height: 1.05rem;
        min-height: 80px;
        color: #666;
        overflow:hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
    }
    .dataContent p{
        font-size: .75rem;color: #333333;font-weight: bold;margin-bottom: .35rem;
    }
    .expandContent{
            text-align: center;
    font-size: .7rem;
    color: #FD9600;
    padding-top: 1.2rem;
        padding-bottom: 1rem;
    border-bottom: 1px solid #DEDEDE;
    margin: 0 .5rem;
    }
    .baseInfo{
        margin: 0 .5rem;
    }
    .baseInfo p{
        font-size: .75rem;color:#333;padding-top: 1.2rem;font-weight: bold; padding-bottom: .8rem;
    }
        .baseData .item{
            padding-bottom: .7rem;font-size: .7rem;
        }    
           .baseData .item .itemKey{
                width: 20%;color:#333;
            }
            .baseData .item .itemValue{
                width: 80%;color:#666;
            }
        
        .baseData .item:last-child{
            border-bottom: none;
        }
    
    .addTrip{
        width: 100%;
        line-height: 60px;
        text-align: center;
        background: #FD9600;
        color: #fff;
        font-size: 16px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>