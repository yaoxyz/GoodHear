<template>
	<div class="cmt-container">
		<van-cell-group>
			<van-cell-group>
				<van-field v-model="msg" label="评论" type="textarea" placeholder="请输入你想说的话" rows="2" autosize />
			</van-cell-group>
			<van-button round type="default" size='large' @click="fabiao" style="margin:10px auto;">发表评论</van-button>
			<div class="cmt-list" v-for="item in comments">
				<div class="cmt-item">
					<div class="cmt-title">
						用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time| dateFormat}}
					</div>
					<div class="cmt-body">
						{{item.content}}
					</div>
				</div>
			</div>
		</van-cell-group>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				comments: [],
				msg: ""
			};
		},
		methods: {
			fabiao() {
				this.comments.unshift({
					user_name: "匿名用户",
					add_time: Date.now(),
					content: this.msg.trim()
				});
			}
		}
	};
</script>


<style lang="less" scoped>
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
