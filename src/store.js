import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState()],
  state: {
		myNeedList:[],
		flag:true,
		index:1,
		histories:[],
		active:"",
		secondActive:""
  },
  mutations: {
		getMyNeed(state,need){
			state.myNeedList=need;
		},
		getIdx(state,idx){
			state.index=idx;
			//console.log(idx);
		},
		getHistory(state,historys){
			state.histories=historys
			//console.log(historys)
		},
		//锁定以及tarBab
		postName(state,activeNa){
			state.active=activeNa;
			//console.log(activeNa)
		},
		postSecondName(state,secondActiveName){
			state.secondActive=secondActiveName;
		}
		
  },
  actions: {
		
  },
	
})
