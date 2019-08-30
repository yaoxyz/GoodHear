<template>
	<div>
		<van-nav-bar title="登录/注册" left-text="返回" left-arrow @click-left="onClickLeft" />
		<van-tabs type="line" animated color="black">
			<van-tab title="登录">
				<div class="loginreg">
					<van-cell-group>
						<van-field v-model="lusername" required clearable label="用户名" right-icon="question-o" placeholder="请输入用户名"
						 @click-right-icon="$toast('question')" />
						<van-field v-model="lpassword" type="password" label="密码" placeholder="请输入密码" required />
					</van-cell-group>
					<van-button type="primary" size="large" @click="login" class="loginbtn" style="100%">登&nbsp;&nbsp;&nbsp;录</van-button>
				</div>
			</van-tab>


			<van-tab title="注册">
				<div class="loginreg">
					<van-cell-group>
						<van-field v-model="ruseremail" required clearable label="邮箱" placeholder="请输入邮箱" />
						<van-field v-model="rusername" required clearable label="用户名" placeholder="请输入用户名" />
						<van-field v-model="rpassword" type="password" label="密码" placeholder="请输入密码" required />
					</van-cell-group>
					<van-button type="info" size="large" style="100%" @click="register">注&nbsp;&nbsp;&nbsp;册</van-button>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import router from '../router.js'
	import qs from 'qs'
	import {
		Toast
	} from 'vant';
	import {
		postRegister,
		postLogin
	} from '../request.js'
	export default {
		data() {
			return {
				lusername: "",
				lpassword: "",
				ruseremail: "",
				rusername: "",
				rpassword: ""
			}
		},
		methods: {
			// 返回按钮
			onClickLeft() {
				history.back();
			},
			// 登录请求
			login() {
				var obj = {
					method: "Post",
					url: "/api/login",
					params: {
						username: this.lusername,
						password: this.lpassword
					}
				};
				postLogin(obj).then(response => {
					console.log(response);
					localStorage.setItem("userInfo", JSON.stringify(response));
					Toast(response);
					if (response[0].msg == "登陆成功") {
						Toast(response[0].msg);
						setTimeout(function() {
							router.push({
								path: decodeURIComponent("/")
							});
						}, 1000);
					}
				}).catch(function(error) {
					Toast(error);
				});
			},
			// 注册请求
			register() {
				var obj = {
					method: "Post",
					url: "/api/register",
					params: {
						email: this.ruseremail,
						username: this.rusername,
						password: this.rpassword
					}
				};
				postRegister(obj).then(response => {
					Toast(response);
					// 注册成功赋值给登录界面
					if (response == "注册成功") {
						this.lusername = this.rusername;
						this.lpassword = this.rpassword;
					}
				}).catch(function(error) {
					Toast(error);
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.van-tabs {
		/* margin-top:20px; */
	}

	.van-tab__pane-wrapper {
		margin-top: 20px;
	}

	.van-button {
		margin-top: 20px;
	}

	.loginreg {
		width: 92%;
		margin: 0 auto;
	}

	.loginbtn {
		margin-top: 30px;
	}

	.van-button--warning {
		background-color: #ff976a !important;
	}

	.van-button--primary {
		background-color: #07c160 !important;
	}

	.van-button--info {
		color: #fff;
		background-color: #1989fa !important;
		border: 1px solid #1989fa;
	}
</style>
