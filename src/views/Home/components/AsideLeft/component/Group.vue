<template>
	<div class="Group">
		<div id="main"></div>
		<div class="name">
			<div class="item" v-for="item in list" :key="item.groupName" @click="changeGroup(item)">
				{{ item.groupName }} ({{item.curNum}}/{{item.totalNum}})
			</div>
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import bus from '@/bus/bus';
export default {
	data() {
		return {
			list: []
		};
	},
	created() {
		this.getGroup();
	},
	methods: {
		getGroup() {
			this.$axios({
				method: 'post',
				url: `/visualzation/getGroup`
			}).then(res => {
				this.list = res.data;
				if (res.data.length == 0) {
					this.getGroup();
					return;
				}
				this.setEcharts(res.data);
			});
		},
		changeGroup(row) {
			bus.$emit('changeName', row.groupName);
		},
		setEcharts(data) {
			const myChart = echarts.init(document.getElementById('main'));
			const ydata = data.map(item => {
				return {
					name: item.groupName + '  ' + item.curNum + '/' + item.totalNum,
					value: item.curNum
				};
			});
			const color = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec', '#cf9ef1'];
			const option = {
				backgroundColor: '',
				color: color,
				series: [
					{
						type: 'pie',
						clockwise: false, //饼图的扇区是否是顺时针排布
						minAngle: 2, //最小的扇区角度（0 ~ 360）
						radius: ['40%', '70%'],
						center: ['70%', '50%'],
						avoidLabelOverlap: false,
						itemStyle: {
							//图形样式
							normal: {
								borderColor: '#0d0d0d',
								borderWidth: 2
							}
						},
						label: {
							normal: {
								show: false,
								position: 'center',
								formatter: '{text|{b}}\n{c} ({d}%)',
								rich: {
									text: {
										color: '#fff',
										fontSize: 12,
										align: 'center',
										verticalAlign: 'middle',
										padding: 3
									},
									value: {
										color: '#8693F3',
										fontSize: 12,
										align: 'center',
										verticalAlign: 'middle'
									}
								}
							},
							emphasis: {
								show: true,
								textStyle: {
									color: '#fff',
									fontSize: 12
								}
							}
						},
						data: ydata
					}
				]
			};
			myChart.setOption(option);
		}
	}
};
</script>

<style scoped lang="scss">
.Group {
	width: 100%;
	height: 100%;
	position: relative;

	#main {
		width: 100%;
		height: 100%;
	}
	.name {
		position: absolute;
		top: 20px;
		left: 40px;
		color: #fff;

		.item {
			line-height: 2;
			cursor: pointer;
		}
	}
}
</style>
