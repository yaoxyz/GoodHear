import Vue from 'vue'
import Router from 'vue-router'

import Home from "./views/Home.vue"
import Fenlei from "./views/Fenlei.vue"
import Zuoping from "./views/Zuoping.vue"
import Bofang from "./views/Bofang.vue"
import ZuopingDetail from "./views/ZuopingDetail.vue"
import Login from './views/Login.vue'
import PersonUpdate from './views/PersonUpdate.vue'


Vue.use(Router)


export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/fenlei/zuoping/:type/:id',
			name:"Zuoping",
			component: Zuoping
		},
		{
			path: '/zuoping/zuopingdetail/:type/:id',
			name: 'ZuopingDetail',
			component: ZuopingDetail
		},
		{
			path: '/zuopingdetail/bofang/:idx/:id',
			name: 'bofang',
			component: Bofang
		},
		{
			path: "/login",
			name:"login",
			component: Login
		},
		{
			path: '/person/update',
			name:"personupdate",
			component: PersonUpdate
		}
	]
})
