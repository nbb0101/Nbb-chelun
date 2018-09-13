const sendRequest = (url,method='GET',data={})=>{
    //处理url，添加时间戳，保证每次请求不会有缓存
    if(/\?/.test(url)){
        url += '&_' + (+new Date());
    }else{
        url += '?_' + (+new Date());
    }
    let params = {method};
    //判断请求是否属于post
    if(method === 'POST'){
        params.data = JSON.stringify(data);
    }
    console.log(url,params);
    return fetch(url,params).then(res=>res.json());
};
const host = /localhost:8080/ig.test(window.location.host) ? 'http://baojia.chelun.com' :
  'https://baojia.chelun.com';

/**
 * 获取短信验证码
 * * @param phone 用户手机号
 * @return promise 返回一个promise
 */
export const getCapture = (phone) => {
    console.log(phone);
  return sendRequest('http://169.254.89.255:8888/getCapture','POST',{phone});
};
/**
 * 获取车辆品牌列表
 * @return promise 返回一个promise
 */
export const getBrandList = ()=>{
    return sendRequest(`${host}/v2-car-getMasterBrandList.html`);
};
/**
 * 获取车系列表
 * @param id 车系id
 * @return promise 返回一个promise
 */
export const getCarType = (id) =>{
    return sendRequest(`${host}/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
};
/**
 * 获取车系详情
 * @param id   车系id
 * @return promise 返回一个promise
 */
export const getCarInfo = (id) =>{
    return sendRequest(`${host}/v2-car-getInfoAndListById.html?SerialID=${id}`);
};

/**
 * 获取车系图片分类列表
 * @param id   车系id
 * @param colorId   颜色id(可选)
 * @param carId     车型id(可选)
 * @return promise 返回一个promise
 */
export let getImageList = (id, colorId, carId) => {
    let search = `SerialID=${id}`;
    if (colorId) {
        search += `&ColorID=${colorId}`;
    };
    if (carId) {
        search += `&CarID=${carId}`;
    };
    return sendRequest(`${host}/v2-car-getImageList.html?${search}`);
};
/**
 * 获取车系具体类型图片列表
 * @param id   车系id
 * @param imgId 图片类型id
 * @param colorId   颜色id(可选)
 * @param carId     车型id(可选)
 * @param page  当前页码
 * @param pageSize 每页列表数量
 * @return promise 返回一个promise
 */
export let getImgDetailList = (id, imgId, colorId, carId, page = 1, pageSize = 30) => {
    let search = `SerialID=${id}&ImageID=${imgId}&Page=${page}&PageSize=${pageSize}`;
    if (colorId) {
        search += `&ColorID=${colorId}`;
    };
    if (carId) {
        search += `&CarID=${carId}`;
    };
    return sendRequest(`${host}/v2-car-getCategoryImageList.html?${search}`);
};
/**
 * 获取车系颜色分类
 * @param id   车系id
 * @return promise 返回一个promise
 */
export const getTypeColor = (id) =>{
    return sendRequest(`${host}/v2-car-getModelImageYearColor.html?SerialID=${id}`);
};
/**
 * 获取城市列表(如果传省份id返回城市列表，如果不传返回省份列表)
 * @param provinceId   省份id
 * @return promise 返回一个promise
 */
export let getCityList = (provinceId) => {
    let search = ``;
    if (provinceId) {
        search += `provinceid=${provinceId}`;
    }
    return sendRequest(`${host}/v1-city-alllist.html?${search}`)
}
/**
 * 获取经销商列表
 * @param carId     车型id
 * @param cityId    城市id
 * @return promise 返回一个promise
 */
export let getCarDetail = (carId, cityId) => {
    return sendRequest(`${host}/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`)
}

/**
 * 询问报价
 * @param carId         车型id
 * @param mobile        用户手机号
 * @param dealerIds     经销商id列表
 * @param location      用户所在城市
 * @param carname       选择车型的名字
 * @param locationid    用户所在城市id
 * @param name          用户的姓名
 * @param openUDID      设备号
 * @param flag          默认值1
 * @param orderTypeId   默认值1
 * @param channelId     默认值0
 * @return promise      返回一个pomise
 */
export let submit = (info) => {
    let search = ``;
    for (let item in info) {
        search += `&${item}=${info[item]}`;
    }
    return sendRequest(`${host}/h2-submit-lowprice.html?${search}`);
}

//https: //baojia.chelun.com/h2-submit-lowprice.html?carid=126282&mobile=17636641478&dealerids=3802004,3802006,50000001&location=%E5%8C%97%E4%BA%AC&carname=2018%E6%AC%BE%2030%E5%91%A8%E5%B9%B4%E7%89%88%2030%20TFSI%20%E8%BF%9B%E5%8F%96%E7%89%88&locationid=201&name=%E5%BF%AB%E5%9B%9E%E5%AE%B6&channelid=0&ordertypeid=1&flag=1&openUDID=2a945e30-dada-27fa-a6a1-9b72c9ff3fdf&appChannel=&os=android&app=&systemVersion=&appVersion=&model=&cl_from=null&_=1536637972201
//https://baojia.chelun.com/v2-dealer-alllist.html?carId=126282&cityId=201&_1536222015855
//https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&ColorID=19224&_1536222345745
//https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=2974&ImageID=6&Page=2&PageSize=30&_1536222576383