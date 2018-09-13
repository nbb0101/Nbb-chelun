<template>
    <div class="detail">
        <div class="car" v-if="carInfo.list">
            <div class="content">
                <router-link to='/picture' tag="div" class="img">
                    <img :src="carInfo.CoverPhoto" alt="">
                    <span>{{carInfo.pic_group_count}}张照片</span>
                </router-link>
                <div class="info">
                    <p>
                        {{carInfo.market_attribute.dealer_price}}
                    </p>
                    <p>指导价：{{carInfo.market_attribute.official_refer_price}}</p>
                    <div class="action">
                        <button @click="clickFn(carInfo.list[0].car_id)">询问低价</button>
                    </div>
                </div>
                <div class="car-list">
                    <div class="c-type">
                        <span v-for="(item,index) in yearList" :key="index" @click="changeYear(item)" :class="{active:item===show}">{{item}}</span>
                    </div>
                    <div v-for="(value,key,ind) in list" :key="ind">
                        <p>{{key}}</p>
                        <ul>
                            <li v-for="(v,i) in value" :key="i">
                                <p>{{v.market_attribute.year}}款 {{v.car_name}}</p>
                                <p>{{v.horse_power}}马力{{v.gear_num}}档{{v.trans_type}}</p>
                                <p>
                                    <span>指导价：{{v.market_attribute.official_refer_price}}</span>
                                    <span>{{v.market_attribute.dealer_price_min}}起</span>
                                </p>
                                <button @click="clickFn(v.car_id)">询问低价</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="bottom" @click="clickFn(carInfo.list[0].car_id)">
                <p>询问低价</p>
                <p>本地经销商为您报价</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState,
        mapGetters
    } from 'vuex';
    export default {
        computed: {
            ...mapState({
                carInfo: state => state.detail.carInfo,
                show: state => state.detail.show
            }),
            ...mapGetters({
                yearList: 'detail/yearList',
                list: 'detail/list'
            })
        },
        methods: {
            ...mapActions({
                getDetail: 'detail/getDetail',
                changeYear: 'detail/changeYear'
            }),
            clickFn(id) {
                window.sessionStorage.setItem('carId', JSON.stringify(id));
                this.$router.push({
                    name: 'Quotation',
                    params: {
                        id
                    }
                })
                // console.log(id);
            }
        },
        mounted() {
            // console.log(this.$route.params.id);
            this.id = this.$route.params.id;
            let obj = {
                id: this.id,
                carId: "",
                carName: "车款",
                colorId: "",
                colorName: "颜色",
            }
            window.sessionStorage.setItem('carInfo', JSON.stringify(obj));
            this.getDetail(this.id);
            // console.log('mounted    1');
        },
        beforeDestroy() {
            // console.log('destroy     2');
        },
        beforeRouteEnter(to, from, next) {
            // ...
            // console.log('beforerouteenter       3');
            next();
        },
        beforeRouteLeave(to, from, next) {
            // ...
            // console.log('beforerouteleave       4');
            next();
        }
    }
</script>

<style scoped>
    .detail,
    .car {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
        /* overflow: hidden; */
    }
    .content {
        height: 100%;
        overflow: auto;
    }
    .img {
        position: relative;
        height: 3.29rem;
        overflow: hidden;
    }
    .img img {
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        position: absolute;
    }
    .img span {
        position: absolute;
        bottom: .3rem;
        right: .3rem;
        color: #fff;
        padding: 1px .1rem;
        border-radius: .2rem;
        background: rgba(0, 0, 0, .6);
        font-size: .24rem;
    }
    .info {
        padding: .36rem .2rem .3rem;
        background: #fff;
        position: relative;
    }
    .info p {
        max-width: 3.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .info p:first-child {
        font-size: .36rem;
        color: red;
        font-weight: 500;
    }
    .info p:first-child span {
        font-size: .32rem;
        font-weight: 400;
    }
    .info p:nth-child(2) {
        font-size: .26rem;
        color: silver;
    }
    .info .action {
        padding-top: .2rem;
        -webkit-box-pack: justify;
        justify-content: space-between;
        width: 50%;
        position: absolute;
        right: .1rem;
        top: .22rem;
    }
    .info .action button:last-child {
        background: #00afff;
        color: #fff;
    }
    /* .info .action button:first-child {
            background: #fff; 
            color: #313131;
        } */
    .info .active button {
        width: 100%;
    }
    .info .action button {
        border-radius: .1rem;
        font-size: .32rem;
        height: .7rem;
        width: 3.45rem;
        border: none;
        box-sizing: border-box;
    }
    .car-list .c-type {
        border-top: .15rem solid #f4f4f4;
        padding: 0 .3rem;
        font-size: .32rem;
        height: .77rem;
        line-height: .77rem;
        background: #fff;
    }
    .car-list .c-type span {
        padding-right: .46rem;
    }
    .car-list .c-type span.active {
        color: #3aacff;
    }
    .car-list>div>p {
        padding: 0 .2rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .26rem;
        color: #999;
        background: #f4f4f4;
    }
    .car-list ul {
        background: #fff;
    }
    .car-list ul li {
        padding: 0 .2rem;
        border-bottom: .18rem solid #f4f4f4;
        overflow: hidden;
    }
    .car-list ul li:last-child {
        border-bottom: 0;
    }
    .car-list ul li p:first-child {
        padding: .26rem 0 .18rem;
        font-size: .3rem;
        line-height: 1;
        color: #3d3d3d;
    }
    .car-list ul li p:nth-child(2) {
        color: #bdbdbd;
        font-size: .26rem;
    }
    .car-list ul li p:nth-child(3) {
        text-align: right;
        padding-bottom: .1rem;
        font-size: .24rem;
        color: #818181;
    }
    .car-list ul li p:nth-child(3) {
        text-align: right;
        padding-bottom: .1rem;
        font-size: .24rem;
        color: #818181;
    }
    .car-list ul li p:nth-child(3) span:nth-child(2) {
        font-size: .3rem;
        color: #ff2336;
        margin-left: .1rem;
    }
    .car-list ul li button {
        border: none;
        border-top: 1px solid #eee;
        width: 110%;
        height: .8rem;
        font-size: .32rem;
        color: #00afff;
        background: #fff;
        font-weight: 500;
        margin-left: -.3rem;
    }
    .bottom {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 99;
        background: #3aacff;
        height: 1rem;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .bottom p:first-child {
        font-size: .32rem;
        margin-top: .12rem;
        font-weight: 500;
    }
    .bottom p:nth-child(2) {
        font-size: .24rem;
    }
</style>