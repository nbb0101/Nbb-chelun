import Vue from 'vue';
import App from './App';
import axios from 'axios';
import particles from 'particles.js';
//引入路由
import router from './router';
// console.log(router);
//引入vuex
import store from './store/index';
import {
  Lazyload
} from 'mint-ui';
import '../static/js/plugins/jquery/jquery-1.10.2.min';

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */);

Vue.use(particles);

Vue.use(Lazyload);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
