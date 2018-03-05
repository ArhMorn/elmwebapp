<template>
<div>
    <div class="shopcart">
      <div class="cartleft" @click="showc">
          <div class="icon">
              <div class="icon1 " :class="{'cartheight':count>0}">
                  <i class="icon-shopping_cart "></i>
              </div>
              <div class="scount" v-show="count>0">{{count}}</div>
          </div>
          <span class="price " :class="{'priceheight':count>0}">￥{{price}}</span>
          <span class="fare">另需配送费￥{{seller.deliveryPrice}}元</span>
      </div>
      <div class="cartright " :class="{'rightheight':price>=seller.minPrice}" @click="alert">
          {{ripost}}
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="flod">
      <div class="cartcontainer" v-show="showcart">
          <div class="carttop">
              <span class="top1">购物车</span>
              <span class="top2" @click="empty">清空</span>
          </div>
          
          <div class="cartcontent" ref="cartc">
              <ul>
                  <li v-for="item in selectfood" class="cartcli">
                    <div class="content">
                    <span class="content1">{{item.name}}</span>
                    <div class="content4">
                      <span class="content5"><span class="content3">￥</span><span class="content2">{{item.price*item.count}}</span></span>
                      <cartcontrol :igood="item"  @increment="drop($event)"></cartcontrol>
                    </div> </div>
                      </li> 
              </ul>
          </div>
         
      </div>
       </transition>
  </div>
  <transition name="fade">
  <div class="backg" v-show="showcart" @click="close"></div>
  </transition>
      
</div>
</template>
<script>
import  Vue from 'vue'
import cartcontrol from "../v-cartcontrol/cartcontrol";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      showcart: false,
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
     dropBalls:[],
     fold:true
    };
  },
  components: {
    cartcontrol
  },
  props: {
    seller: {
      type: Object
    },
    selectfood: {
      type: Array
    }
  },
  computed: {
    count() {
      let num = 0;
      for (let i in this.selectfood) {
        num += this.selectfood[i].count;
      }
      return num;
    },
    price() {
      let num1 = 0;
      for (let i in this.selectfood) {
        num1 += this.selectfood[i].count * this.selectfood[i].price;
      }
      return num1;
    },
    ripost() {
      if (this.count === 0) {
        return `￥${this.seller.minPrice}元起送`;
      } else if (this.price < this.seller.minPrice) {
        let apr = this.seller.minPrice - this.price;
        return `还差￥${apr}元起送`;
      } else {
        return `去结算`;
      }
    }
  },
  methods: {
    scroll() {
      this.cartScroll = new BScroll(this.$refs.cartc, {
        click: true
      });
    },
    chacart(event) {
      for (let i = 0; i < this.selectfood.length; i++) {
        if (event.name === this.selectfood[i].name) {
          if (event.count === 0) {
            this.selectfood.splice(i, 1);
          } else {
            this.selectfood[i].count = event.count;
          }
          return;
        }
      }
      this.selectfood.push(event);
      return;
    },
    showc() {
      if(this.count<1){
        return;
      }
      this.showcart = !this.showcart;
      if(this.showcart===true){
        this.$nextTick(()=>{
          if(!this.cartScroll){
          this.scroll();
        }else{
          this.cartScroll.refresh();
        }
        })
       }
    },
    drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
    close(){
      this.showcart=false;
    },
    alert(){
      alert(`支付${this.price}元`)
    },
    empty(){
      for(let i=0;i<this.selectfood.length;i++){
        this.selectfood[i].count=0
      }
      this.selectfood.splice(0,this.selectfood.length)
      this.showcart=false;
    },
     beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
//          let rf = el.offestHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
  }
};
</script>
<style>
.shopcart {
  display: flex;
  position: relative;
  height: 48px;
  font-size: 0;
  z-index: 100;
}
.cartleft {
  flex: 1;
  background-color: rgb(20,29,39);
  color: rgba(255, 255, 255, 0.4);
}
.cartright {
  flex: 0 0 105px;
  width: 105px;
  background-color: #2b333b;
  height: 48px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
}
.cartcontainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
  transform: translateY(-100%);
   width: 100%;
}
.cartleft .icon {
  display: inline-block;
  position: relative;
  top: -10px;
  margin-left: 12px;
  margin-bottom: 2px;
  width: 56px;
  height: 56px;
  z-index: 100;
  background-color: #141d27;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 6px;
}
.cartleft .icon1 {
  background-color: #2b333b;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
}
.cartleft .price {
  display: inline-block;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  vertical-align: top;
  margin: 12px 0 12px 18px;
  padding-right: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.cartleft .fare {
  display: inline-block;
  margin: 12px 0 12px 12px;
  font-size: 10px;
  line-height: 24px;
  vertical-align: top;
}

.scount {
  width: 24px;
  height: 16px;
  background-color: rgb(240, 20, 20);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  border-radius: 40%;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
}
.cartleft .cartheight {
  background-color: rgb(0, 160, 220);
  color: #fff;
}
.cartleft .priceheight {
  color: #fff;
}
.rightheight {
  background-color: #00b43c;
  color: #fff;
}

.cartcontainer .carttop {
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background-color: #f2f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding: 0 18px;
}

.cartcontainer .carttop .top1 {
  font-size: 14px;
  font-weight: 200;
  color: rgb(7, 17, 27);
  float: left;
}
.cartcontainer .carttop .top2 {
  font-size: 12px;
  color: rgb(0, 160, 220);
  float: right;
}
.cartcontainer .cartcontent {
  position: relative;
  max-height: 217px;
  overflow: hidden;
}
.cartcontainer .cartcontent ul .cartcli {
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  display: block;
  background-color: #fff;
  padding: 0 18px;
}
.cartcontainer .cartcontent ul li .content {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  height: 48px;
  color: rgb(7, 17, 27);
  position: relative;
}
.content .cco{
  display: inline-block;
  vertical-align: middle;
}
.content1{
  color:rgb(7,17,27);
  line-height: 48px;
}
.cartcontainer .cartcontent ul li .content2 {
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.cartcontainer .cartcontent ul li .content3 {
  font-size: 10px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.cartcontainer .cartcontent ul li .content4 {
   position: absolute;
  right: 0;
  top: 0;

}
.cartcontainer .cartcontent ul li .content5{
  display: inline-block;
  margin-right: 12px;;
  line-height: 48px;
}
.flod-enter-active,.flod-leave-active{
  transition: all 0.5s;
  
}
.flod-enter,.flod-leave-to{
  transform: translate3d(0,0,0);
}
 .flod-enter-to{
  transform: translateY(-100%);
} 
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s;
}
.fade-enter,.fade-leave{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.ball-container .ball{
      position :fixed;
      left :32px;
      bottom :22px;
      z-index :200;
      transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      }
      .inner { 
        width: 16px;
        height: 16px;
        border-radius :50%;
        background :rgb(0, 160, 220);
        transition: all 0.4s linear;
        }
</style>
