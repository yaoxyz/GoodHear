import axios from 'axios';
import QS from 'qs';

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//对外接口
export function myaxios({
	method,
	url,
	params
}) {
	if (method == 'Get') {
		return get(url, params);
	} else if (method == 'Post') {
		return post(url, params);
	}
}

// 封装get方法
function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, params).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data);
		})
	});

}

// 封装post方法
function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params)).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data);
		})
	});
}
