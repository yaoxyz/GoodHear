<template>
	<div style="width: 100%;position: relative;height: 170px;">
		<div style="width:100%;height: 180px;position: absolute;background: #1989FA;"></div>
		<div style="position: absolute;top: 10px;height: 150px;width:94%;left: 50%;transform: translateX(-50%);">
			<van-swipe :autoplay="3500" indicator-color="black" style="border-radius: 12px;">
			<van-swipe-item v-for="(item,index) in imgList" :key="index">
					<img :src="item" v-if="index<4" style="widthg:94%;margin: 0 auto;"/>
			</van-swipe-item>
		</van-swipe>
		</div>
		
	</div>
</template>
<script>
	export default {
		props: ['imgList'],
		data() {
			return {
				list: []
			};
		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
	.van-swipe__track img {
		height: 100%;
		width: 100%
	}
</style>
