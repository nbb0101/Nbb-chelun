import Vue from 'vue'
import Router from 'vue-router';
//路由配置
Vue.use(Router);
//引入路由组件
//使用路由懒加载，需要安装插件  babel-plugin-syntax-dynamic-import
// import Index from '../components/Index';

const Index = ()=>import('../components/Index');
const Detail= ()=>import('../components/detail/Detail.vue');
const Picture= ()=>import('../components/picture/Picture.vue');
const Quotation= ()=>import('../components/quotation/Quotation.vue');
const Color= ()=>import('../components/color/Color.vue');
const Type= ()=>import('../components/type/Type.vue');
const Login= ()=>import('../components/login/Login.vue');


let router = new Router({
    mode:'history',
    routes: [
        {
            path:'*',
            redirect:'/index'
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            meta:{
                requireAuth:false,
            }
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
            meta:{
                requireAuth:true,
            }
        },
        ,
        {
            path: '/picture',
            name: 'Picture',
            component: Picture,
            meta:{
                requireAuth:true,
            }
        },
        {
            path: '/quotation',
            name: 'Quotation',
            component: Quotation,
            meta:{
                requireAuth:true,
            }
        },
        {
            path: '/color',
            name: 'Color',
            component: Color,
            meta:{
                requireAuth:true,
            }
        },
        {
            path: '/type',
            name: 'Type',
            component: Type,
            meta:{
                requireAuth:true,
            }
        },
        {
            path:'/login',
            name: 'Login',
            component: Login
        }
    ]
});

// 定义一个全局的路由导航守卫
router.beforeEach((to, from, next) => {
    let token = JSON.parse(window.sessionStorage.getItem('token'));
    // console.log(token);
    if(to.meta.requireAuth && to.name !== 'login'){
        if(token){
            next()
        }else{
            next('/login')
        }
    }
    next();
});

router.afterEach((to,from)=>{
    // console.log('路由跳转');
})

export default router;
