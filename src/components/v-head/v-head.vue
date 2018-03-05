<template>
    <div class="header">
        <div class="bg">
            <img  :src="seller.avatar" alt="">
        </div>
        <div class="header1">
            <div class="avatar">
                        <img :src="seller.avatar" alt="">
                </div><div class="text">
                        <div class="text1"><span class="brand"></span>{{seller.name}}</div>
                        <div class="text2">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                        <div v-if="seller.supports">
                                <div class="text3"><span :class="'bg-'+seller.supports[0].type+' t3'"></span>{{seller.supports[0].description}}</div>
                        </div>
                        <div class="text4" v-if="seller.supports" @click="showPost">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></div>
                      </div>
        </div>
        <div class="bulletin" @click="showPost"><span class="bulletin-bg"></span><span class="bulletin-span">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right bulletin-i"></i></div>
        <transition name="post"> 
        <div class="post" v-show="pShow" @click="closePost">
            <div class="post1">
                  <div class="title">{{seller.name}}</div>
                  <v-star :score="seller.score" :size="size" class="star"></v-star>
                  <div class="title">
                      <div class="line"></div>
                      <div class="youhui">
                          优惠信息
                      </div>
                      <div class="line"></div>
                  </div>
                  <div class="center">
                      <ul class="mean">
                          <li v-for="item in seller.supports" :key="item"><span :class="'bga-'+item.type+' t4'"></span>{{item.description}}</li>
                      </ul>
                      
                  </div>
                  <div class="title">
                      <div class="line"></div>
                      <div class="youhui">
                          商家公告
                      </div>
                      <div class="line"></div>
                  </div>
                  <div class="bull">
                      {{seller.bulletin}}
                  </div>
                   <div class="close" @click="closePost">
                <span class="icon-close"></span>
            </div>
            
            </div>
           
        </div>
        </transition>
       </div>
</template>
<script>
import vStar from "../v-star/v-star";
export default {
  data() {
    return {
      size: 24,
      pShow: false
    };
  },
  components: {
    vStar
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showPost() {
      this.pShow = true;
    },
    closePost() {
      this.pShow = false;
    }
  }
};
</script>
<style lang="" scoped>
.header {
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);

  overflow: hidden;
}
.bg {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  filter: blur(10px);
}
.bg img {
  width: 100%;
}
.header1 {
  position: relative;
  padding: 24px 12px 18px 24px;
  line-height: 12px;
}
.avatar,
.text {
  display: inline-block;
}
.avatar {
  margin-right: 16px;
  vertical-align: top;
}
.avatar img {
  width: 64px;
  height: 64px;
}
.text .text1 {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  margin-bottom: 8px;
}
.text .brand {
  display: inline-block;
  width: 30px;
  height: 18px;
  margin-right: 6px;
  background: url(./img/brand@2x.png) no-repeat;
  background-size: contain;
  vertical-align: bottom;
}
.text .text2 {
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 200;
}
.text .text3 {
  font-size: 10px;
  font-weight: 200;
}
.t3 {
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: bottom;
  margin-right: 4px;
}

.text4 {
  position: absolute;
  bottom: 18px;
  right: 12px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-right: 2px;
  font-weight: 200;
}
.icon-keyboard_arrow_right:before {
  content: "\e905";
  vertical-align: middle;
}
/* bulletin */
.bulletin {
  position: relative;
  padding: 0 12px;
  width: 100%;
  box-sizing: border-box;
  height: 28px;
  font-size: 10px;
  line-height: 28px;
  background-color: rgba(7, 17, 27, 0.2);
}
.bulletin-bg {
  display: inline-block;
  width: 22px;
  height: 12px;
  background: url(./img/bulletin@2x.png) no-repeat;
  background-size: contain;
  vertical-align: middle;
  margin-right: 4px;
}
.bulletin-span {
  display: inline-block;
  max-width: 89%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
  margin-right: 4px;
  font-weight: 200;
}
.bulletin-i {
  position: absolute;
  right: 12px;
  top: 7px;
}
/* post */
.post {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  /* filter:blur(5px); */
  background: rgba(7, 17, 27, 0.8);
  overflow: auto;
}
.post1 {
  box-sizing: border-box;
  position: relative;
  min-height: 100%;
  padding: 64px 0;
}
.close {
  position: absolute;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.5);
  bottom: 32px;
  left: 50%;
  margin-left: -16px;
}
.title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: #fff;
}
.star {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.title .youhui {
  margin-left: 12px;
  margin-right: 12px;
  position: relative;
  top: 15px;
  line-height: 30px;
}
.title .line {
  height: 28px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  flex: 1;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 36px;
}
.center {
  margin: 24px 36px 28px;
  padding-left: 12px;
}
.center .mean li {
  font-weight: 100;
  line-height: 12px;
  font-size: 12px;
  display: block;
}
.center .mean li span {
  vertical-align: middle;
}
.center .mean li:not(:last-child) {
  margin-bottom: 12px;
}
.bull {
  margin: 24px 48px 0;
  font-size: 12px;
  font-weight: 100;
  color: rgb(255, 255, 255);
  line-height: 24px;
}
.post-enter-active {
  animation: bounce-in 0.5s;
}
.post-leave-active {
  animation: bounce-out 0.5s;
}
.mean .t4{
    width: 16px;
    height: 16px;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
</style>