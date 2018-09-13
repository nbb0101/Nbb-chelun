<template>
    <div  class="car-type" :class="{active:isShow}" ref="section" 
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend">
        <div>
            <div class="car" v-for="(item,index) in cars" :key="index">
                <p @click="changeShow">{{item.GroupName}}</p>
                <ul v-for="(value,key) in item.GroupList" :key="key">
                    <router-link :to="'/detail/'+value.SerialID" tag="li">
                        <img :src="value.Picture" v-lazy="value.Picture" alt="">
                        <div>
                            <p>{{value.AliasName}}</p>
                            <p>{{value.DealerPrice}}</p>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    export default {
        computed:{
            ...mapState({
                isShow : state=>state.index.isShow,
                cars : state=>state.index.cars
            })
        },
        mounted() {
            // console.log(this.$store);
        },
        methods:{
            ...mapActions({
                changeShow:'index/changeShow'
            }),
            touchstart(e){
                this.touch = e.touches[0];
                // console.log(this.touch )
            },
            touchmove(e){
                let touch = e.touches[0];
                this.offsetX = touch.pageX - this.touch.pageX;
                // console.log(offsetX);
                if(this.offsetX>0){
                    this.$refs.section.style = `transform:translate3d(${this.offsetX}px,0,0)`;
                }
            },
            touchend(e){
                this.$refs.section.style = ``;
                if(this.offsetX>200){     
                    this.changeShow();
                }
            }
        }
    }
</script>

<style scoped>
    .car-type.active {
        transform: translate3d(0,0,0);
        /* transition: transform .3s ease; */
    }
    .car-type {
        position: fixed;
        top: 0;
        right: 0;
        width: 75%;
        transform: translate3d(100%,0,0);
        transition: transform .3s ease;
        background: #fff;
        z-index: 100;
        height: 100%;
        box-shadow: 0 0 0.5rem #eee;
    }
    .car-type>div{
        height: 100%;
        overflow-y: scroll;
    }
    .car-type .car {
        height: auto;
        /* overflow-y: scroll; */
        /* -webkit-overflow-scrolling: touch; */
    }
    .car-type .car>p {
        margin-left: 1px;
        font-size: .28rem;
        line-height: .48rem;
        background: #f2f2f2;
        padding-left: .3rem;
        color: #717171;
    }
    .car-type ul {
        margin-left: .1rem;
    }
    .car-type li {
        height: 1.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .car-type li img {
        margin: 0 .1rem 0 .2rem;
        width: 1.8rem;
        height: 1.2rem;
    }
    .car-type li div p:first-child {
        font-size: .34rem;
        color: #5f687a;
    }
    .car-type li div p:nth-child(2) {
        margin-top: .1rem;
        font-size: .28rem;
        color: red;
    }
</style>