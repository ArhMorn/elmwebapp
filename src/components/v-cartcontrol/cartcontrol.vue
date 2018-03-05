<template>
  <div class="cco">
      <ul class="ccon">
          <transition name="panning">
          <li class="recir" @click.stop.prevent="recount" v-show="igood.count>0">
             <i class="icon-remove_circle_outline"></i> 
          </li>
           </transition>
           <transition name="panning">
           <li class="midcir" v-show="igood.count>0">{{igood.count}}</li>
           </transition>
          <li class="addcir" @click.stop.prevent="addcount">
            <i class="icon-add_circle"></i>  
          </li>
          
      </ul>
      
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data(){
   return { 
     
     }
  },
  props: {
    igood: {
      type: Object,
      default: {}
    }
  },
  methods: {
    addcount() {
      if (!event._constructed) {
        return;
      }
      if(!this.igood.count){
        Vue.set(this.igood,"count",1)
      }else{
        this.igood.count++;
      }
      this.$emit('increment', event.target);
    },
    recount() {
      if (!event._constructed) {
        return;
      }
      this.igood.count--;
    }
  }
};
</script>
<style>
.cco .ccon li {
  display: inline-block;
  font-size: 0;
}
.cco .ccon .addcir,
.cco .ccon .recir {
  font-size: 24px;
  color: rgb(0, 160, 220);
}
.cco .ccon .midcir,
.cco .ccon .addcir,
.cco .ccon .recir {
  line-height: 24px;
  vertical-align: top;
}
.cco .ccon .midcir {
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.panning-enter-active,
.panning-leave-active {
  transition: all 0.2s ease;
}
.panning-leave-to {
  transform: translateX(38px);
  opacity: 0;
}
.panning-enter {
  transform: translateX(38px);
  opacity: 1;
}
</style>
