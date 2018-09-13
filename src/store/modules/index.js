import {
    getBrandList,
    getCarType
} from '../../api/index';
let state = {
    brand:{},          //品牌列表数据
    letter:[],         //右侧字母数据
    hide:false,        //lodeing显示与否
    isShow:false,      //车系列表是否显示
    cars:[],           //车系列表数据
    touchLetter:null,  //字母导航实时数据
    letterShow:false   //字母导航是否显示
};

let getters = {

};

let mutations = {
    initData :(state,payload)=>{
        // console.log(payload);
        //处理车型数据
        let letter = [];
        let brand = {};
        payload.forEach((item)=>{
            let spell = item.Spelling[0];
            // console.log(spell);
            //判断首字母是否在letter中出现过
            if(letter.includes(spell)){
                // console.log(1)
                //如果有，直接把item放在brand中
                brand[spell].push(item);
            }else{
                // console.log(2)
                //如果没有，把首字母放在letter中，并且在brand中新建一个键值对，值为数组
                letter.push(spell);
                brand[spell]=[item];
            }
        })
        state.letter = letter;
        state.brand = brand;
        state.hide = true;
        // console.log(state);
    },
    changeIsShow(state,payload){
        // console.log(payload);
        state.cars = payload;
        state.isShow = true;
    },
    changeShow(state, payload) {
        state.isShow = false;
    },
    touchStart(state, payload) {
        state.letterShow = true;
    },
    touchMove(state, payload) {
        // console.log(payload);
        state.touchLetter = payload;
    },
    touchEnd(state, payload) {
      state.letterShow = false;
      state.touchLetter = null;
    }

};

let actions = {
    initData :(context,payload)=>{
        // console.log(context);
        getBrandList().then((res)=>{
            if(res.code===1){
                context.commit('initData',res.data);
            }else{
                alert(res.msg);
            }
        })
    },
    changeIsShow(context,payload){
        getCarType(payload).then((res)=>{
            if (res.code === 1) {
                // console.log(res);
              context.commit('changeIsShow', res.data);
            } else {
              alert(res.msg);
            }
        })
    },
    changeShow(context,payload){
        context.commit('changeShow');
    },
    
};


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
};