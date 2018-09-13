<template>
    <div class="quotation">
        <div class="q" v-if="isRender">
            <header>
                <p>可向多个商家咨询最低价，商家及时回复</p>
                <img src="" alt="">
            </header>
            <div class="content">
                <div class="q-info">
                    <img :src="data.details.serial.Picture" alt="">
                    <div>
                        <p>{{data.details.serial.AliasName}}</p>
                        <p>{{data.details.market_attribute.year}}款 {{data.details.car_name}}</p>
                    </div>
                </div>
                <div class="self-info">
                    <div class="tip">
                        个人信息
                    </div>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <input type="text" placeholder="输入你的真实中文姓名" v-model="username">
                        </li>
                        <li>
                            <span>手机</span>
                            <input type="tel" placeholder="输入你的真实手机号码" v-model="password">
                        </li>
                        <li>
                            <span>验证</span>
                            <input type="text">
                            <input type="button" value="获取验证码" @click="e=>getCode(e)" ref="code">
                        </li>
                        <li>
                            <span>城市</span>
                            <span @click="getCityList">{{city}}</span>
                        </li>
                    </ul>
                    <div class="quotation">
                        <button @click="submits">询最低价</button>
                    </div>
                </div>
                <div class="dealer-info">
                    <div class="tip">
                        选择报价经销商
                    </div>
                    <ul>
                        <li v-for="(item,index) in data.list" :key="index" :class="{active:[0,1,2].includes(index)}">
                            <p>
                                <span>{{item.dealerShortName}}</span>
                                <span>{{item.promotePrice}}万</span>
                            </p>
                            <p>
                                <span>{{item.address}}</span>
                                <span>售{{item.saleRange}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="supp-info">
                </div>
            </div>
            <footer>
                <button>询最低价</button>
            </footer>
        </div>
        <div class="result" v-if="isResult">
            <div class="wrap">
                <img src="" alt="">
                <p>询价成功</p>
                <p>
                    稍后有专业汽车顾问为你服务
                    <br>
                    请保持手机畅通
                </p>
                <div>
                    <button @click="changeResult">确定</button>
                </div>
            </div>
        </div>
        <city/>
    </div>
</template>

<script>
    import City from '../view/City';
    import {
        mapActions,
        mapState,
        mapMutations
    } from 'vuex';
    export default {
        data(){
            return {
                username:'',
                password:''
            }
        },
        mounted() {
            this.id = this.$route.params.id || JSON.parse(window.sessionStorage.getItem('carId'));
            this.getCarDetail({carId:this.id,cityId:201});
        },
        methods: {
            ...mapActions({
                getCarDetail: 'quotation/getCarDetail',
                getCityList:'quotation/getCityList',
                submit:'quotation/submit',
                getCapture:'quotation/getCapture',
            }),
            ...mapMutations({
                changeResult:'quotation/changeResult'
            }),
            getCode(e){
                // console.log(this.password);
                if (!/^1[3,4,5,7,8,9]\d{9}$/.test(this.password)){
                    alert('请输入正确的手机号');
                    return;
                }
                this.getCapture(this.password);
                //随机函数
                function getRandom(min,max){
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                //获取六位随机数
                function test(){
                    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                    let newStr = '';
                    for(let i = 0;i<6;i++){
                        let n = getRandom(0,str.length - 1);
                        let s = str[n];
                        if(newStr.indexOf(s)===-1){
                            newStr += s;
                        }else{
                            i--;
                        }
                    }
                    return newStr;
                };
                let time = 60;
                let timer = null;
                e.target.disabled = true;
                timer = setInterval(()=>{
                    e.target.value = `${time}秒`;
                    time --;
                    if(time <=0){
                        clearInterval(timer);
                        time = 60;
                        e.target.disabled = false;
                        e.target.value = test();
                    }
                },1000);
            },
            submits(){
        //    @param carId 车型id
        //    @param mobile 用户手机号 *
        //    @param dealerIds 经销商id列表 *
        //    @param location 用户所在城市 *
        //    @param carname 选择车型的名字 *
        //    @param locationid 用户所在城市id *
        //    @param name 用户的姓名 *
        //    @param openUDID 设备号 *
        //    @param flag 默认值1 *
        //    @param orderTypeId 默认值1 *
        //    @param channelId 默认值0
                // console.log(this.id);
                // console.log(this.username);
                // console.log(this.password);
                // console.log(this.data.list[0].dealerId);
                // console.log(this.data.list[0].cityid);
                // console.log(this.city);
                // console.log(this.data.details.car_name);
                this.submit({
                    carId:this.id,
                    mobile:this.password,
                    dealerIds:this.data.list[0].dealerId,
                    location:this.city,
                    carname:this.data.details.car_name,
                    locationid:this.data.list[0].cityid,
                    name:this.username,
                    openUDID:'',
                    flag:1,
                    orderTypeId:1,
                    channelId:0
                })
            }
        },
        computed: {
            ...mapState({
                data: state => state.quotation.data,
                isRender: state => state.quotation.isRender,
                city:state=>state.quotation.city,
                isResult:state=>state.quotation.isResult
            })
        },
        components:{
            City
        }
    }
</script>

<style scoped>
    .quotation{
        width:100%;
        height: 100%;
        overflow: auto;
    }
    .q {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }
    .q header {
        position: fixed;
        left:0;
        top:0;
        height: .6rem;
        line-height: .6rem;
        width: 100%;
        background: #79cd92;
        text-align: center;
        z-index: 99;
    }
    .q header p {
        color: #fff;
        font-size: .3rem;
        display: inline-block;
    }
    .q header img {
        width: .3rem;
        margin-left: .1rem;
        vertical-align: -9%;
    }
    .q .content {
        -webkit-box-flex: 1;
        flex: 1;
        width: 100%;
        margin-top:.6rem;
        height: auto;
        background: #f4f4f4;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .q .q-info {
        background: #fff;
        padding: .32rem .18rem .24rem;
        position: relative;
        height: 2rem;
        box-sizing: border-box;
        display: flex;
    }
    .q .q-info:before {
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        right: .26rem;
        top: .9rem;
    }
    .q .q-info img {
        width: 2.3rem;
        height: 1.41rem;
        border: 1px solid #eee;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .q .q-info div {
        margin-left: .2rem;
        width: 4.3rem;
    }
    .q .q-info div p:first-child {
        font-size: .36rem;
        line-height: 1;
    }
    .q .q-info div p:nth-child(2) {
        margin-top: .26rem;
        font-size: .32rem;
        line-height: 1.2;
        color: #333;
    }
    .q .content .tip {
        padding: 0 .2rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .24rem;
        color: #666;
        background: #eee;
        text-align: left;
    }
    .q .self-info ul {
        background: #fff;
        padding: 0 .2rem;
    }
    .q .self-info ul li {
        font-size: .32rem;
        height: .88rem;
        line-height: .88rem;
        border-bottom: 2px solid #eee;
        box-sizing: border-box;
        color: #000;
    }
    .q .self-info ul li input {
        font-size: .32rem;
        padding-right: .2rem;
        width: 88%;
        text-align: right;
        box-sizing: border-box;
        color: #555;
        border:0;
    }
    .q .self-info ul li:nth-child(3){
        display: flex;
    }
    .q .self-info ul li:nth-child(3) input{
        font-size: .32rem;
        padding-right: .2rem;
        width: 44%;
        text-align: center;
        box-sizing: border-box;
        color: #555;
    }
    .q .self-info ul li span:nth-child(2) {
        display: inline-block;
        width: 88%;
        color: #555;
        text-align: right;
        box-sizing: border-box;
    }
    .q .self-info ul li span:nth-child(2):after {
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 1px solid silver;
        border-right: 1px solid silver;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .q .self-info>div {
        background: #fff;
        text-align: center;
        padding-top: .3rem;
        padding-bottom: .28rem;
    }
    .quotation button {
        font-size: .32rem;
        color: #fff;
        width: 80%;
        background: #3aacff;
        height: .7rem;
        border-radius: .1rem;
    }
    .q .dealer-info ul {
        background: #fff;
        padding: 0 .18rem;
    }
    .q .dealer-info li {
        position: relative;
        padding: .26rem 0 .26rem .54rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        height: 1.65rem;
    }
    .q .dealer-info li.active:before {
        background: #3aacff;
        border: none;
    }
    .q .dealer-info li:before {
        content: "";
        display: inline-block;
        width: .32rem;
        height: .32rem;
        border-radius: 50%;
        border: 2px solid #ccc;
        box-sizing: border-box;
        position: absolute;
        left: .05rem;
        top: 50%;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
    }
    .q .dealer-info li p:first-child {
        font-size: .3rem;
    }
    .q .dealer-info li p:first-child span:last-child {
        font-size: .24rem;
        float: right;
        color: red;
    }
    .q .dealer-info li p:nth-child(2) {
        margin-top: .1rem;
        font-size: .24rem;
        color: #a2a2a2;
    }
    .q .dealer-info li p:nth-child(2) span:first-child {
        display: inline-block;
        max-width: 4.6rem;
    }
    .q .dealer-info li p:nth-child(2) span:nth-child(2) {
        float: right;
    }
    .q .dealer-info li.active:after {
        content: "";
        display: inline-block;
        padding-top: .17rem;
        padding-right: .1rem;
        border: 2px solid #fff;
        -webkit-transform: rotate(40deg) translate3d(0, -50%, 0);
        transform: rotate(40deg) translate3d(0, -50%, 0);
        position: absolute;
        left: .07rem;
        border-left: none;
        border-top: none;
        top: 47%;
    }
    .q .supp-info {
        text-align: center;
        height: .4rem;
    }
    .q footer {
        width: 100%;
        z-index: 99;
    }
    .q footer button {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: #3aacff;
        text-align: center;
        font-size: .34rem;
        color: #fff;
    }
    .result {
    position: fixed;
    z-index: 101;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,.5);
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.result .wrap {
    -webkit-animation: e .3s ease forwards;
    animation: e .3s ease forwards;
    height: auto;
    background: #fff;
    border-radius: .2rem;
    padding: .3rem .3rem 0;
    text-align: center;
    display: inline-block;
    width: 76%;
    overflow: hidden;
}
.result img:first-child {
    width: .8rem;
    display: block;
    margin: 0 auto .3rem;
}
.result p:nth-child(2) {
    font-size: .4rem;
    color: #3cc144;
    margin: .1rem;
}
.result p:nth-child(3) {
    font-size: .24rem;
    color: silver;
    margin: .15rem;
}
.result .wrap div {
    width: 120%;
    margin-left: -10%;
    height: .8rem;
    margin-top: .3rem;
    border-top: 1px solid #f4f4f4;
}
.result .wrap div button:last-child {
    box-sizing: border-box;
    color: #fff;
}
</style>