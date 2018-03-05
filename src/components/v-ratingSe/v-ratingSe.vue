<template>
<div class="r_wrap">
    <div class="r_1" :class="{'r_hight':index===2}" @click="rhight(2)">{{word[0]}}<span class="r_4">{{length1}}</span>
  </div>
  <div class="r_2" :class="{'r_hight':index===0}" @click="rhight(0)">{{word[1]}}<span class="r_4">{{length2}}</span>
  </div>
  <div class="r_3" :class="{'r_hight1':index===1}" @click="rhight(1)">{{word[2]}}<span class="r_4">{{length3}}</span>
  </div>
</div>
  
</template>
<script>
    export default{
        data(){
            return {
                index:2
            }
        },
        props:{
            ratings:{
                type:[Object,Array]
            },
            word:{
                type:Array
            }
        },
        methods:{
            rhight(index){
                this.index=index
                this.$emit('rhight',index)
            }
        },
        computed:{
            length1(){
                let len=0;
                for(let i in this.ratings){
                    if(this.ratings[i]){
                        len++
                    }
                }
                return len
            },
            length2(){
                let len=0;
                for(let i in this.ratings){
                    if(this.ratings[i].rateType===0){
                        len++
                    }
                }
                return len
            },
            length3(){
                let len=0;
                for(let i in this.ratings){
                    if(this.ratings[i].rateType===1){
                        len++
                    }
                }
                return len
            }
        }
    }
</script>
<style>
    .r_wrap{
        font-size: 0;
    }
    .r_1,.r_2,.r_3{
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        padding: 8px;
        color:rgb(77,85,93); 
        font-weight: 200;
        margin-right: 8px;
    }
    .r_1,.r_2{
      background-color:  rgba(0,160,220,0.2); 
    }
    .r_2{
        
    }
    .r_3{
       background-color:  rgba(77,85,93,0.2);   
    }
    .r_4{
        font-size: 8px;
        margin-left: 4px;
    }
    .r_hight{
        background-color: rgb(0,160,220);
        color:#fff;
    }
    .r_hight1{
        background-color: #4d555d;
        color:#fff;
    }
</style>

