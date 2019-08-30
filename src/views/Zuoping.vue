<template>
	<div>

		<van-nav-bar :title="title" left-text="返回" @click-left="onClickLeft" left-arrow />
		<div @click="goListDetail">
			<LIST :listDetail="listDetail" :pageList="page" @func="getPage" @updata="getId" ></LIST>
		</div>
		<!-- </router-link> -->
	</div>
</template>

<script>
	import {
		getZuopingList
	} from "../request.js";
	import LIST from "../components/List.vue";
	export default {
		data() {
			return {
				id: this.$route.params.id,
				type: this.$route.params.type,
				page: 1,
				title: this.$route.params.type,
				listDetail: [],
				ListId:""
			}
		},
		components: {
			LIST
		},
		created() {
			this.getZuoping();
			// console.log(this.page)
		},
		methods: {
			getId(LiId){
				this.ListId=LiId;
				// console.log(this.ListId);
			},
			getPage(pageindex) {
				this.page = pageindex;
				this.getZuoping();
			},
			goListDetail(){
				this.$router.push('/zuoping/zuopingdetail/'+this.type+"/"+this.ListId)
			},
			//返回上一级页面
			onClickLeft() {
				history.back();
			},
			getZuoping() {
				var obj = {
					method: "Get",
					url: "https://api.imjad.cn/qqfm/v1/?type=album&page_size=10&id=" + this.id + "&page=" + this.page
				}
				getZuopingList(obj).then(data => {
					// console.log(data)
					if (data.data.albumInfoList == 0) {
						
					}
					this.listDetail = this.listDetail.concat(data.data.albumInfoList);
					//console.log(data.data.albumInfoList)
				})
			},
		},
	}
</script>

<style>
	
</style>
