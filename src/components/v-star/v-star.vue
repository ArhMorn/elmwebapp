<template>
        <div>
            <ul>
               <li v-for="num in intScore" :class="'on_'+size"></li>
               <li v-if="intScore<5" v-for="num in (5-intScore)" 
               :class='{"half_24":half&&num===1&&size===24,"off_24":size===24&&(! half||num!==1),"half_36":half&&num===1&&size===36,"off_36":size===36&&(! half||num!==1)}'></li>
            </ul>
        </div>
</template>


 <script>
export default {
  data() {
    return {
      half: false
    }
  },
  props: {
    score: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 24
    }
  },
  mounted() {
    if (this.score * 2 - Math.floor(this.score) * 2 >= 1) {
      this.half = true;
      return;
    } else {
      this.half = false;
      return;
    }
  },
  computed: {
    intScore() {
      return Math.floor(this.score);
    }
  }
}
</script>
<style>
.on_24 {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: url(../../../resource/img/star24_on@2x.png) no-repeat;
  background-size: contain;
}
.half_24 {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: url(../../../resource/img/star24_half@2x.png) no-repeat;
  background-size: contain;
}
.off_24 {
  margin-right: 24px;
  width: 24px;
  height: 24px;
  background: url(../../../resource/img/star24_off@2x.png) no-repeat;
  background-size: contain;
}
.on_36 {
  width: 18px;
  height: 18px;
  background: url(../../../resource/img/star36_on@2x.png) no-repeat;
  background-size: contain;
}
.half_36 {
  width: 18px;
  height: 18px;
  background: url(../../../resource/img/star36_half@2x.png) no-repeat;
  background-size: contain;
}
.off_36 {
  width: 18px;
  height: 18px;
  background: url(../../../resource/img/star36_off@2x.png) no-repeat;
  background-size: contain;
}
ul li {
  display: inline-block;
  font-size: 0;
}
ul li:last-child {
  margin-right: 0;
}
</style>