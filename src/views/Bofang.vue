<template>

	<div id="playbox">
		<van-nav-bar :title="this.$store.state.myNeedList[this.idx].name" left-text="返回" right-text="分享" left-arrow
		 @click-left="onClickLeft" @click-right="onClickRight" />
		<div class="albumimg">
			<div class="ratebar" ref="myflip" style="transition: all .6s linear;">
				<van-circle v-model="currentRate" :rate="100" :speed="100" :text="text" size="300px" :stroke-width="20" layer-color="#e4e4e4"
				 style="display: flex;justify-content: center;align-items: center;">
					<img :src="this.$store.state.myNeedList[this.idx].share.cover" alt="" ref="imgIsrotate" class="" />
				</van-circle>
			</div>
		</div>

		<div class="playbar">
			<div class="play-progress">
				<van-slider v-model="pencent" @change="onChange" bar-height="5px" />
				<!-- <van-progress :percentage="pencent" :show-pivot="false" /> -->
			</div>
			<div class="bar">
				<div class="back" @click="replay">
					<van-icon name="replay" size="48px" color="#1989FA" style="position: relative;">
						<span v-show="flag1"></span>
						<span v-show="!flag1" style="font-size: 14px; position: absolute;top: 18px;left: 20px;">1</span>
					</van-icon>

				</div>
				<div class="now" @click="play">
					<van-icon v-show="flag" name="play-circle-o" size="80px" color="#1989FA" />
					<van-icon v-show="!flag" name="pause-circle-o" size="80px" color="#1989FA" />
				</div>
				<div class="next" @click="nextGood">
					<van-icon name="arrow" size="48px" color="#1989FA" />
				</div>
			</div>

			<div class="opt">
				<div @click="like">
					<van-icon v-show="flag2" name="like-o" size="32px" />
					<van-icon v-show="!flag2" name="like" size="32px" color="#ff0000" />
				</div>
				<div>
					<van-icon name="info-o" size="32px" />
				</div>
				<div>
					<van-icon name="comment-o" size="32px" />
				</div>
			</div>
		</div>
		<van-divider />
		
		<!-- <div class="cav" style="position: fixed;bottom: 55px;width: 360px;height: 280px; background-color: #00000000;">
			<canvas id="canvas" width="360px" height="100px"></canvas>
		</div>
		<div id="typ">
			<span><input type="radio" name="drawstyle" hidden="hidden" value="1" checked="checked"></span>
		</div> -->
		<!-- <audio id="audio" controls="controls" src="./songs/Twisted%20Jukebox%20-%20Angels%20Will%20Rise.mp3"></audio> -->

		<audio id="audio" ref="audio" :src="this.$store.state.myNeedList[this.idx].url[0].url"></audio>

	</div>
</template>

