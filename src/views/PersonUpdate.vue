<template>
	<div>
		<van-nav-bar title="用户信息修改" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div v-if="flag">
			<div class="y-top">
				<div>
					<van-image width="80px" height="80px" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
				</div>
				<div>
					<van-uploader class="y-xiang" multiple :max-count="2" />
				</div>
				
			</div>
			<h3 style="color: black;font-size: 16px; text-align: center;">{{user[1].username}}</h3>
			<van-cell-group>
				<van-cell-group>
					<van-field label="用户名" placeholder="修改用户名" v-model="newName" />
					<van-field label="密码" placeholder="修改密码" v-model="newPassword" />
				</van-cell-group>

				<div class="gender">
					<div style="flex:3;display: flex;justify-content: center;">
						<span>修改性别</span>
					</div>
					<div style="flex:7;margin-left: 30px;">
						<van-radio-group v-model="newGender">
							<van-radio name="0"  class="goright">男</van-radio>
							<van-radio name="1"  class="goright">女</van-radio>
							<van-radio name="-1" class="goright">未知</van-radio>
						</van-radio-group>
					</div>

				</div>
			</van-cell-group>
			<van-button type="warning" size="large" @click="updateUserInfo" style="width: 100% !important;background: #FF976A !important;">确认修改</van-button>
		</div>
		<div v-else></div>
	</div>
</template>

<script>
	import {
		deepCopy
	} from '../utils/utils.js'
	import {
		postEditUserInfo
	} from '../request.js'
	import qs from 'qs'
	import {
		Toast
	} from 'vant';
	export default {
		data() {
			return {
				user: [],
				flag: false,
				newName: "",
				newPassword: "",
				newGender: -1,
				headpicUrl: ""
			}
		},
		created() {
			this.getUser();
			var _that = this;
		},
		methods: {
			onClickLeft() {
				history.back();
			},
			getUser() {
				let userInfo = localStorage.getItem("userInfo"),
					userInfoObj = JSON.parse(userInfo);
				if (userInfo == null) {
					this.flag = false;
				} else {
					this.flag = true;
					this.user = deepCopy(userInfoObj);
				}
			},
			updateUserInfo() {
				var obj = {
					method: "Post",
					url: "/api/userinfo/edit",
					params: {
						_id: this.user[1]._id,
						newUserName: this.newName,
						newUserPassword: this.newPassword,
						newUserGender: this.newGender,
						headpicUrl: ""
					}
				};
				if (this.newName != '' && this.newPassword != '') {
					postEditUserInfo(obj).then(response => {
						Toast(response);
						console.log(response);
						if (response[0].msg == "修改成功") {
							Toast(response[0].msg);
							localStorage.setItem("userInfo", JSON.stringify(response));
							setTimeout(function() {
								_that.getUser();
							}, 1500);
							setTimeout(function() {
								location.reload();
							}, 2000)
						}
					})
				} else {
					Toast("请勿输入空字符串");
				}
			}
		}

	}
</script>

<style lang="less" scoped>
	.y-top {
		display: flex;
		flex: 2;
		justify-content: center;
		width: 100%;
		padding-top: 20px;
	}

	.y-tou {
		padding-left: 10px;
	}

	.gender {
		width: 100%;
		height: 40px;
		display: flex;
	}

	.gender div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goright{
		margin-left: 10px;
	}
</style>
