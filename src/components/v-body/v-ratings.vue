<template>
        <div class="rat">
            <div>
                <div class="ratT">
                <div class="rat_left">
                    <div class="rat_left1">{{seller.score}}</div>
                    <div class="rat_left2">综合评分</div>
                    <div class="rat_left3">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="rat_right">
                    <div class="rat_right1">服务态度<star :score="seller.serviceScore" :size="36" class="rat_right11"></star><span class="rat_right13">{{seller.serviceScore}}</span></div>
                    <div class="rat_right2">商品评分<star :score="seller.foodScore" :size="36" class="rat_right11"></star><span class="rat_right13">{{seller.foodScore}}</span></div>
                    <div class="rat_right3">送达时间<span class="rat_right12">{{seller.deliveryTime}}分钟</span></div>
                </div>
            </div>
            <split></split>
            <div>
                <div class="rat_mid">
                <v-ratingse :ratings="ratings" :word="word" @rhight="rhight($event)" ></v-ratingSe>
                </div>
            <div class="f_35" @click="only">
                    <i class="f_i icon-check_circle" :class="{'chose':flag}"></i>
                    只看有内容的评价
                </div>
            </div>
            <div class="ratB">
                <ul>
                    <li class="ratB_li" v-for="item in ratings" v-show="(index===2||index===item.rateType)&&(!flag||item.text)">
                        <div class="ratB_1">
                            <div class="ratB_2"><img :src="item.avatar" alt="" class="ratB_img"></div>
                            <div class="ratB_3">
                                <div class="ratB_4"><span class="ratB_41">{{item.username}}</span><span class="ratB_42">{{item.rateTime| formatDate}}</span></div>
                                <div class="ratB_5"><div class="ratB_51"><star :score="item.score" :size="36"></star></div>
                                    <span class="ratB_52" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                                </div>
                                <div class="ratB_6">{{item.text}}</div>
                                <div class="ratB_8">
                                
                                <ul class="ratC">
                                   <i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
                                    <li v-for="item2 in item.recommend">{{item2}}</li>
                                </ul>
                                </div>
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
            </div>
            
        </div>
    </template>
    <script>
    import BScroll from 'better-scroll';
import split from "../split/split";
import vRatingse from "../v-ratingSe/v-ratingSe";
import star from "../v-star/v-star";
import {formatDate} from '../../common/js/date';
export default {
  data() {
    return {
      seller: {},
      ratings: {},
      word: ["全部", "满意", "不满意"],
      flag: false,
      index:2
    };
  },
  components: {
    split,
    vRatingse,
    star
  },
  methods: {
    only() {
      this.flag = !this.flag;
      // if(this.flag===true){

      // }
    },
     rhight(index){
      this.index=index
    },
    _scrollRating() {
      this.ratingScroll = new BScroll(this.$el, {
        click: true
      })
    }
  },
  created() {
    this.$http.get("/api/seller").then(res => {
      this.seller = res.data.data;
    });
      this.$http.get("/api/ratings").then(res => {
        this.ratings = res.data.data;
      });
    this.$nextTick(()=>{
        this. _scrollRating() 
    })
  },
  filters:{
    formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
        
      }
  }
};
</script>
    <style lang="" scoped>
.rat {
  position: absolute;
  left: 0;
  top: 175px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.ratT {
  display: flex;
  padding: 18px 0 18px 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.rat_left {
  flex: 0 0 136px;
  width: 136px;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
  text-align: center;
  padding: 6px 0;
}
.rat_right {
  flex: 1;
  font-size: 0;
  padding: 6px 0 6px 24px;
}
.rat_left1 {
  font-size: 24px;
  color: rgb(255, 153, 0);
  line-height: 28px;
  margin-bottom: 6px;
}
.rat_left2 {
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 12px;
  margin-bottom: 8px;
}
.rat_left3 {
  font-size: 10px;
  color: #93999f;
  line-height: 10px;
}
.rat_right11 {
  display: inline-block;
  vertical-align: middle;
  margin: 0 12px;
}
.rat_right1,
.rat_right2 {
  margin-bottom: 8px;
}
.rat_right1,
.rat_right2,
.rat_right3 {
  font-size: 12px;
  line-height: 18px;
  color: rgb(7, 17, 27);
}
.rat_right12 {
  font-size: 12px;
  color: rgb(147, 153, 159);
  line-height: 18px;
  margin-left: 12px;
}
.rat_right13 {
  font-size: 12px;
  color: rgb(255, 153, 0);
  line-height: 18px;
}
.f_35 {
  padding: 12px 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 12px;
  color: rgb(147, 153, 159);
  line-height: 24px;
}
.chose {
  color: #00c850;
}
ul .ratB_li .ratB_1{
    font-size: 10px;
}
.f_i{
      font-size: 24px;
      vertical-align: middle;
  }
  .rat_mid{
      padding: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      border-top: 1px solid rgba(7, 17, 27, 0.1);
  }
  .ratB_li{
      box-sizing: border-box;
      padding: 18px 18px 0 18px;
      width: 100%;
  }
  .ratB_li:last-child .ratB_1{
      border:none;
  }
  .ratB_1{
      display: flex;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
    padding-bottom: 18px;
  }
  .ratB_img{
      width: 28px;
      height: 28px;
      border-radius: 50%;
  }
  .icon-thumb_up{
    color:rgb(0,160,220);
    vertical-align: middle;
    margin-right: 8px;
  }
  .icon-thumb_down{
    color:rgb(147,153,159);
    vertical-align: middle;
    margin-right: 8px;
  }
  .ratC li{
      font-size: 9px;
  }
  .ratB_2{
      flex:0 0 28px;
      width: 28px;
  }
  .ratB_3{
      flex:1;
      padding-left:12px;
  }
  .ratB_4{
      font-size: 10px;
      line-height: 12px;
      margin-bottom: 4px;
  }
  .ratB_41{
      color:rgb(7,17,27);
      
  }
  .ratB_42{
     color:rgb(147,153,159);
     font-weight: 200;
     float: right;
  }
  .ratB_5{
      font-size: 0;
      margin-bottom: 6px;
  }
  .ratB_51{
      display: inline-block;
       vertical-align: bottom;
  }
  .ratB_52{
      margin-left: 6px;
      font-size: 10px;
      font-weight: 200;
      color:rgb(147,153,159);
      line-height: 12px;
     
  }
  .ratB_6{
      font-size: 12px;
      color:rgb(7,17,27);
      line-height: 18px;
      margin-bottom: 8px;
  }
  .ratC{
      display: inline-block;
  }
  .ratC li{
      margin-right: 8px;
      padding: 6px;
      border:1px solid rgba(7, 17, 27, 0.1);
      margin-bottom: 2px;
  }
</style>