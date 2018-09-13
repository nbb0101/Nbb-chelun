<template>
    <div class="index" v-if="hide">
        <div class="wrap">
            <section class="section">
                <div v-for="(item,index) in brand" :key='index' class="car-brand">
                    <p :id="index">{{index}}</p>
                    <ul>
                        <li v-for="(value,key) in item" :key='key' @click="changeIsShow(value.MasterID)">
                            <img src='../assets/img/imgs.gif' :data-src="value.CoverPhoto" alt="" srcset="">
                            <span>{{value.Name}}</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <aside class="letter" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <li v-for="(item,index) in letter" :key='index'>{{item}}</li>
        </aside>
        <div class="mask" v-if="letterShow">
            {{touchLetter}}
        </div>
        <car-type/>
    </div>
    <div class="loading" v-else>
        <div>
            <img src="../assets/img/loading.gif" alt="">
            <p>加载中...</p>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    import carType from './view/carType';
    import lazyLoad from '../util/lazyLoad';
    export default {
        components: {
            carType
        },
        computed: {
            ...mapState({
                brand: state => state.index.brand,
                letter: state => state.index.letter,
                hide: state => state.index.hide,
                touchLetter: state=>state.index.touchLetter,
                letterShow:state=>state.index.letterShow
            })
        },
        methods: {
            ...mapActions({
                initData: "index/initData",
                changeIsShow:'index/changeIsShow'
            }),
            touchStart(e) {
                if(this.letter.includes(e.target.innerHTML)){
                    this.$store.commit('index/touchStart');
                    this.$store.commit('index/touchMove',e.target.innerHTML);
                    let ele = document.getElementById(e.target.innerHTML);
                    let top = ele.offsetTop;
                    document.querySelectorAll(".wrap")[0].scrollTop = top;
                }else{
                    return;
                }
                
            },
            touchMove(e) {
                // console.log(e.touches);
                // console.log(this.height);
                //获取手指的位置
                let pageY = e.touches[0].pageY;
                // console.log(pageY)
                //计算当前在哪一个字母
                let index = Math.floor((pageY - this.marginTop) / this.height);
                //字母边界处理
                if (index < 0) {
                    index = 0;
                } else if (index > this.letter.length - 1) {
                    index = this.letter.length - 1;
                }
                // console.log(this.letter[index] , index);
                //查询id为当前字母的元素
                let ele = document.getElementById(this.letter[index]);
                let top = ele.offsetTop;
                // console.log(top);
                document.querySelectorAll(".wrap")[0].scrollTop = top;
                this.$store.commit('index/touchMove',this.letter[index]);
                // console.log(document.querySelectorAll('.wrap'))
            },
            touchEnd() {
                this.$store.commit('index/touchEnd');
            }
        },
        mounted() {
            this.initData();
        },
        updated() {
            this.height = 0.4 * window.innerWidth / 750 * 100;
            // console.log(this.height);
            this.marginTop =
                (window.innerHeight - this.letter.length * this.height) / 2;
            // console.log(this.marginTop);
            lazyLoad('.wrap');
        }
    };
</script>

<style scoped>
    .mask {
        position: fixed;
        top: 50%;
        left: 2.65rem;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
        width: 2.2rem;
        height: 2.2rem;
        background: rgba(0,0,0,.5);
        border-radius: 0.2rem;
        color:#fff;
        text-align: center;
        line-height: 2.2rem;
        font-size: 1rem;
        font-weight: bold;
        z-index: 222;
    }
    .loading {
        position: fixed;
        z-index: 101;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .loading div {
        position: relative;
        top: 50%;
        left: 2.65rem;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
        width: 2.2rem;
        height: 2.2rem;
        background: #000;
        border-radius: 0.2rem;
    }
    .loading img {
        width: 1.6rem;
        margin-top: 0.1rem;
    }
    .loading p {
        font-size: 0.3rem;
        color: silver;
        margin-top: 0.2rem;
    }
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .wrap {
        width: 100%;
        height: 100%;
        overflow: scroll;
    }
    .car-brand p {
        font-size: 0.28rem;
        line-height: 0.4rem;
        background: #f4f4f4;
        padding-left: 0.3rem;
        color: #aaa;
    }
    .car-brand ul {
        margin: 0 0.3rem;
    }
    .car-brand li {
        height: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .car-brand li img {
        height: 0.8rem;
    }
    .car-brand li span {
        font-size: 0.32rem;
        margin-left: 0.4rem;
    }
    .letter {
        z-index: 99;
        position: fixed;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        padding-left: 0.2rem;
    }
    .letter li {
        font-size: 0.24rem;
        height: 0.4rem;
        width:.4rem;
        color: #666;
        font-weight: 500;
        padding: 0.1rem 0.1rem;
        line-height: .4rem;
        text-align: center;
        box-sizing: border-box;
    }
</style>