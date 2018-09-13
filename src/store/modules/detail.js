import {
    getCarInfo
} from '../../api/index.js';

let state = {
    carInfo: [], //详情数据
    show: '全部', //当前选中的年份
};

let getters = {
    yearList(state) {
        if (!state.carInfo.list) {
          return [];
        }
        let arr = state.carInfo.list.map(item => {
            return item.market_attribute.year;
        })
        let set = new Set(arr);
        return ['全部', ...set];
    },
    list(state) {
        if (!state.carInfo.list) {
          return [];
        }
        // 把排量和吸气类型相同的数据做个合并
        // console.log(state);
        function merge(arr) {
            let types = [];
            let obj = {};
            arr.forEach(item => {
            let type = item.exhaust_str + '/' + item.max_power_str + ' ' + item.inhale_type;
            if (types.indexOf(type) == -1) {
                types.push(type);
                obj[type] = [item];
            } else {
                obj[type].push(item);
            }
            })
            // console.log(obj);
            return obj;
            
        }

        if (state.show === '全部') {
            return merge(state.carInfo.list);
        } else {
            return merge(state.carInfo.list.filter(item => {
            return item.market_attribute.year == state.show;
            }))
        }
    }
};

let mutations = { 
    //筛选各年份数据
    changeYear(state, payload) {
        state.show = payload;
    },
    // 拿到数据，处理数据，按照一定规则排序
    updateInfo(state,payload){
        // console.log(payload);
        // 车型数据排序
        payload.list.sort((a,b)=>{
            // 先按照年份排序 降序
            if (b.market_attribute.year != a.market_attribute.year){
                return b.market_attribute.year - a.market_attribute.year;
            }else{
                // 按照排量排序 升序
                if (b.exhaust_str > a.exhaust_str) {
                  return -1;
                } else if (b.exhaust_str < a.exhaust_str) {
                  return 1;
                } else {
                  // 按照功率排序 升序
                    if (b.max_power_str > a.max_power_str) {
                        return -1;
                    } else if (b.max_power_str < a.max_power_str) {
                        return 1;
                    } else {
                        // 按照指导价格排序 升序
                        if (b.market_attribute.dealer_price_min > a.market_attribute.dealer_price_min) {
                        return -1;
                        } else {
                        return 1
                        }
                    }
                }
            }
        });
        // console.log(payload.list);
        state.carInfo = payload;
    }
};

let actions = {
    getDetail({commit},payload){
        // console.log(payload);
            // console.log('222')
        getCarInfo(payload).then((res)=>{
            if (res.code === 1) {
                commit('updateInfo', res.data);
            } else {
                alert(res.msg);
            }
        })
    },
    changeYear({
      commit
    }, payload) {
      // console.log(state.show);
        commit('changeYear', payload);
    }
};


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}