<template>
	<div class="bottom">
		<div class="project">工程进度（工期天数355）</div>
		<div class="box">
			<div class="left">
				<div class="num">261</div>
				<div class="day" style="color: #fff;">已施工天数</div>
			</div>
			<div class="right" ref="right">
				<div v-for="item of projectSpeed" :key="item.speedtime" style="text-align: center;">
					<img class="img" src="@/assets/image/shu.png" alt="" style="margin-bottom: 10px;">
					<div>{{item.speedtime}}</div>
					<div>{{item.remarks}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				projectSpeed:[],
				width:''
			}
		},
		created() {
			this.getProjectSpeed()
			this.$nextTick(()=>{
				this.width = this.$refs.offsetWidth
			})
		},
		methods:{
			getProjectSpeed(){
				this.$axios({
					url:'visualzation/getProjectSpeed',
					method:'post',
					data:{
						id:42
					}
				}).then(res=>{
					this.projectSpeed = res.data
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.bottom {
	width: 100%;
	height: 140px;
	color: #00cbeb;
	.box {
		display: flex;
	}
	.left {
		width: 100px;
	}
	.num {
		font-size: 48px;
		color: #ffc71c;
		font-family: 'b';
		padding: 10px 0;
	}
	.right {
		margin-top: 24px;
		width: calc(100% - 100px);
		background: url('../../../../../assets/image/progress.png') no-repeat;
		background-size: 100% 20px;
		display: flex;
		justify-content: space-around;
	}
}
</style>
