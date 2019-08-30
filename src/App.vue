<template>
	<div id="app">
		<transition name="bounce">
			<router-view></router-view>
		</transition>
		<div v-show="!flag " @click="showBofang">
			<BFBTN></BFBTN>
		</div>
	</div>
</template>


<script>
	import BFBTN from './components/Bofanglan.vue';
	export default {
		data() {
			return {
				flag: true
			};
		},
		methods: {
			showBofang() {
				this.$router.push("/zuopingdetail/bofang/0/0");
			}
		},
		components: {
			BFBTN
		},
		watch: {
			$route(to, from) {
				// console.log(to.name);
				if (to.name == "bofang"||to.name=="login"||to.name=="personupdate") {
					this.flag = false;
				} else {
					this.flag = true;
				}
			}
		}
	}
</script>
<style>
	.bounce-enter-active {
		animation: bounce-in 1.5s;
	}

	@keyframes bounce-in {
		0% {
			opacity: 0;
		}

		50% {
			opacity: 0.7;
		}

		100% {
			opacity: 1;
		}
	}
</style>
