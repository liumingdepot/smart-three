<template>
	<div class="Equipment">
		<div class="box">
			<img class="item" src="@/assets/image/bg1.png" />
			<div class="item">
				<div style="padding: 18px 0;">设备信息</div>
				<div style="color: #ffc71c;">GR168</div>
			</div>
		</div>
		<div class="box2">
			<div class="shebei">设备总数量</div>
			<div class="num">20个</div>
		</div>
		<div class="box3">
			<div class="item">
				<div class="title">在线数量</div>
				<div class="num">22</div>
			</div>
			<div class="item">
				<div class="title">离线数量</div>
				<div class="num">22</div>
			</div>
			<div class="item">
				<div class="title">故障数量</div>
				<div class="num">0</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.Equipment {
	padding: 25px;
	.box {
		height: 5.625rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			width: 157px;
			height: 92px;
			background-color: #3a3a3a;
			box-shadow: inset 0px 3px 79px 0px rgba(0, 0, 0, 0.35);
			border-radius: 5px;
			opacity: 0.86;
			text-align: center;
			color: #fff;
		}
	}
	.box2 {
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
		margin: 40px 0 10px 0;
		height: 23px;
		background-color: #3a3a3a;
		box-shadow: inset 0px 3px 79px 0px rgba(0, 0, 0, 0.35);
		border-radius: 5px;
		opacity: 0.86;
		line-height: 3;
		.shebei{
			color: #fff;
			font-size: 18px;
			transform: translateY(-8px);
			&::before {
				margin-right: 10px;
				width: 0.25rem;
				height: 1.75rem;
				content: '';
				background:url("../../../../../assets/image/shu2.png");
			}
		}
		.num{
			font-size: 18px;
			transform: translateY(-8px);
			color: #ffc71c;
		}
	}
	.box3{
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			position: relative;
			width: 50%;
			.title {
				font-size: 0.875rem;
				padding: 10px 0;
				display: flex;
				color: #fff;
				&::before {
					margin-right: 10px;
					width: 0.25rem;
					height: 1.75rem;
					content: '';
					background:url("../../../../../assets/image/shu2.png");
				}
			}
			.num{
				position: absolute;
				top: 2rem;
				left: 16px;
				color: #ffc71c;
			}
		}
	}
}
</style>
