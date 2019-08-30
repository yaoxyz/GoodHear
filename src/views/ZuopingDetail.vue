<template>
	<div>
		<div id="listcontent">
			<van-nav-bar :title="title" left-text="返回" @click-left="onClickLeft" left-arrow />
			<div class="top" v-for="(item,index) in listDetile" :key="index">
				<div v-if="index==1" class="contain_top">
					<div class="backimg">
						<img :src="item.show.share.covers.urls[1].url">
					</div>
					<div class="title">
						<h1>{{item.album.name}}
							<van-tag plain>独家</van-tag>
						</h1>
					</div>
					<div class="jianjie">
						<div class="xiaotu">
							<img :src="item.show.share.covers.urls[3].url" alt="">
						</div>
						<div class="zhubo">
							<span class="mingzi">主播:{{item.show.owner.nickname}} </span><br>
							<span class="fenshu">{{item.album.score | numFilter}}分&nbsp;&nbsp;|&nbsp;&nbsp;{{item.album.owner.timestamp|dateFormat}}</span><br>
							<span class="zuoping">作品简介:{{item.album.desc}}</span><br>
						</div>
					</div>
					<van-notice-bar :scrollable="true">
						{{item.album.share.weiboSummary}}
					</van-notice-bar>
				</div>
			</div>

			<div class="center">
				<van-tabs v-model="active">

					<van-tab title="详情">
						<div class="neirong" v-for="(item,index) in listDetile" :key="index">
							<!-- 为详情获取一条数据 -->
							<div v-if="index==2" class="zuozhe">
								<span>作者简介:</span><br>
								<img :src="item.album.owner.logo" alt="">
								<p>{{item.show.owner.desc}}</p>
							</div>
						</div>
					</van-tab>
					<van-tab title="节目">
						<div @click="goBofang" style="margin-top: 10px;">
							<!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
							<van-list v-for="(item,index) in listDetile" :key="item.show.showID" @load="onLoad" >
								<van-cell @click="getId(item.show.showID,index)">
									<img :src="item.show.share.covers.urls[3].url" alt class="myimg" />
									<div class="list">
										<h3>{{item.show.name}}</h3>
										<div class="list-bottom">
											<span>播放次数：{{item.show.audioURL.urls[0].size}}</span>
											<span class="hot">
												<van-icon name="play-circle-o" size=25px />
											</span>
										</div>
									</div>
								</van-cell>
							</van-list>
							<!-- </van-pull-refresh> -->
						</div>
					</van-tab>
					<van-tab title="评论">
						<comment></comment>
					</van-tab>
				</van-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import comment from "../components/Comment.vue";
	import {
		getListUrls
	} from "../request.js";
	import {
		getListUrlsDetail
	} from "../request.js";
	var UrlsList = [];
	var detailId = "";
	let listobj = {};
	var length;
	var end;
	var str;
	var newStr=[];
	export default {
		components: {
			comment
		},
		data() {
			return {
				id: this.$route.params.id,
				type: this.$route.params.type,
				UrlsListDetail: [],
				active: 0,
				listDetile: [],
				listDetileOne: [],
				detailId: "",
				idx: "",
				title: "",
				start: 0
			}
		},
		beforeCreate() {

		},
		created() {
			this.getUrls();
			detailId = this.id;
			//console.log(this.type)
		},
		//格式化时间
		filters: {
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		methods: {
			onLoad() {

				//上拉加载
				setTimeout(() => {
					this.loading = false;
				}, 500);
				this.getUrls();
			},


			//曲播放页
			goBofang() {
				this.$router.push("/zuopingdetail/bofang/" + this.idx + "/" + this.detailId);
				var need = [];
				for (var i = 0; i < this.listDetile.length; i++) {
					var myNeed = {
						name: this.listDetile[i].show.name,
						share: this.listDetile[i].show.share,
						url: this.listDetile[i].show.audioURL.urls
					}
					need.push(myNeed)
				}
				//console.log(need)
				this.$store.commit("getMyNeed", need)
			},
			//获取点击作品id
			getId(id, index) {
				this.detailId = id;
				this.idx = index;
			},
			//返回上一级页面
			onClickLeft() {
				history.back();
			},
			//获取具体作品列表url
			getUrls() {
				var obj = {
					method: "Get",
					url: "https://api.imjad.cn/qqfm/v1/?type=show&id=" + this.id
				};
				getListUrls(obj).then(data => {
						length = 10;
						end = this.start + length;
						str = data.slice(this.start, end);
						newStr = str.join(",");
						// console.log(newStr, "xxx");
						this.getDetail();
				})
			},
			// 获取单个作品
			getDetail() {
				
				var obj = {
					method: "Get",
					url: "https://api.imjad.cn/qqfm/v1/?type=skip_show&id=" + detailId + "&shows=" + newStr,
				};
				getListUrlsDetail(obj).then(data => {
					if (data) {
						//学会用下面的解决异步请求不到showList的数据与(item.album && item.album.albumID)一个道理
						if (data.data && data.data.showList) {
							for (let i in data.data.showList) {
								this.listDetile.push(data.data.showList[i]);
							}
						} else {
							this.finished = true;
							console.log("没有更多数据了");
							return;
						}
					} else {
						this.showLists = [];
					}
				})
				this.start=end;
			},
			mounted() {
				let winHeight = document.documentElement.clientHeight //视口大小
				document.getElementById('listcontent').style.height = (winHeight)-300+ 'px' //调整上拉加载框高度
			}
		},
	}
</script>

<style lang="less" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.contain_top {
		width: 100%;
		margin: 0 auto;
	}

	h1 {
		font-size: 24px;
		font-weight: bold;
	}

	.title {
		height: 50px;
		width: 100%;
		padding-top: 20px;
	}

	.jianjie {
		padding-left: 20px;
		display: flex;
		direction: row;

	}

	.zuozhe {
		padding-top: 10px;
	}

	.zhubo {
		//padding-left: 40px;
		display: flex;
		flex-direction: column;
	}

	.backimg img {
		position: fixed;
		opacity: 0.1;
		width: 100%;
		height: 210px;
	}

	.zuozhe img {
		height: 80px;
		width: 80px;
		float: left;
		border-radius: 50%
	}

	.zuoping {
		width: 200px;
		height: 20px;
		overflow: hidden;
	}



	.mingzi {
		font-size: 18px;
		font-weight: bold;
	}


	.img {
		padding: 35px 30px;
	}

	.van-button__icon {
		color: aliceblue;
		font-size: 2.2em;
	}

	//内容样式
	.neirong span {
		display: block;
		height: 30px;
		width: 100%;
		font-size: 22px;
		font-weight: bold;
		color: rgb(202, 190, 190);
	}


	.neirong p {
		font-family: "微软雅黑";
		font-size: 18px;
		color: gray;
	}

	//节目样式
	.van-list {
		background-color: white;
	}

	.van-cell__value {
		display: flex;
		align-items: center;
	}

	.myimg {
		width: 60px;
		height: 60px;
	}

	.list {
		margin-left: 20px;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.center {
		font-size: 3px;
		padding-left: 5px;
		padding-right: 5px;
		border-top: 1px solid #ccc;
	}

	.van-icon {
		color: red;
	}

	.list-bottom {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.hot {
		position: absolute;
		top: -30px;
		right: 10px;
	}

	//评论样式
	.cmt-container {
		h3 {
			font-size: 18px;
		}

		textarea {
			font-size: 14px;
			height: 85px;
			margin: 0;
		}

		.cmt-list {
			margin: 5px 0;

			.cmt-item {
				font-size: 13px;

				.cmt-title {
					line-height: 30px;
					background-color: #ccc;
				}

				.cmt-body {
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}

	.van-button {
		margin-top: 30px;
		width: 100%;
		height: 50px;
		opacity: 0.8;
		background-color: gray;
	}
</style>
