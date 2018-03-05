<template>
        <div class="seller">
          <div ref="seller">
            <div class="seller_1">
                <div class="seller_11">
                    <h2>{{seller.name}}</h2>
                    <div class="seller_111">
                       <star :score="seller.foodScore" :size="36"  class="seller_112"></star>
                        <span  class="seller_113">({{seller.ratingCount}})</span>
                        月售{{seller.sellCount}}单
                    </div>
                    <div class="seller_fa" @click="changefa">
                      <i class="icon-favorite" :class="{'icon-favorite_a':flag,'icon-favorite_b':!flag}"></i>
                      <p class="seller_fa1">{{faa}}</p>
                    </div>
               </div>
                <div class="seller_12">
                    <div class="seller_121">起送价<p class="seller_124"><span class="seller_125">{{seller.minPrice}}</span>元</p></div>
                    <div class="seller_122">商家配送<p class="seller_124"><span class="seller_125">{{seller.deliveryPrice}}</span>元</p></div>
                    <div class="seller_123">平均配送时间<p class="seller_124"><span class="seller_125">{{seller.deliveryTime}}</span>分钟</p></div>
                </div>
            </div>
            <split></split>
            <div class="seller_2">
              <div class="seller_21">
              <p class="seller_22">公告与活动</p> 
              <p class="seller_23">{{seller.bulletin}}</p>
              </div>
              <ul class="seller_ul">
                <li v-for="item in seller.supports">
                 <span :class="'bgi-'+item.type+' t3'"></span>{{item.description}}
                </li>
              </ul>
            </div>
            <split></split>
            <div class="seller_3">
              <span class="seller_31">商家实景</span>
                <div ref="picwarp" class="seller_32">
                  <ul ref="picul">
                  <li v-for="item in seller.pics">
                    <img :src="item" alt="" style="height:120px;width:120px">
                  </li>
                </ul>
                </div>
            </div>
            <split></split>
            <div class="seller_4">
             <div class="seller_41">
                <ul class="seller_42">
                  <li>商家信息</li>
                  <li v-for="item1 in seller.infos">
                    {{item1}}
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
            
       
    </template>
    <script>
import split from "../split/split";
import star from "../v-star/v-star";
import BScroll from "better-scroll";
import {storesave,storeread} from "../../common/js/store";
export default {
  components: {
    split,
    star
  },
  props:{
    seller:Object
  },
  data() {
    return {
      flag:false
    };
  },
  methods: {
    _scrollSeller() {
      this.sellerScroll = new BScroll(this.$el, {
        click: true
      });
    },
    _scrollPic() {
      this.picScroll = new BScroll(this.$refs.picwarp, {
        scrollX: true,
        eventPassthrough: 'vertical'
      });
    },
    changefa(){
      this.flag=!this.flag
      storesave(this.seller.id,'fav',this.flag)
      console.log(storeread(this.seller.id,'fav',false))
      }
  },
  computed:{
    // fa(){
    //   return storeread(this.seller.id,'fav',false)
    // },
     faa(){
      if(this.flag===true){
        return "已收藏"
      }else{
        return "收藏"
      }
    
  }},
  mounted() {
      this._scrollSeller();
      this.$refs.picul.style.width=4*(120+6)+'px'
      this._scrollPic()
      this.flag=storeread(this.seller.id,'fav',false)
  }
}
</script>
    <style lang="">
.seller {
  position: absolute;
  left: 0;
  top: 175px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.seller_1 {
  position: relative;
  padding: 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller_11 {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller_111 {
  font-size: 10px;
  color: rgb(77, 85, 93);
  line-height: 18px;
  margin-bottom: 18px;
}
.seller_11 h2 {
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
}
.seller_112 {
  display: inline-block;
  margin-right: 8px;
  vertical-align: top;
}
.seller_113 {
  margin-right: 12px;
}
.seller_12 {
  margin-top: 18px;
  display: flex;
  text-align: center;
  font-size: 10px;
  line-height: 10px;
  color: rgb(147, 153, 159);
}
.seller_121 {
  flex: 1;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller_122 {
  flex: 1;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
}
.seller_123 {
  flex: 1;
}
.seller_124 {
  margin-top: 4px;
  color: rgb(7, 17, 27);
}
.seller_125 {
  font-size: 24px;
  line-height: 24px;
}
.seller_2 {
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding: 18px 18px 0 18px;
}
.seller_21 {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding-bottom: 16px;
}
.seller_22 {
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
}
.seller_23 {
  padding: 0 12px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(160, 7, 7);
  line-height: 24px;
}
.seller_ul li {
  font-size: 12px;
  display: block;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  line-height: 16px;
  font-weight: 200;
  color: rgb(7, 17, 27);
}
.seller_ul li span {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 6px;
}
.seller_ul li:last-child {
  border: none;
}
.seller_3 {
  padding: 18px;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.seller_31{
   font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
}
.seller_32{
  margin-top: 12px;
  width: 100%;
  overflow: hidden;
  white-space:nowrap;
}
.seller_3 ul li{
  display: inline-block;
  font-size: 20px;
  margin-right: 6px;
}
.seller_4 {
   border-top: 1px solid rgba(7, 17, 27, 0.1);
   padding: 18px 18px 0 18px;
}
.seller_41 li{
  font-size: 12px;
  display: block;
  border-bottom:  1px solid rgba(7, 17, 27, 0.1);
  padding: 16px 12px;
  font-weight: 200;
  color:rgb(7,17,27);
  line-height: 16px;
}
.seller_41 li:last-child{
  border: none;
}
.seller_41 li:first-child{
  font-size: 14px;
  line-height: 14px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
  padding: 0 0 12px 0;
}
.icon-favorite{
  font-size: 24px;
  
  line-height: 24px;
  margin-bottom: 4px;
}
.icon-favorite_a{
color:rgb(240,20,20);
}
.icon-favorite_b{
color:#d4d6d9;
}
 .seller_fa{
   position: absolute;
   top: 18px;
   right: 18px;
   width: 50px;
   text-align: center;
 }
 .seller_fa1{
   font-size: 16px;
   color:rgb(77,85,93);
   line-height: 16px;
 }
</style>