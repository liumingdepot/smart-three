<template>
	<ul class="project">
		<li class="box">
			<div class="item">
				<div class="title">投资金额</div>
				<div class="num">
					{{projectInfo.invest}}
					<span style=" color: #00ccff;">万</span>
				</div>
			</div>
			<div class="item">
				<div class="title">占地面积</div>
				<div class="num">
					{{projectInfo.buildingarea}}
					<span style=" color: #00ccff;">平方公里</span>
				</div>
			</div>
		</li>
		<li class="box">
			<div class="item">
				<div class="title">项目所在地</div>
				<div>{{projectInfo.areaname}}</div>
			</div>
			<div class="item">
				<div class="title">建设单位</div>
				<div>{{projectInfo.buildcorpname}}</div>
			</div>
		</li>
		<li class="box">
			<div class="item">
				<div class="title">总包单位</div>
				<div>{{projectInfo.contractorcorpname}}</div>
			</div>
			<div class="item">
				<div class="title">建设单位</div>
				<div>{{projectInfo.buildcorpname}}</div>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	data() {
		return {
			projectInfo:{}
		};
	},
	created() {
		this.getProject();
	},
	methods: {
		getProject() {
			this.$axios({
				url: '/visualzation/getProjectInfo',
				method: 'post',
				data: {
					id: 42
				}
			}).then(res => {
				this.projectInfo = res.data
			});
		}
	}
};
</script>

<style scoped lang="scss">
.project {
	padding: 0 1.625rem;
	font-weight: bold;
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem;
		color: #00ccff;
		border-bottom: 1px dashed #00ccff;
		.item {
			width: 50%;
			.num {
				font-size: 2rem;
				color: #ffc71c;
				padding-bottom: 0.625rem;
				font-family: 'b';
			}
		}
	}
	.box {
		display: flex;
		align-items: center;
		padding: 0.625rem;
		color: #00ccff;
		border-bottom: 1px dashed #00ccff;
		font-size: 1rem;
		color: #00ccff;
		.item {
			width: 50%;
			.title {
				font-size: 0.875rem;
				padding: 15px 0;
				display: flex;
				color: #fff;
				&::before {
					margin-right: 0.25rem;
					width: 0.25rem;
					height: 0.75rem;
					content: '';
					background-color: #ffc71c;
				}
			}
		}
	}
}
</style>
