<template>
    <swiper class="swiper img-detail" :options="swiperOption" ref="mySwiper" :class="{active:isSwiper}"  @click="e=>getPictureHide(e)">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in ImgDetailList" :key="index">
            <li class="swiper-zoom-container">
                <img :src="item.Url" alt="">
            </li>
        </swiper-slide>
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
</template>
<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    import {
        swiper,
        swiperSlide
    } from "vue-awesome-swiper";
    import "swiper/dist/css/swiper.css";
    export default {
        data() {
            return {
                swiperOption: {
                    // spaceBetween: 30, //板块间距
                    loop: false, //无缝轮播
                    centeredSlides: true,
                    autoplay: {
                        //自动轮播
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                }
            };
        },
        components: {
            swiper,
            swiperSlide
        },
        // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            },
            ...mapState({
                ImgDetailList: state => state.picture.ImgDetailList,
                isSwiper:state=>state.picture.isSwiper,
            })
        },
        mounted() {
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            // console.log("this is current swiper instance object", this.swiper);
            // this.swiper.slideTo(3, 1000, false)
            // console.log("mounted");
            // 鼠标覆盖停止自动切换
            this.swiper.el.onmouseover = function() {
                this.swiper.autoplay.stop();
                console.log("stop");
            };
            //鼠标离开开始自动切换
            this.swiper.el.onmouseout = function() {
                this.swiper.autoplay.start();
                console.log("start");
            };
        },
        methods:{
            ...mapActions({
                getPictureHide:'picture/getPictureHide',
            })
        }
    };
</script>
<style scoped>
    .img-detail.active{
        display: block;
    }
    .swiper {
        width: 100%;
        height: 100%;
    }
    swiper-slide {
        width: 100%;
        height: 100%;
    }
    .img-detail {
        background: #000;
        top: 0;
        text-align: center;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 101;
        display: none;
    }
    .swiper-zoom-container {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
}
.img-detail  img {
    max-width: 100%;
}
</style>