<script>
	import {
		postUserFav
	} from '../request.js'
	import Toast from 'vant'
	import {
		deepCopy
	} from '../utils/utils.js'

	var historys = [];
	var getAllDetails = [];
	export default {
		data() {
			return {
				idx: this.$route.params.idx,
				user: [],
				currentRate: 0,
				pencent: 0,
				flag: true,
				flag1: true,
				flag2: true,
				audio: Object
			};
		},
		created() {
			var _that = this;
			//this.getUser();
			//getAllDetails=this.$store.state.myNeedList;
			//console.log(getAllDetails)
		},
		computed: {
			text() {
				return this.currentRate.toFixed(0) + '%'
			}
		},
		methods: {
			getUser() {
				var userInfo = {},
					userInfo = localStorage.getItem("userInfo");
				// console.log(userInfo);
				if (userInfo == null) {
					Toast("您现在处于未登录状态");
				} else {
					var userInfoObj = JSON.parse(userInfo);
					this.user = deepCopy(userInfoObj);
				}
			},
			nextGood() {
				if (this.idx < 9) {
					++this.idx;
					//console.log(this.idx)
					this.$store.commit("getIdx", this.idx)
				}
				
				var audio2 = this.$refs.audio;
				this.flag = true;
				if (audio2.paused) {
					audio2.play();npm 
					this.flag = false;
					this.$refs.imgIsrotate.classList.add("rotateAni");
					console.log(audio2);
				} else {
					audio2.pause();
					this.$refs.imgIsrotate.classList.remove("rotateAni");
				}
				audio.ontimeupdate = () => {
					console.log(this.$refs.audio.currentTime);
					this.currentRate = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
					this.pencent = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
				}

			},
			onClickLeft() {
				history.back();
			},
			onClickRight() {},

			onChange() {
				this.$refs.audio.currentTime = (this.pencent / 100) * this.$refs.audio.duration;
			},
			// 播放功能异常
			play() {
				//历史播放记录 OK
				if (this.flag == true) {
					var obj = {
						name: this.$store.state.myNeedList[this.$store.state.index].name,
						imgurl: this.$store.state.myNeedList[this.$store.state.index].share.cover,
						desc: this.$store.state.myNeedList[this.$store.state.index].share.summary
					};
					historys.push(obj);
					this.$store.commit("getHistory", historys);
				}



				// console.log(this.flag);
				var audio = this.$refs.audio;
				this.flag = !(this.flag);
				if (audio.paused) {
					audio.play();
					this.$refs.imgIsrotate.classList.add("rotateAni");
					// console.log(audio);
				} else {
					audio.pause();
					this.$refs.imgIsrotate.classList.remove("rotateAni");
				}
				audio.ontimeupdate = () => {
					// console.log(this.$refs.audio.currentTime);
					this.currentRate = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
					this.pencent = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
				}
			},

			//收藏
			like() {
				this.flag2 = !(this.flag2);
				// 判断是否登录
				// 已登录可以收藏,未登录提示登录后才可以收藏
				if (this.user.length != 0) {
					this.dofav(); //完整数据下调用
					// this.dofav2(); //测试使用
				} else {
					Toast("请登录后重试");
				}

			},
			// 收藏
			dofav() {
				var obj = {
					method: "Post",
					url: "/api/fav",
					params: {
						_id: this.user[1]._id,
						fmTitle: this.$store.state.myNeedList[this.idx].name,
						fmPicUrl: this.$store.state.myNeedList[this.idx].share.cover,
						fmSrc: this.$store.state.myNeedList[this.idx].url[0].url
					}
				};
				postUserFav(obj).then(response => {
					// console.log("kk", response);
					localStorage.setItem("userInfo", JSON.stringify(response));
					if (response[0].msg == "收藏成功") {
						// console.log("收藏成功")
						Toast(response[0].msg);
						setTimeout(function() {
							_that.getUser();
						}, 1000);
					}
				}).catch(function(error) {
					console.log(error);
				});
			},

			//单曲循环
			replay() {
				this.flag1 = !(this.flag1);
			}
		}

	};
</script>

<style scoped>
	#playbox {
		width: 100%;
		perspective: 1000px;
	}

	.van-circle {
		/* box-shadow: 1px 1px 10px gray; */
	}

	.albumimg {
		width: 100%;
		height: 340px;
		display: flex;
		justify-content: center;
		align-items: center;


	}

	.ratebar {
		border-radius: 50%;
		width: 300px;
		height: 300px;
		position: relative;
		transform-style: preserve-3d;
	}

	.ratebar img {
		border-radius: 50%;
		width: 278px;
		height: 278px;

	}

	.playbar {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.playbar .play-progress {
		width: 70%;
		margin: 0 auto;
	}

	.playbar .bar {
		width: 300px;
		display: flex;
		margin: 0 auto;
		margin-top: 12px;
	}

	.playbar .bar div {
		flex: 1;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.opt {
		width: 296px;
		display: flex;
		margin: 0 auto;
		margin-top: 10px;
	}

	.opt div {
		flex: 1;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rotateAni {
		animation: 15s rAni infinite linear;
	}

	@keyframes rAni {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
