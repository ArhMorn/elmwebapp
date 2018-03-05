<template>
  <div id="app">
    <v-head :seller="seller"></v-head>
    <nav class="nav margin-b">
      <router-link class="nav-item" :to="{path:'/goods'}">商品</router-link>
      <router-link class="nav-item" :to="{path:'/ratings'}">评价</router-link>
      <router-link class="nav-item" :to="{path:'/seller'}">商家</router-link>
  </nav>
  <keep-alive>
      <router-view  :seller="seller"></router-view>
  </keep-alive>
  
  </div>
</template>

<script>
import vHead from './components/v-head/v-head'
import {urlParse} from './common/js/util'
export default {
  data(){
    return {
      seller:{
        id:(()=>{
          let urlP=urlParse()
          return urlP.id
        })()
      }
    }
  },
    components:{
      vHead
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then(
        (res)=>{
          // this.seller=res.data.data
           this.seller = Object.assign({}, this.seller, res.data.data)
        })
        // this.$http.get('/api/goods').then(
        // (res)=>{
        //   this.goods=res.data.data
        // })
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.nav{
  position: relative;
  display:flex;
  flex-direction: row;
  height:40px;
  line-height: 40px;
}
.nav .nav-item{
  flex:1;
  text-align: center;
  font-size: 14px;
  color:rgb(77,85,93)
}
.nav .router-link-active{
  color:rgb(240,20,20)
}
.nav.margin-b::after{
  content:"";
  display:block;
  width:100%;
  height:1px;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color:rgba(7,17,27,0.1);
}
.goods{
  position: absolute;
  width: 100%;
  top: 175px;
  bottom: 48px;
}
</style>
