import {
    getTypeColor
} from '../../api/index.js';

let state = {
    colorList: null,
    colorType:[],
    show:null,
    data:null
};

let getters = {

};

let mutations = {
    initData(state, payload) {
        // console.log(payload);
        let arr = Object.keys(payload);
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        state.colorType = arr;
        // console.log(arr);
        state.data =payload;
        state.colorList = payload[arr[0]];
        state.show = arr[0];
        // console.log(state.colorList);
    },
    changeYear(state,payload){
        state.show = payload;
        state.colorList = state.data[payload];
    }
};

let actions = {
    getColor({
        commit
    }, payload) {
        getTypeColor(payload.id).then((res) => {
            if (res.code === 1) {
                commit('initData', res.data);
            } else {
                alert(res.msg);
            }
        })
    },
    changeYear({commit},payload){
        // console.log(state.show);
        if (payload !== state.show){
            commit('changeYear',payload);
        }
    }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}