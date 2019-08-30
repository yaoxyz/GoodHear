<template>
	<div id="app">
		<van-tabs type="line" background="#1989FA" title-active-color="#FFF" title-inactive-color="#f1f2f6" color="#FFF"
		 line-height="0px" v-model="activeName" sticky animated @click="getName">
			<!-- 推荐tab -->
			<van-tab title="推荐" name="a">
				<!-- 包含轮播组件 -->
				<LUNBO :imgList="imgList"></LUNBO>
				<!-- 刷新 -->
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
					<div style="background: #FFFFFF;width: 100%;height: auto;">
					<!-- 宫格组件 -->
					<van-grid style="box-shadow: 0px -1px 10px #00000036;">
						<!-- 测试跳转play页面 -->
						<router-link to="fenlei/zuoping/青春校园/38959">
							<van-grid-item icon="friends" text="青春校园" />
						</router-link>
						<router-link to="fenlei/zuoping/郭德纲/38963">
							<van-grid-item icon="point-gift" text="郭德纲" />
						</router-link>
						<router-link to="fenlei/zuoping/单田芳/38965">
							<van-grid-item icon="service" text="单田芳" />
						</router-link>
						<router-link to="fenlei/zuoping/内涵段子/106">
							<van-grid-item icon="star" text="内涵段子" />
						</router-link>
					</van-grid>

					<!-- listhot列表组件 -->
					<div @click="goListDetail" style="margin-top: 10px;">
						<LISTHOT :dataList="dataList" :pagehot="pageHot" @func="getPageHot" @fu="getid"></LISTHOT>
					</div>
					</div>
				</van-pull-refresh>

			</van-tab>

			<!-- 分类tab -->
			<van-tab title="分类" name="b">
				<!-- 分类内容请填这儿 -->
				<Fenlei></Fenlei>
			</van-tab>


			<!-- 个人中心tab -->
			<van-tab title="私人" name="c">
				<PERSON></PERSON>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
	var activeNa = "";
	import LUNBO from '../components/Lunbotu.vue'
	import LISTHOT from '../components/Listhot.vue'
	import PERSON from '../views/Person.vue'
	import Fenlei from '../views/Fenlei.vue'
	import axios from 'axios'
	import {
		getRecommendList
	} from '../request.js';
	import {
		getZuopingList
	} from "../request.js";
	export default {
		data() {
			return {
				activeName: this.$store.state.active,
				listsdata: [],
				imgList: [],
				dataList: [],
				pageHot: 1,
				isLoading: false,
				hotId: ""
			};
		},
		components: {
			LUNBO,
			LISTHOT,
			PERSON,
			Fenlei
		},
		created() {
			this.getRecommend();
			this.getZuoping()
		},
		mounted() {
			// 强制修改伪类样式
			document.getElementsByClassName("van-hairline--top-bottom")[0].classList.remove("van-hairline--top-bottom");
			// 复写样式,尽量避免对其他样式的修改
			document.getElementsByClassName("van-tabs__wrap")[0].classList.add("mytabForceStyle");
		},
		methods: {
			getName() {
				//console.log(this.activeName)
				activeNa = this.activeName;
				this.$store.commit("postName", activeNa);
			},
			getid(id) {
				this.hotId = id
			},
			goListDetail() {
				this.$router.push('/zuoping/zuopingdetail/' + "全部专辑" + "/" + this.hotId)
			},
			onRefresh() {
				setTimeout(() => {
					// this.$toast('刷新成功');
					this.isLoading = false;
					this.finished = false;
					this.count++;
					this.onLoad()
				}, 500);
			},
			getPageHot(pageindex) {
				this.pageHot = pageindex;
				this.getZuoping();
			},
			getZuoping() {
				var obj = {
					method: "Get",
					url: "https://api.imjad.cn/qqfm/v1/?type=album&page_size=10&id=39092" + "&page=" + this.pageHot
				}
				getZuopingList(obj).then(data => {
					// console.log(data)
					//console.log(data.data.albumInfoList[0].album.albumID)
					if (data.data.albumInfoList == 0) {
						Toast('提示内容');
					}
					this.dataList = this.dataList.concat(data.data.albumInfoList);
				})
			},

			getRecommend() {
				getRecommendList().then(data => {
					//console.log(data)
					for (var i = 0; i < 4; i++) {
						var list = data.data.albumInfoList[i].album.cover.urls[0].url;
						this.imgList.push(list)
					}
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.mytabForceStyle {
		position: absolute;
		box-sizing: border-box;
		content: ' ';
		pointer-events: none;
		top: -50%;
		right: -50%;
		bottom: -50%;
		left: -50%;
		border: none;
		-webkit-transform: scale(.5);
		transform: scale(.5);
		box-shadow:0px 4px 10px rgba(25, 137, 250, 0.37);
	}

	.mytabForceStyle::after {
		border-width: 0px;
	}

	.van-grid-item {
		color: #1989FA;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter,
	.fade-leave-to

	/* .fade-leave-active below version 2.1.8 */
		{
		opacity: 0;
	}

	.van-grid a {
		width: 25%;
	}
</style>
