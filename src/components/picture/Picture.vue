<template>
    <div class="car-img">
        <div class="tit">
            <router-link to="/color" tag="p"><span>{{colorName}}</span></router-link>
            <router-link to="/type" tag="p"><span>{{carName}}</span></router-link>
        </div>
        <section v-if="imgList.length > 0">
            <ul class="img-default" v-for="value in imgList" :key="value.Id">
                <li v-for="(item,index) in value.List" :key="index">
                    <img :src="item.Url" alt="">
                    <div v-if="index===0" @click="getImgDetail(value.Id)">
                        <p>{{value.Name}}</p>
                        <p>{{value.Count}}</p>
                    </div>
                </li>
            </ul>
        </section>
        <ul class="img-list" :class="{active:showImg}" @click="e=>getPictureShow(e)" ref="scrolls">
            <li v-for="(item,index) in ImgDetailList" :key="index">
                <img :src="item.Url" alt="">
            </li>
            <div class="drop">
                <img src="../../assets/img/imgloading.gif" alt="" srcset="">
                <span>加载中...</span>
            </div>
        </ul>
        <swiper/>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    import Swiper from '../view/Swiper';
    export default {
        components: {
            Swiper
        },
        computed: {
            ...mapState({
                imgList: state => state.picture.imgList,
                showImg: state => state.picture.showImg,
                ImgDetailList: state => state.picture.ImgDetailList,
                carName:state=>state.picture.carName,
                colorName:state=>state.picture.colorName,
            })
        },
        methods: {
            ...mapActions({
                getImage: 'picture/getImage',
                getImgDetailList: 'picture/getImgDetailList',
                getPictureShow:'picture/getPictureShow',
            }),
            getImgDetail(imgId) {
                this.imgId = imgId;
                this.getImgDetailList({
                    id: this.carsInfo.id,
                    imgId: this.imgId,
                    ColorID:this.carsInfo.colorId,
                    carId:this.carsInfo.carId
                });
            },
            loading(){
                this.scrollBox = this.$refs.scrolls;
                this.height = window.innerHeight;
                // console.log(this.scrollBox);
                // console.log(this.height);
                this.scrollBox.addEventListener('scroll',e=>{
                    let scrollHeight = this.scrollBox.scrollHeight; //滚动条的总高度
                    // console.log(scrollHeight);
                    // console.log(this.scrollBox.scrollTop);
                    // console.log(this.scrollBox.scrollTop + this.height);
                    // 滚动条的总高度===页面高度+++scrollTop,在++100是距离底部还有100px的时候执行请求数据的命令
                    if(scrollHeight < this.scrollBox.scrollTop + this.height + 100){
                        console.log('111111');
                        this.getImgDetailList({
                            id: this.carsInfo.id,
                            imgId:this.imgId,
                            ColorID:this.carsInfo.colorId,
                            carId:this.carsInfo.carId
                        });
                    }
                })
            }
        },
        mounted() {
            this.carsInfo = JSON.parse(window.sessionStorage.getItem('carInfo'));
            this.getImage(this.carsInfo);
            this.loading();
        },
    }
</script>

<style scoped>
    .car-img {
        height: 100%;
        width: 100%;
        background: #f4f4f4;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .car-img div.tit {
        background: #fff;
        width: 100%;
        height: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: 99;
    }
    .car-img div.tit p {
        -webkit-box-flex: 1;
        flex: 1;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        box-sizing: border-box;
        color: #454545;
        display: inline-block;
    }
    .car-img div.tit p span {
        max-width: 2.6rem;
        display: inline-block;
        vertical-align: middle;
        line-height: 1.25;
        font-size: .28rem;
    }
    .car-img div.tit p:after {
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        margin-left: .2rem;
        vertical-align: 5%;
    }
    section {
        flex: 1;
        margin-top: .18rem;
        overflow: scroll;
        background: #fff;
    }
    section .img-default {
        width: 100%;
        border-bottom: .02rem solid #f4f4f4;
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
    }
    section .img-default li {
        /* flex: 1; */
        flex-shrink: 0;
        position: relative;
        margin-right: .04rem;
        margin-bottom: .06rem;
        width: 2.46rem;
        height: 2.46rem;
        padding: 0;
    }
    section .img-default li img {
        width: 100%;
        height: 100%;
        /* background-size: cover; */
    }
    section .img-default li div {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(56, 90, 130, .5);
    }
    section .img-default li div p {
        color: #fff;
        display: block;
    }
    section .img-default li div p:first-child {
        font-size: .28rem;
        margin-top: .8rem;
    }
    section .img-default li div p:nth-child(2) {
        font-size: .26rem;
    }
    .img-list.active{
        position: fixed;
        left:0;
        top:0;
    }
    .img-list {
        background: #f4f4f4;
        text-align: center;
        position: fixed;
        left:0;
        top:100%;
        width: 100%;
        height: 100%;
        z-index: 99;
        overflow: scroll;
    }
    .img-list li {
        float: left;
        padding-right: .06rem;
        padding-bottom: .06rem;
        width: 2.46rem;
        height: 2.46rem;
        /* padding: 0; */
    }
    .img-list li img {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    .img-list .drop {
    float: left;
    width: 100%;
    text-align: center;
    margin: .1rem 0;
}
.img-list .drop img {
    width: .32rem;
}
.img-list .drop span {
    font-size: .26rem;
    margin-left: .15rem;
    color: #666;
    vertical-align: 10%;
}
</style>