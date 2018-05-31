<template>
  <div id="app">
    <transition>
        <keep-alive>
          <router-view v-if="$route.meta.KeepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition>
        <router-view v-if="!$route.meta.KeepAlive"></router-view> 
      </transition> 
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
