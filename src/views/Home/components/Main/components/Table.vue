<template>
	<div class="box">
		<div class="header">
			<div class="title">
				<img src="@/assets/video/yc.png" alt="" />
				<div style="margin-left: 20px">{{ name ? name + '考勤管理' : '考勤总管理' }}</div>
			</div>
			<img @click="back" src="@/assets/video/x.png" class="xxx" />
		</div>
		<div class="table">
			<div class="table-header">
				<div class="item">姓名</div>
				<div class="item">进场时间</div>
				<div class="item">进场类型</div>
				<div class="item">出场时间</div>
				<div class="item">出场类型</div>
			</div>
			<div class="table-body" v-for="(item, index) in dataList" :key="index">
				<div class="item" style="color:#ffc71c">{{ item.personName }}</div>
				<div class="item" :style="{ color: item.checkInStatus == '正常签入' ? '#00ff4d' : '#d60000' }">{{ item.checkInTime }}</div>
				<div class="item" :style="{ color: item.checkInStatus == '正常签入' ? '#00ff4d' : '#d60000' }">{{ item.checkInStatus || '缺卡' }}</div>
				<div class="item" :style="{ color: item.checkOutStatus == '正常签出' ? '#00ff4d' : '#d60000' }">{{ item.checkOutTime }}</div>
				<div class="item" :style="{ color: item.checkOutStatus == '正常签出' ? '#00ff4d' : '#d60000' }">{{ item.checkOutStatus || '缺卡' }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import bus from '@/bus/bus'
export default {
	data() {
		return {
			dataList: [],
			name:''
		};
	},
	created() {
		bus.$on('changeName', name => {
			this.name = name
			this.getAttendance();
		})
		this.getAttendance();
	},
	methods: {
		//考勤查看
		getAttendance() {
			this.$axios({
				url: 'visualzation/getAttendance',
				method: 'post'
			}).then(res => {
				this.dataList = this.name ? res.data.filter(val=>val.deptName == this.name) : res.data;
			});
		},
		back() {
			this.$emit('changeType', 0);
		}
	}
};
</script>

<style scoped lang="scss">
.box {
	position: relative;
	z-index: 99;
	width: 98%;
	height: 98%;
	margin: 1%;
	background-color: #171717;
	border-radius: 4px;

	.header {
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;

		.title {
			display: flex;
			align-items: center;
			color: #fff;
		}

		.xxx {
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
	}
	.table {
		width: 100%;
		height: 600px;
		overflow: auto;
		padding: 0 20px;
		box-sizing: border-box;
		color: #fff;
		.table-header {
			color: #00ccff;
		}
		.table-header,
		.table-body {
			text-align: center;
			padding: 0 40px;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
			.item {
				line-height: 40px;
				border-bottom: 1px dashed #00ccff;
			}
		}
	}
}
</style>
