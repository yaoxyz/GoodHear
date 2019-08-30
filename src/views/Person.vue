<template>
	<div class="person">
		<div class="head">
			<div class="headbgimg"></div>
			<div v-if="flag" style="display: flex;flex-direction: column;margin-top: 32px;align-items: center; height:210px">
				<img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" style="width: 60px;height: 60px;border-radius: 50%;">
				<div class="center">
					<p style="color: black;font-size: 20px;margin: 4px;">{{user[1].username}}</p>
					<div>
						<span style="color: black;font-size: 12px;">性别:&nbsp;{{tgender}}</span>
					</div>
				</div>



				<router-link to="/person/update">
					<van-button round type="primary" size="small" style="position: absolute;left: 50%;bottom: 10px;width: 60px;transform: translateX(-50%);">修改</van-button>
				</router-link>


			</div>
			<div v-else>
				<div class="div">
					<div class="user">
						<van-icon size="40px" color="white" name="user-o" />
					</div>
				</div>
				<router-link to="/login" style="width: 100%;">
					<div class="div">
						<van-button round type="primary">立即登录</van-button>
					</div>
				</router-link>

				<!-- 测试查看 -->
				<!-- <router-link to="/person/update">
					<van-button round type="primary" size="small" style="position: absolute;right: 10px;bottom: 5px;">修改</van-button>
				</router-link> -->
			</div>

		</div>
		<div class="bottom">
			<van-collapse v-model="activeNames">
				<div class="bottom-list">
					<van-collapse-item icon="todo-list" title="历史记录" size="large" name="1">
						<!-- <div v-for="(item,index) in this.$store.state.histories" :key="index">
							<van-card :title="item.name" :desc="item.desc" :thumb="item.imgurl" />
						</div> -->
						<div class="slide-box">
							<div class="slide-item" v-for="(item,index) in this.$store.state.histories" :key="index">
								<img :src="item.imgurl" />
								<p>{{item.name}}</p>
							</div>
						</div>
					</van-collapse-item>
				</div>

				<div class="bottom-list">
					<van-collapse-item icon="star" title="我的收藏" size="large" name="2">
						<div v-if="flag">
							<div class="getImg">
								<!-- 收藏 -->
								<div v-for="(item,index) in user[1].favorite" :key="index">
									<van-card :desc="item.fmSrc" :title="item.fmTitle" :thumb="item.fmPicUrl" />
								</div>
							</div>
						</div>

						<div v-else>

						</div>
					</van-collapse-item>

				</div>
				<div class="bottom-list">
					<van-collapse-item icon="setting" title="设置" size="large" name="3">
						<van-collapse-item title="皮肤风格">酷炫黑金</van-collapse-item>
					</van-collapse-item>
				</div>
			</van-collapse>
		</div>

		<van-button type="warning" size="large" @click="logout" style="width: 100%;">退出</van-button>

	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import {
		deepCopy
	} from '../utils/utils.js'
	export default {
		data() {
			return {
				activeNames: ["0"],
				flag: false,
				user: [],
				tgender: "未知",
				favlist: []
			};
		},
		created() {
			this.getUser();
			var _that = this;
		},
		methods: {

			//获取用户信息
			getUser() {
				let userInfo = localStorage.getItem("userInfo"),
					userInfoObj = JSON.parse(userInfo);
				if (userInfo == null) {
					this.flag = false;
				} else {
					this.flag = true;
					this.user = deepCopy(userInfoObj);
					console.log(this.user);
					this.getGender(this.user[1].gender);
				}

			},
			// 获取性别并设置显示
			getGender(g) {
				console.log("ggg", g)
				switch (g) {
					case -1:
						this.tgender = "未知";
						break;
					case 0:
						this.tgender = "男";
						break;
					case 1:
						this.tgender = "女";
						break;
					default:
						break;
				}
			},
			// 退出操作
			logout() {
				this.flag = false;
				this.user = [];
				localStorage.clear();
			}
		}
	};
</script>

<style scoped>
	.head {
		width: 100%;
		height: 210px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		
	}
	.head .headbgimg{
		position: absolute;
		width: 100%;
		height: 210px;
		background-image: url(https://img.yzcdn.cn/vant/cat.jpeg);
		filter: blur(50px);
		z-index: -1;
		
	}

	.head .div {
		flex: 1;
		width: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.van-button {
		margin-top: 10px;
		width: 60%;
		/* opacity: 0.8; */
		/* background-color: red; */
	}

	.user {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 1px solid gray;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: gray;
	}

	.getImg {
		/* display: flex; */
		max-height: 400px;
		overflow-y: scroll;
	}

	.y_jieshao {
		margin-left: 60px;
		line-height: 30px;
	}

	.van-icon {
		color: black;
	}

	.history {
		display: flex;
		overflow: hidden;
	}

	/* .goout {
		margin-top: 80px;
		width: 80%;
		margin: 0 auto;
		border-radius: 40px;
	} */

	/* /加入 */

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}


	.slide-box {
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.slide-item {
		width: 100px;
		height: 100px;
	}

	.slide-item p {
		text-align: center;
		margin-top: -6px;
	}

	.slide-item img {
		height: 80%;
		width: 80%;
	}

	.van-button--warning {
		background-color: #ff976a !important;
	}
	.van-button--primary{
		background-color: #07c160 !important;
	}
</style>
