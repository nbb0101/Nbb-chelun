export default (el)=>{
    //图片离底部还有2px的时候图片开始加重
    let offset = 2;
    //先找到所有需要懒加载的元素
    let nodes = Array.from(document.querySelectorAll('[data-src]'));
    //判断元素是否出现在视口中
    let inView = (ele) => {
        let rect = ele.getBoundingClientRect();
        // console.log(rect);
        if(rect.top > 0 && rect.top < window.innerHeight + offset &&rect.left >0 && rect.right>0){
            // console.log(true);
            return true;
        };
        // console.log(false);
        return false;
    }
    //判断元素是否加载过
    let isDeal = (ele)=>{
        // console.log(ele.src);
        // console.log(ele.dataset.src)
        return ele.src == ele.dataset.src;
    }
    let load = ()=>{
        nodes.forEach((item)=>{
            // console.log(item);
            if(inView(item) && !isDeal(item)){
                item.src = item.dataset.src;
            }
        })
    };
    load();
    document.querySelector(el).addEventListener('scroll',load);
}