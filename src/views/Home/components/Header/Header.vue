<template>
	<header class="header">
		<div class="title">智慧工地系统平台建设服务（天马项目）</div>
		<div class="right">
			<div class="date">{{ date }}</div>
			<div class="UTCDay">{{ UTCDay }}</div>
			<img  src="@/assets/image/sun.png" />
		</div>
	</header>
</template>

<script>
   export default {
	data(){
		return{
			date:'',
			UTCDay:''
		}
	},
	created() {
		setInterval(()=>{
			this.getDate()
		},1000)
	},
	methods:{
		getDate(){
			const datea = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
			const date = new Date()
			this.UTCDay = datea[date.getUTCDay()]
			const h = date.getHours()<10?('0'+date.getHours() ): date.getHours()
			const m = date.getMinutes()<10?('0'+date.getMinutes() ): date.getMinutes()
			const s = date.getSeconds()<10?('0'+date.getSeconds() ): date.getSeconds()
			this.date = h + ':' + m + ':' + s
		}
	}
}
</script>

<style scoped lang="scss">
.header {
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 25px;
	box-sizing: border-box;
	color: #fff;
	.title {
		padding-left: 25px;
		width: 39.375rem;
		line-height: 100px;
		font-size: 1.8rem;
		background: url('../../../../assets/image/header.png') no-repeat;
		background-size: 100% 3.125rem;
		background-position: 0 25px;
	}
	.right {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		.date {
			font-size: 50px;
			font-family: 'b';
		}
		.UTCDay{
			padding: 10px;
		}
	}
}
</style>
