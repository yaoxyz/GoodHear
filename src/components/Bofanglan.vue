<template>
	<div class="dibu">
		<div class="myimg">
			<van-image width="74%" height="100%" fit='cover' :src="this.$store.state.myNeedList[this.$store.state.index].share.cover" />
		</div>
		<div class="minfo">
			<div>{{this.$store.state.myNeedList[this.$store.state.index].name}}</div>
			<p class="name">{{this.$store.state.myNeedList[this.$store.state.index].share.summary}}</p>
		</div>
		<div class="mplay">
			<div class="now" @click="play">
				<van-icon v-show="flag" name="play-circle-o" size="50px" color="#1989FA" />
				<van-icon v-show="!flag" name="pause-circle-o" size="50px" color="#1989FA" />
			</div>
		</div>
		<audio :src="this.$store.state.myNeedList[this.$store.state.index].url[0].url"></audio>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
			};
		},
		created() {

		},
		methods: {
			play() {
				//this.$store.commit("whatflag",this.flag)
				console.log(this.flag)
				this.flag = !this.flag;
			}
		}
	}
</script>
<style scoped>
	.dibu {
		background: #fff;
		border-radius: 10px 10px 0 0;
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: space-around;
		box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
	}

	.myimg {
		flex: 3;
		padding-left: 20px;

	}

	.myimg img {
		border-radius: 5px;
	}

	.mplay {
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.minfo {
		flex: 5;
		padding: 10px;
	}

	.minfo div {
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 200px;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.name {
		margin-top: 4px;
	}
</style>
