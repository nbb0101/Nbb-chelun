//vuex配置
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

//引入modules
import index from './modules/index';
import detail from './modules/detail';
import picture from './modules/picture';
import color from './modules/color';
import quotation from './modules/quotation';

export default new Vuex.Store({
    modules:{
        index,
        detail,
        picture,
        color,
        quotation,
    },
    plugins: [createLogger()]
})

