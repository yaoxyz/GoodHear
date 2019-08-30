<template>

	<div class="fenlei">
		<!-- 水平方向滑动 -->
		<div class="myslider">
			<div class="myslider-wrapper">
				<div class="myslider-item" v-for="(item,index) in imgList" :key="index">
					<img :src="item" />
				</div>
			</div>
		</div>

<!-- 		<div ref="msbox" class="my-swipe-box">
			<div ref="mswrapper" class="my-swipe-wrapper">
				<div class="my-swipe-item">

				</div>
				<div class="my-swipe-item">

				</div>
				<div class="my-swipe-item">

				</div>
			</div>
		</div> -->

		<!-- 二级分类 -->
		<van-tabs line-height="40px" style="margin-top: 10px;" type="card" animated
		 title-active-color="white" title-inactive-color="#1989FA" v-model="activeName" color="#1989FA" @click="getSecondActiveName">
			<van-tab title="有声小说" name="A">
				<van-grid :border="false" :column-num="3">
					<van-grid-item v-for="item in channelList2" :key="item.id">
						<div class="bordsize" @click="goDetail(item.id,item.type)">{{item.type}}</div>
						</router-link>
					</van-grid-item>
				</van-grid>
			</van-tab>

			<van-tab title="相声曲艺" name="B">
				<van-grid :border="false" :column-num="3">
					<van-grid-item v-for="item in channelList3" :key="item.id">
						<div class="bordsize" @click="goDetail(item.id,item.type)">{{item.type}}</div>
					</van-grid-item>
				</van-grid>
			</van-tab>

			<van-tab title="搞笑段子" name="C">
				<van-grid :border="false" :column-num="3">
					<van-grid-item v-for="item in channelList9" :key="item.id">
						<div class="bordsize" :data-set="item.type" @click="goDetail(item.id,item.type)">{{item.type}}</div>
					</van-grid-item>
				</van-grid>
			</van-tab>
		</van-tabs>


	</div>
</template>


<script>

	var secondActiveName = "";
	import {
		getFirstListimg
	} from "../request.js";
	import database from "../../static/database.js";
	import LUNBO from '../components/Lunbotu.vue';
	export default {
		data() {
			return {
				activeName: this.$store.state.secondActive,
				id: [],
				channelList2: [],
				channelList3: [],
				channelList9: [],
				loading: false,
				finished: false,
				page: 1,
				flag: 1,
				imgList: [],
				activeKey: 0
			}
		},
		component: {
			LUNBO
		},
		created() {
			this.getMssage();
			this.getList();
		},
		mounted() {
			// this.$refs.msbox.style.height = parseInt(screen.height - 200) + 'px';
			// this.$refs.mswrapper.style.height = parseInt(screen.height - 200) + 'px';
			// this.$refs.mswrapper.style.width = parseInt(screen.width * 3) + 'px';

		},
		computed: {

		},

		methods: {
			getSecondActiveName() {
				secondActiveName = this.activeName;
				this.$store.commit("postSecondName", secondActiveName);
			},
			getMssage() {
				//获取三个大类中的小类
				this.channelList2 = database[2].list;
				this.channelList3 = database[3].list;
				this.channelList9 = database[9].list;
			},
			getList() {
				getFirstListimg().then(data => {
					var list = data.albumInfoList;
					for (var i = 0; i < 10; i++) {
						var list = data.data.albumInfoList[i].album.cover.urls[0].url;
						this.imgList.push(list)
					}
				})
			},

			goDetail(id, type) {
				this.$router.push("/fenlei/zuoping/" + type + "/" + id)
			},
			onClickNav(index) {
				this.mainActiveIndex = index;
			},
			onClickItem(data) {
				this.activeId = data.id;
			}
		}
	}
</script>

<style lang="less" scoped>
	
	
	::-webkit-scrollbar {
		height: 0px;
	}
	

	.myslider {
		width: 100%;
		height: 150px;
		overflow-x: scroll;
	}

	.myslider-wrapper {
		width: 1600px;
		height: 150px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.myslider-item {
		width: 130px;
		height: 130px;
	}

	.myslider-item img {
		width: 130px;
		height: 130px;
		border-radius: 12px;
		box-shadow: 1px 1px 10px #0000004a;
	}

	.my-swipe-box {
		width: 100%;
		background-image: url();
		position: relative;
		overflow-y: scroll;
	}

	.my-swipe-box .my-swipe-wrapper {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.my-swipe-box .my-swipe-wrapper .my-swipe-item {
		width: 30%;
		height: 90%;
		background-color: salmon;
		box-shadow: 2px 2px 20px #00000026;
		border-radius: 12px;
	}


	.sbody {
		position: relative;
		height: 400px;
	}

	.sbody {
		background: #eee;
		font-size: 14px;
		color: #000;
		margin: 0;
		padding: 0;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		transition: 300ms;
	}

	.swiper-slide:not(.swiper-slide-active) {
		transform: scale(0.8);
	}


	.swiper-slide img {
		width: 100%;
		height: auto;
	}
</style>
