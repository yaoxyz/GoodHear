<template>
	<div>
		<div id="list-content" class="list-content">
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<van-list :offset="10" v-model="loading" :finished="finished" @load="onLoad">
					<van-cell v-for="item in listDetail" :key="item.album.albumID" @click="sentId(item.album.albumID)">
						<img :src="item.album.cover.urls[0].url" alt class="myimg" />
						<div class="list">
							<h3>{{item.album.name}}</h3>
							<div class="list-bottom">
								<span>{{item.album.score | numFilter}}分</span>
								<span class="center">|</span>
								<span>{{item.album.owner.nickname}}</span>
								<span id="hot">
									<van-icon name="fire" />
									{{item.album.owner.fansNum}}
								</span>
							</div>
						</div>
					</van-cell>
				</van-list>
			</van-pull-refresh>
		</div>

	</div>
</template>

<script>
	import axios from "axios";
	export default {
		props: ['listDetail', 'pageList'],
		data() {
			return {
				isLoading: false,
				list: [],
				loading: false,
				finished: false,
				error: false,
				albId: ""
			};
		},
		created() {
			console.log(this.pageList)
		},
		methods: {
			sentId(ListId) {
				this.$emit('updata', ListId);
				//console.log(ListId);
			},
			onLoad() {
				//传给分类详情
				++this.pageList;
				this.$emit('func', this.pageList);

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
				}, 1500);
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
		height: 100px;
		margin-bottom: 10px;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
	}

	.list-content {
		overflow: scroll;
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


	.list-bottom {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	#hot {
		
		position: absolute;
		bottom: 0;
		right: 10px;
	}

	.van-icon-fire:before {
		position: absolute;
		top: -13px;
		left: -14px;
	}
</style>
