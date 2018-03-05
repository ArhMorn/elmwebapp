<template>
        <div class="food2">
            <div>
                <div class="f_1">
                <div class="f_11">
                   <i class="icon-arrow_lift f_icon" @click="closef"></i>
                   <img :src="food.image" alt="" class="img">
                </div>
                <div class="f_12">
                    <div class="f_name">{{food.name}}</div>
                    <div class="f_sell"><span>月售{{food.sellCount}}份</span>好评{{food.rating}}%</div>
                    <span class="f_price"><span>￥</span>{{food.price}}</span><span v-if="food.oldPrice" class="f_del"><span>￥</span>{{food.oldPrice}}</span> 
                    <transition name="fadef">
                    <div class="cco1" v-show="food.count===0||!food.count" @click="addFood">加入购物车</div>
                    </transition>
                    <cartcontrol :igood="food" v-show="food.count>0"  @increment="incrementTotal($event)"></cartcontrol>
                </div>
                
            </div>
            <split></split>
            <div class="f_2">
                <p class="f_int">商品介绍</p>
                <p class="f_int2">{{food.info}}</p>
            </div>
            <split></split>
            <div class="f_3">
                <div class="f_33">
                    <p class="f_int">商品评价</p>
                    <v-ratingse :ratings="food.ratings" @rhight="rhight($event)" :word="word"></v-ratingse>
                    <div class="f_34"></div>
                </div>
                <div class="f_35" @click="only">
                    <i class="f_i icon-check_circle" :class="{'chose':flag}"></i>
                    只看有内容的评价
                </div>
                <ul class="f_36">
                    <li v-for="item in food.ratings" v-show="(index===2||index===item.rateType)&&(!flag||item.text)">
                      <div class="f_wrap">
                        <div class="f_36_1">
                        <span class="f_36_3">{{item.rateTime | formatDate}}</span>
                        <img :src="item.avatar" alt="" class="f_img">
                        <span class="f_36_5">{{item.username}}</span>
                        </div>
                      <div class="f_36_2">
                        <i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
                        <span class="f_36_6">{{item.text}}</span>
                      </div>
                      </div>
                      
                    </li>
                </ul>
            </div>
            </div>
            
        </div>
    </template>
    <script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import vRatingse from '.././v-ratingSe/v-ratingSe'
    import split from '../split/split'
     import {formatDate} from '../../common/js/date';
      import cartcontrol from "../v-cartcontrol/cartcontrol";

export default {
  components:{
    vRatingse,split,cartcontrol
  },
  data(){
    return{
      flag:false,
      index:2,
      word:["全部",'推荐','吐槽']
    }
  },
  props: {
    food: {
      type: Object,
      default: {}

    }
  },
  methods: {
    _scrollfood() {
      this.foodScroll2 = new BScroll(this.$el, {
        click: true
      })
    },
    closef(){
      this.$emit("closefood")
    },
    only(){
      this.flag=!this.flag
      // if(this.flag===true){

      // }
    },
    rhight(index){
      this.index=index
    },
     incrementTotal(target) {
        this.$emit('incrementt',target);
      },
    addFood(){
      Vue.set(this.food,'count',1)
    }  
    },
  filters:{
    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
        
      }
  }
//   mounted() {
//       this._scrollfood()
//   }
};
</script>
    <style lang="" scoped>
.food2 {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  background-color: #fff;
}
.f_1 {
  width: 100%;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.f_2 {
  padding: 18px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.f_11 {
  position: relative;
  width: 100%;
  padding-top: 100%;
}
.f_icon{
z-index:100;
position: absolute;
left: 0px;
top: 8px;
padding: 10px;
font-size: 18px;
color: #fff;
}
.f_11 .img {
  background-color: aquamarine;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.f_12 {
  background-color: #fff;
  padding: 16px;
  position: relative;
}
.f_12 .f_name {
  font-size: 14px;
  font-weight: 700;
  color: rgb(7, 17, 27);
  line-height: 14px;
  margin-bottom: 8px;
}
.f_12 .f_sell {
  font-size: 10px;
  color: rgb(147, 153, 159);
  line-height: 10px;
  margin-bottom: 18px;
}
.f_sell span {
  margin-right: 12px;
}
.f_12 .f_price {
  font-size: 14px;
  color: rgb(240, 20, 20);
  font-weight: 700;
  line-height: 14px;
  margin-right: 12px;
}
.f_price span,
.f_del span {
  font-size: 10px;
  font-weight: normal;
  line-height: 10px;
}
.f_12 .f_del {
  text-decoration: line-through;
  font-size: 10px;
  font-weight: 700;
  color: rgb(147, 153, 159);
  line-height: 24px;
}
.f_int {
  font-size: 14px;
  font-weight: normal;
  color: rgb(7, 17, 27);
  line-height: 14px;
  margin-bottom: 6px;
}
.f_int2 {
  margin-left: 8px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(77, 85, 93);
  line-height: 24px;
}
.f_3 {
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .f_33{
      padding: 18px 18px 0 18px;
      
  }
  .f_34{
    margin-top: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .f_35{
      padding:12px 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 12px;
      color:rgb(147,153,159);
      line-height: 24px;
  }
  .f_i{
      font-size: 24px;
      vertical-align: middle;
  }
  .f_36 .f_36_1{
    font-size: 10px;
    color:rgb(147,153,159);
    margin-bottom: 6px;
  }
  .f_36 .f_36_2{
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .f_36 li{
    margin: 16px 16px 0 16px;
    display: block;
  }
  .f_36 .f_wrap{
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding-bottom: 16px;
  }
  .f_36 li:last-child .f_wrap{
    
    border-bottom: none;
  }
  .f_36 li:last-child{
    margin-right: 16px;
  }
  
  .f_36_3{
    margin-right: 6px;
  }
  .f_36_5{
    float: right;
  }
  .f_36_6{
    margin-left: 4px;
    vertical-align:top;
  }
  .f_img{
    float: right;
    width: 12px;
    height:12px;
    margin-left: 6px;
    border-radius: 50%;
  }
  .icon-thumb_up{
    color:rgb(0,160,220);
  }
  .icon-thumb_down{
    color:rgb(147,153,159);
  }
  .chose{
    color:#00c850;
  }
  .f_12 .cco,.f_12 .cco1{
    position: absolute;
    right: 18px;
    bottom: 16px;
  }
  .f_12 .cco1{
    width: 74px;
    height: 16px;
    line-height: 16px;
    background-color: rgb(0,160,220);
    border-radius: 12px;
    padding: 6px 12px;
    color:#fff;
    font-size: 10px;
    
    text-align: center;
  }
  .fadef-enter-to,.fadef-leave{
    opacity: 1;
  }
  .fadef-enter,.fadef-leave-to{
    opacity: 0;
  }
  .fadef-enter-active,.fadef-leave-active{
    transition: all 0.5s;
  }
</style>