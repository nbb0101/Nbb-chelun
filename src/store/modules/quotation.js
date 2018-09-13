import {
    getCarDetail,
    getCityList,
    submit,
    getCapture
} from '../../api/index.js'

let state = {
    city: '北京',
    data:null,
    isRender:false,
    isShow: false,
    province:null,
    showCity:false,
    cityList:null,
    isResult:false
};

let getters = {

};

let mutations = {
    initData(state,payload){
        console.log(payload);
        state.data = payload;
        state.isRender = true;
    },
    cityData(state,payload){
        state.province = payload;
        state.isShow = true;
    },
    cityList(state,payload){
        // console.log(payload);
        state.cityList = payload;
        state.showCity = true;
    },
    cityDataHide(state){
        state.isShow = false;
    },
    cityListHide(state){
        state.showCity = false;
    },
    changeCity(state,payload){
        state.city = payload || '北京';
    },
    showResult(state){
        state.isResult = true;
    },
    changeResult(state){
        state.isResult = false;
    }
};

let actions = {
    getCarDetail(context,payload){
        console.log(payload);
        context.commit('changeCity', payload.CityName);
        getCarDetail(payload.carId, payload.cityId).then((res) => {
            if (res.code === 1) {
              context.commit('initData', res.data);
              context.commit('cityListHide');
              context.commit('cityDataHide');  
            } else {
              alert(res.msg);
            }
        })
    },
    getCityList(context, payload) {
        getCityList().then((res)=>{
            if (res.code === 1) {
              context.commit('cityData', res.data);
            } else {
              alert(res.msg);
            }
        })
    },
    getCity(context,payload){
        getCityList(payload).then((res) => {
          if (res.code === 1) {
            context.commit('cityList', res.data);
          } else {
            alert(res.msg);
          }
        })
    },
    submit({commit},payload){
        submit().then((res)=>{
            console.log(res);
            if(res.code){
                commit('showResult');
            }
        })
    },
    getCapture({
        commit
      }, payload) {
        getCapture(payload).then((res) => {
            console.log(res);
        })
    }
};

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}