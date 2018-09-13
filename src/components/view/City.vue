<template>
    <div class="select-city" :class="{active:isShow}">
        <div class="province">
            <div class="location">
                <p>自动定位</p>
                <p>北京</p>
            </div>
            <div class="list">
                <p>省市</p>
                <ul @click="e=>getCity(e.target.dataset.id)">
                    <li v-for="(item,index) in province" :key="index" :data-id="item.CityID" >{{item.CityName}}</li>
                </ul>
            </div>
        </div>
        <div class="city" :class="{active:showCity}" @click="e=>getCarInfo(e)">
            <ul>
                <li v-for="(item,index) in cityList" :key="index" :data-id="item.CityID">{{item.CityName}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    export default {
        computed: {
            ...mapState({
                isShow: state => state.quotation.isShow,
                province: state => state.quotation.province,
                showCity:state=>state.quotation.showCity,
                cityList:state=>state.quotation.cityList,
            })
        },
        methods:{
            ...mapMutations({
                cityListHide:'quotation/cityListHide'
            }),
            ...mapActions({
                getCity:'quotation/getCity',
                getCarDetail: 'quotation/getCarDetail',
            }),
            getCarInfo(e){
                let carId = JSON.parse(window.sessionStorage.getItem('carId'));
                if(e.target === e.currentTarget){
                    console.log('div');
                    this.cityListHide();
                }else if(e.target.tagName === 'LI'){
                    this.getCarDetail({carId,cityId:e.target.dataset.id,CityName:e.target.innerHTML});
                    // console.log(e.target.dataset.id);
                    // console.log(e.target.innerHTML);
                }
                
                // console.log(e.currentTarget);
            }
        }
    }
</script>

<style scoped>
    .select-city.active {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
    .select-city {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: #fff;
        transition: -webkit-transform .3s ease;
        transition: transform .3s ease;
        transition: transform .3s ease, -webkit-transform .3s ease;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    .select-city .province {
        height: 100%;
        overflow-y: scroll;
        /* -webkit-overflow-scrolling: touch; */
    }
    .select-city .province p {
        height: .4rem;
        line-height: .4rem;
        font-size: .24rem;
        padding-left: .2rem;
        background: #f4f4f4;
    }
    .select-city .location p:first-child {
        height: .4rem;
        line-height: .4rem;
        font-size: .24rem;
        padding-left: .2rem;
        background: #f4f4f4;
    }
    .select-city .location p:nth-child(2) {
        padding-left: .4rem;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
    }
    .select-city .province li {
        padding-left: .3rem;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        margin-left: .1rem;
        position: relative;
    }
    .select-city .province li:after {
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        right: .35rem;
        top: .3rem;
    }
    .select-city .city {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        background: rgba(0, 0, 0, .6);
        visibility: hidden;
    }
    .select-city .city.active {
        visibility: visible;
    }
    .select-city .city.active ul {
        -webkit-transform: translate3d(30%, 0, 0);
        transform: translate3d(30%, 0, 0);
    }
    .select-city .city ul {
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        background: #fff;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        transition: -webkit-transform .2s ease;
        transition: transform .2s ease;
        transition: transform .2s ease, -webkit-transform .2s ease;
    }
    .select-city .city ul li {
        padding-left: .3rem;
        font-size: .28rem;
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        margin-left: .1rem;
    }
</style>