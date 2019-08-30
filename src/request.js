import {myaxios} from "./tools/myaxios.js";

//获取二级页面图片
export function getFirstListimg(){
	var obj = {
		method: "Get",
		url: "https://api.imjad.cn/qqfm/v1/?type=album&page_size=10&id=39092"
	};
	return myaxios(obj);
}
//获取作品列表信息
export function getZuopingList(obj){
	return myaxios(obj);
}
//获取首页图片轮播数据的方法
export function getRecommendList() {
	var obj = {
		method: "Get",
		url: "https://api.imjad.cn/qqfm/v1/?type=album&page_size=10&id=39087",
		parmas:""
	};
	return myaxios(obj);
}

//获取节目列表中的所有ID
export function getListUrls(obj){
	return myaxios(obj)
}
//获取节目列表中单个ID的内容
export function getListUrlsDetail(obj){
	return myaxios(obj)
}



// 用户注册请求
export function postRegister(obj) {
	return myaxios(obj);
}
//用户登录请求
export function postLogin(obj) {
	return myaxios(obj);
}
//修改用户信息请求
export function postEditUserInfo(obj){
	return myaxios(obj);
}
export function postUserFav(obj){
	return myaxios(obj);
}