import {
    getImageList,
    getImgDetailList
} from '../../api/index.js';

let state = {
    imgList: [],    //图片列表
    showImg:false,  //图片列表详情是否显示
    ImgDetailList:[], //图片列表详情
    isSwiper:false,  //图片轮播是否显示
    colorName: null, //tab颜色名
    carName: null,   //tab汽车名
};

let getters = {

};

let mutations = {
    initData(state, payload) {
        let reg = /(\{)([\d])(\})/g;
        payload.map(item => {
            item.List.map(val => {
                val.Url = val.Url.replace(reg, (a, b, c) => {
                return val.LowSize
                })
            })
        })
        state.imgList = payload;
    },
    imgDetail(state,payload){
        console.log(payload);
        let reg = /(\{)([\d])(\})/g;
        payload.List.map(val => {
            val.Url = val.Url.replace(reg, (a, b, c) => {
              return val.LowSize
            })
        });
        console.log(payload.List)
        // console.log([...state.ImgDetailList, ...payload.List]);
        state.ImgDetailList = state.ImgDetailList.concat(payload.List);
        console.log(state.ImgDetailList);
        state.showImg = true;
    },
    getPictureShow(state) {
        state.isSwiper = true;
    },
    getPictureHide(state){
        state.isSwiper = false;
    },
    changeTab(state,payload){
        state.colorName = payload.colorName;
        state.carName = payload.carName;
    }
};

let actions = {
    getImage({
        commit
    }, payload) {
        console.log(payload);
        commit('changeTab',payload);
        getImageList(payload.id, payload.colorId, payload.carId).then((res) => {
            console.log(res);
        if (res.code === 1) {
            commit('initData', res.data);
        } else {
            alert(res.msg);
        }
        })
    },
    getImgDetailList({
        commit
      }, payload) {
        // console.log(payload);
        getImgDetailList(payload.id, payload.imgId, payload.ColorID, payload.carId).then((res) => {
            if (res.code === 1) {
              commit('imgDetail', res.data);
            } else {
              alert(res.msg);
            }
        })
    },
    getPictureShow({
        commit
      }, payload) {
        commit('getPictureShow');
    },
    getPictureHide({commit},payload){
        commit('getPictureHide')
    }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}