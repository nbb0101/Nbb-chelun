<template>
    <div class="color">
        <p @click="e=>goBack(e)">全部颜色</p>
        <div v-if="colorType.length > 0">
            <p class="c-type">
                <span v-for="(value,key) in colorType" :key="key" :class="{active:value===show}" @click="changeYear(value)">{{value}}</span>
            </p>
            <ul @click="e=>selectColor(e)">
                <li v-for="(item,index) in colorList" :key="index" :data-id="item.ColorId" :data-name="item.Name">
                    <span :style="{backgroundColor:item.Value}"></span> {{item.Name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        computed: {
            ...mapState({
                colorList: state => state.color.colorList,
                colorType: state => state.color.colorType,
                show: state => state.color.show,
            })
        },
        methods: {
            ...mapActions({
                getColor: 'color/getColor',
                changeYear: 'color/changeYear'
            }),
            goBack(e) {
                // console.log(this.$router);
                this.carsInfo.colorId = null;
                this.carsInfo.colorName = e.target.innerHTML;
                window.sessionStorage.setItem('carInfo',JSON.stringify(this.carsInfo));
                this.$router.go(-1);
            },
            selectColor(e) {
                this.carsInfo.colorId = e.target.dataset.id;
                this.carsInfo.colorName = e.target.dataset.name;
                window.sessionStorage.setItem('carInfo',JSON.stringify(this.carsInfo));
                this.$router.push('/picture');
            }
        },
        mounted() {
            this.carsInfo = JSON.parse(window.sessionStorage.getItem('carInfo'));
            this.getColor(this.carsInfo);
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
    .color ul {
        margin-top: .15rem;
        padding: 0 .2rem;
        overflow: hidden;
        background: #fff;
    }
    .color ul li {
        float: left;
        width: 3.45rem;
        font-size: .32rem;
        line-height: .68rem;
        border: 1px solid #3aacff;
        box-sizing: border-box;
        margin: .2rem 0;
        border-radius: .05rem;
    }
    .color ul li:nth-child(odd) {
        margin-right: .2rem;
    }
    .color ul li span {
        display: inline-block;
        width: .4rem;
        height: .4rem;
        margin-left: .2rem;
        vertical-align: -12%;
        background: #fe9210;
        box-sizing: border-box;
        border: 1px solid #818181;
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