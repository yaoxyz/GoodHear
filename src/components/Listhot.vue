<template>
	<div>
		<div id="list-content" class="list-content">
			<van-list :offset="10" v-model="loading" :finished="finished" @load="onLoad">
				<van-cell v-for="item in dataList" :key="item.album.albumId" v-if="item.album.owner.fansNum>10000" @click="getid(item.album.albumID)">
					<img :src="item.album.cover.urls[0].url" alt class="myimg" />
					<div class="list">
						<h3>{{item.album.name}}</h3>
						<div class="list-bottom">
							<span>{{item.album.score | numFilter}}分</span>
							<span class="center">|</span>
							<span>{{item.album.owner.nickname}}</span>
							<span class="hot">
								<van-icon name="fire" />
								{{item.album.owner.fansNum}}
							</span>
						</div>
					</div>
				</van-cell>
			</van-list>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		props: ['dataList', 'pagehot'],
		data() {
			return {
				isLoading: false,
				list: [],
				loading: false,
				finished: false,
				error: false,
				thisId: ""
			};
		},
		created() {
			//console.log(this.pageindex,"3333333");
		},
		methods: {
			getid(id) {
				this.thisId = id
				//console.log(id)
				this.$emit("fu", this.thisId)
			},
			onLoad() {
				//传给分类详情
				++this.pagehot;
				this.$emit('func', this.pagehot);

				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 40; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;
					// 数据全部加载完成
					if (this.list.length >= 600) {
						this.finished = true;
					}
				}, 300);
			},
		},

		filters: {
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		mounted() {
			let winHeight = document.documentElement.clientHeight //视口大小
			document.getElementById('list-content').style.height = (winHeight) + 'px' //调整上拉加载框高度
		}
	};
</script>

<style scoped>
	h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.van-cell {
		margin-bottom: 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	}

	.van-list {
		background-color: white;
	}

	.van-cell__value {
		display: flex;
		align-items: center;
	}

	.myimg {
		width: 70px;
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
		bottom: 0;
		right: 10px;
	}

	.van-icon-fire:before {
		position: absolute;
		top: -13px;
		left: -14px;
	}

	.van-cell {
		height: 100px;
		margin-bottom: 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, .2);
	}
</style>
