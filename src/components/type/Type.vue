<template>
    <div class="type">
        <p @click="e=>goBack(e)">全部车型</p>
        <div>
            <div class="c-type">
                <span v-for="(item,index) in yearList" :key="index" @click="changeYear(item)"  :class="{active:item===show}">{{item}}</span>
            </div>
            <div v-for="(value,key,ind) in list" :key="ind">
                <p class="tip">
                    {{key}}
                </p>
                <ul  @click="e=>selectCarType(e)">
                    <li v-for="(v,i) in value" :key="i" :data-id="v.car_id" :data-name="v.car_name" :data-year="v.market_attribute.year">
                        <p>
                            <span>{{v.market_attribute.year}}款  {{v.car_name}}</span>
                            <span>{{v.market_attribute.dealer_price_min}}起</span>
                        </p>
                        <p>
                            <span>{{v.horse_power}}马力{{v.gear_num}}档{{v.trans_type}}</span>
                            <span>指导价：{{v.market_attribute.official_refer_price}}</span>
                        </p>
                    </li>
                </ul>
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
                show:state=>state.detail.show,
                
            }),
            ...mapGetters({
                yearList:'detail/yearList',
                list:'detail/list'
            })
        },
        methods: {
            ...mapActions({
                getDetail: 'detail/getDetail',
                changeYear:'detail/changeYear'
            }),
            goBack(e) {
                // console.log(this.$router); 
                // console.log(e.target.innerHTML);
                this.carsInfo.carId = null;
                this.carsInfo.carName = e.target.innerHTML;
                window.sessionStorage.setItem('carInfo',JSON.stringify(this.carsInfo));
                this.$router.go(-1);
            },
            selectCarType(e){
                let carName = `${e.target.dataset.year} 款 ${e.target.dataset.name}`;
                this.carsInfo.carId = e.target.dataset.id;
                this.carsInfo.carName = carName;
                window.sessionStorage.setItem('carInfo',JSON.stringify(this.carsInfo));
                this.$router.push('/picture');
            }
        },
        mounted() {
            this.carsInfo = JSON.parse(window.sessionStorage.getItem('carInfo'));
            this.getDetail(this.carsInfo.id);
        },
    }
</script>

<style scoped>
    .color,
    .type {
        position: absolute;
        top: 0;
        z-index: 101;
        background: #f4f4f4;
        height: 100%;
        width: 100%;
        animation: c .4s ease forwards;
        overflow: auto;
    }
    .color>p,
    .type>p {
        margin: .15rem 0;
        font-size: .34rem;
        color: #00afff;
        background: #fff;
        text-align: center;
        line-height: .8rem;
        height: .8rem;
    }
    .color .c-type,
    .type .c-type {
        margin-top: .15rem;
        padding-left: .2rem;
        font-size: .3rem;
        line-height: .76rem;
        height: .76rem;
        background: #fff;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .color .c-type span.active,
    .type .c-type span.active {
        color: #00afff;
    }
    .color .c-type span,
    .type .c-type span {
        padding-right: .42rem;
    }
    .color .tip,
    .type .tip {
        height: .5rem;
        line-height: .5rem;
    }
    .tip {
        padding: 0 .2rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color: #666;
        background: #eee;
    }
    .type ul {
        background: #fff;
    }
    .type ul li:last-child {
        border: none;
    }
    .type ul li {
        margin: 0 .2rem;
        padding: .28rem .06rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        height: 1.25rem;
        line-height: 1;
    }
    .type ul li p:first-child {
        font-size: .3rem;
    }
    .type ul li p:first-child span:nth-child(1) {
        width: 5rem;
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .type ul li p:first-child span:nth-child(2) {
        float: right;
        color: red;
        font-size: .26rem;
    }
    .type ul li p:nth-child(2) {
        padding-top: .16rem;
        font-size: .24rem;
    }
    .type ul li p:nth-child(2) span:first-child {
        color: #b3b3b3;
    }
    .type ul li p:nth-child(2) span:nth-child(2) {
        color: #818181;
        float: right;
    }
    @keyframes c {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>