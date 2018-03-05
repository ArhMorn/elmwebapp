<template>
        <div class="goods">
            <div class="product">
                <div class="left" ref="leftScroll">
                    <ul>
                        <li v-for="(item,index) in goods" :class="{'act':ulheight===index}" @click="toList(index)"><div class="li1"><div><span :class="['bg-'+item.type,{'t4':item.type>0}]"></span>{{item.name}}</div></div></li>
                    </ul>
                    
                </div>
                <div class="right" ref="rightScroll">
                    <ul>
                        <li v-for="item1 in goods" class="food-hook">
                            <h2 class="tit">{{item1.name}}</h2>
                            <ul class="rfood">
                                <li v-for="item2 in item1.foods" @click="showF(item2,$event)">
                                    <div class="food">
                                        <div class="img"><img :src="item2.image" alt=""></div>
                                        <div class="content">
                                        <h2>{{item2.name}}</h2>
                                        <span class="de1">{{item2.description}}</span>
                                         <div class="de2">月售{{item2.sellCount}}<span class="sp">好评{{item2.rating}}</span></div>
                                         <span class="de3">￥{{item2.price}}</span>
                                         <span class="de4" v-if="item2.oldPrice">￥{{item2.oldPrice}}</span>
                                        </div>
                                        <cartcontrol :igood="item2"  @increment="incrementTotal($event)"></cartcontrol>
                                    </div>
                                    
                                </li>
                            </ul>
                        </li>
                     </ul>
                </div>
            </div>
            <shopcart  :seller="seller" :selectfood="selectfood" ref="shopcart"></shopcart>
            <transition name="showF">
             <v-food :food="food" v-show="showfood" ref="food2" @closefood="closefood"  @incrementt="incrementTotal($event)"></v-food>
            </transition>
           
        </div>
</template>
    <script>
import BScroll from "better-scroll";
import shopcart from "./v-shopcart";
import cartcontrol from '../v-cartcontrol/cartcontrol'
import vFood from '.././v-food/v-food'
export default {
  data() {
    return {
      goods: [],
      scrolly: 0,
      ulh: [],
      showfood:false,
      food:{}
    };
  },
  components: {
    shopcart,cartcontrol,vFood
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get("/api/goods").then(res => {
      this.goods = res.data.data;
      this.$nextTick(() => {
        this._scroll();
        this._calHeight();
      });
    });
  },
  computed: {
    ulheight() {
      for (let i = 0; i < this.ulh.length; i++) {
        let height = this.ulh[i];
        let height2 = this.ulh[i + 1];
        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectfood(){
        let sfood=[]
        this.goods.forEach((ee)=>{
         ee.foods.forEach((aa)=>{
           if(aa.count>0){
             sfood.push(aa)
           }
         })
        })
        return sfood
    }
  },
  methods: {
    _scroll() {
      this.meunScroll = new BScroll(this.$refs.leftScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.rightScroll, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrolly = Math.abs(Math.round(pos.y));
      });
    },
    _calHeight() {
      let fhook = document.getElementsByClassName("food-hook");
      let height = 0;
      this.ulh.push(height);
      for (let i = 0; i < fhook.length; i++) {
        height += fhook[i].clientHeight;
        this.ulh.push(height);
      }
    },
    toList(index){
       if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
      let foodList=document.getElementsByClassName("food-hook")
      let el=foodList[index]
      this.foodScroll.scrollToElement(el, 300);
    },
    incrementTotal(target) {
        this.$refs.shopcart.drop(target);
      },
    showF(aa,event){
      if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
      this.showfood=true;
      this.food=aa
      if(!this.foodScroll2){
        this.$nextTick(()=>{
        this.$refs.food2._scrollfood()
      })
      }else{
        this.foodScroll2.refresh()
      }
    },
    closefood(){
      this.showfood=false;
    }
  }
};
</script>
<style lang="">
.product {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
}
.left {
  width: 80px;
  flex: 0 0 80px;
}
.right {
  flex: 1;
}
.left ul {
  width: 100%;
  background-color: #f3f5f7;
}
.product ul li {
  font-size: 12px;
  display: block;
}
.left ul li {
  padding: 0 7px;
  width: 80px;
  box-sizing: border-box;
  height: 54px;
}
.left ul .li1 {
  height: 100%;
  color: #000;
  font-weight: 200;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.left ul li:last-child .li1 {
  border-bottom: none;
}
.left ul .li1 div {
  display: table-cell;
  line-height: 14px;

  width: 100%;
}
.t4 {
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: top;
  margin-right: 4px;
}
.tit {
  background-color: #f3f5f7;
  height: 26px;
  line-height: 26px;
  color: rgb(147, 153, 159);
  padding-left: 14px;
  border-left: 2px solid #d9dde1;
}
.right .food-hook{
  width: 100%;
}
.food img {
  width: 54px;
  height: 54px;
}
.product .food {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
}
.rfood li:last-child .food {
  padding-bottom: 0;
  border-bottom: none;
}
.img {
  flex: 0 0 54px;
  width: 54px;
  margin-right: 10px;
}
.content {
  flex: 1;
}
.content h2 {
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin: 2px 0 8px 0;
}
.content .de1 {
  margin: 8px 0;
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
}
.content .de2 {
  margin: 8px 0;
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
}
.content .de2 .sp {
  margin-left: 12px;
}
.content .de3 {
  margin: 8px 0;
  font-size: 14px;
  line-height: 14px;
  color: #f01414;
}
.content .de4 {
  margin: 8px 0 0 8px;
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
  text-decoration: line-through;
}
.act {
  background-color: #fff;
  position: relative;
  top: -1px;

  z-index: 50;
}
.left ul .act .li1 {
  border-bottom: none;
}
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #141d27;
  z-index: 100;
}
.backg{
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vh;
  background-color: rgba(7,17,27,0.6);
  z-index:20;
}
.food{
  position: relative;
}
.rfood .cco{
  position: absolute;
  right: 0;
  bottom: 16px;
}
.rfood li:last-child .cco{
  bottom: 0;
}
.showF-enter,.showF-leave-to{
  transform:translateX(100%);
  opacity: 0;
}
.showF-enter-active,.showF-leave-active{
  transition:all 0.5s;
}
.showF-enter-to,.showF-leave{
  transform:translateX(0);
   opacity: 1;
}
</style>