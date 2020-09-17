<template>
	<div class="box">
		<div class="header">
			<div class="title">
				<img src="@/assets/video/qqq.png" alt="" />
				<div style="margin-left: 20px"></div>
			</div>
			<div class="title">
				<img src="@/assets/video/正常.png" />
				<div style="color: #7d7d7d;">正常运行</div>
			</div>
			<img @click="back" src="@/assets/video/x.png" class="xxx" />
		</div>
		<date-picker  placeholder="选择日期" v-model="value1" @change="changepicker" type="daterange" class="pick" value-format="yyyy-MM-dd"></date-picker>
		<div class="table">
			<div class="box">
				<img style="width: 200px" src="@/assets/video/ww.png" alt="" />
				<div class="data">
					<div class="item">
						<div @click="changeChartData('pm1')" style="cursor: pointer">
							<div class="title">{{ data2.pm1 }}</div>
							<div style="color: #03c7e5;">PM1</div>
						</div>
						<div @click="changeChartData('pm25')" style="cursor: pointer">
							<div class="title">{{ data2.pm25 }}</div>
							<div style="color: #b946f0">PM2.5</div>
						</div>
						<div @click="changeChartData('pm10')" style="cursor: pointer">
							<div class="title">{{ data2.pm10 }}</div>
							<div style="color: #4291fd">PM10</div>
						</div>
					</div>
					<div class="item">
						<div @click="changeChartData('no2')" style="cursor: pointer">
							<div class="title">{{ data2.no2 }}</div>
							<div style="color: #82ff45">NO2</div>
						</div>
						<div @click="changeChartData('vocs')" style="cursor: pointer">
							<div class="title">{{ data2.vocs }}</div>
							<div style="color: #ff45a1">VOCS</div>
						</div>
					</div>
				</div>
			</div>
			<div id="drone" v-if="show" style="height: 400px"></div>
		</div>
	</div>
</template>

<script>
import { DatePicker } from 'element-ui';
import echarts from 'echarts';

export default {
	components: {
		DatePicker
	},
	data() {
		return {
			data: {
				pm1: [],
				pm10: [],
				pm25: [],
				no2: [],
				vocs: []
			},
			data2: [],
			type: '',
			value1: '',
			show:false
		};
	},
	mounted() {
		this.getDrone();
	},
	methods: {
		changepicker(value) {
			this.getDrone(value[0],value[1]);
		},
		//无人机
		getDrone(stime = '',etime='') {
			this.show = false
			this.$axios({
				url: 'visualzation/getUdpData',
				method: 'post',
				data:{
					stime,
					etime
				}
			}).then(res => {
				const arr = res.data;
				for (let i = 0; i < arr.length; i += Math.ceil(arr.length / 40)) {
					this.data.pm1.push({
						value: arr[i].pm1,
						date: arr[i].createTime
					});
					this.data.pm10.push({
						value: arr[i].pm10,
						date: arr[i].createTime
					});
					this.data.pm25.push({
						value: arr[i]['pm2.5'],
						date: arr[i].createTime
					});
					this.data.no2.push({
						value: arr[i].no2,
						date: arr[i].createTime
					});
					this.data.vocs.push({
						value: arr[i].vocs,
						date: arr[i].createTime
					});
				}
				this.data2 = {
					pm1: this.data.pm1[0].value,
					pm10: this.data.pm10[0].value,
					pm25: this.data.pm25[0].value,
					no2: this.data.no2[0].value,
					vocs: this.data.vocs[0].value
				};
				this.changeChartData('pm1');
			});
		},
		changeChartData(type) {
			const xdata = this.data[type].map(val => val.date.split(' ')[1]);
			const ydata = this.data[type].map(val => val.value);
			const option = {
				backgroundColor: '',
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: '#57617B'
						}
					}
				},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						data: xdata
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '单位（%）',
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 14
							}
						},
						splitLine: {
							lineStyle: {
								color: '#57617B'
							}
						}
					}
				],
				series: [
					{
						name: type,
						type: 'line',
						smooth: true,
						symbol: 'circle',
						symbolSize: 5,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 3
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									1,
									0,
									[
										{
											offset: 0,
											color: 'rgba(16,97,204, 0.3)'
										},
										{
											offset: 0.8,
											color: 'rgba(17,235,210, 0)'
										}
									],
									false
								),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: 'rgba(16,97,204,1)'
									},
									{
										offset: 1,
										color: 'rgba(17,235,210,1)'
									}
								])
							},
							emphasis: {
								color: 'rgb(0,196,132)',
								borderColor: 'rgba(0,196,132,0.2)',
								extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
								borderWidth: 10
							}
						},
						data: ydata
					}
				]
			};
			this.show = true
			this.$nextTick(()=>{
				const myChart = echarts.init(document.getElementById('drone'));
				myChart.setOption(option);
			})
		},
		back() {
			this.$emit('changeType', 0);
		}
	}
};
</script>

<style scoped lang="scss">
.pick {
	float: right;
	margin-right: 20px;
}
::v-deep .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
	background-color: #171717;
	color: #fff;
}
::v-deep .el-date-editor .el-range-input {
	background-color: #171717;
	color: #fff;
}
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
		.box {
			padding: 0 20px;
			height: 200px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.data {
				width: 50%;
				padding: 20px;
				box-sizing: border-box;
				color: #fff;

				.item {
					text-align: center;
					margin-bottom: 20px;
					display: flex;
					align-items: center;
					justify-content: space-around;

					.title {
						line-height: 1.5;
						font-size: 36px;
					}
				}
			}
		}
	}
}
</style>
