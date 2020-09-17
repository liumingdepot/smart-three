<template>
	<div class="box">
		<div class="header">
			<div class="title">
				<img src="@/assets/video/qqq.png" alt="" />
				<div style="margin-left: 20px">扬尘系统</div>
			</div>
			<div class="title">
				<img src="@/assets/video/正常.png" />
				<div style="color: #7d7d7d;">正常运行</div>
			</div>
			<date-picker placeholder="选择日期" v-model="value1" @change="changepicker" type="daterange" class="pick" value-format="yyyy-MM-dd"></date-picker>
			<img @click="back" src="@/assets/video/x.png" class="xxx" />
		</div>
		<div class="table" v-if="show"><div id="Cannon" style="height: 680px"></div></div>
	</div>
</template>

<script>
import echarts from 'echarts';
import { DatePicker } from 'element-ui';
export default {
	components: {
		DatePicker
	},
	data() {
		return {
			data: [],
			data2: [],
			type: '',
			chartData: {},
			options: {
				xAxis: {
					nameTextStyle: {
						color: '#fff',
						fontSize: 50
					}
				}
			},
			value1:'',
			show:false
		};
	},
	mounted() {
		this.getCannon();
	},
	methods: {
		changepicker(value) {
			this.getCannon(value[0],value[1]);
		},
		getCannon(stime = '',etime='') {
			this.show = false
			this.$axios({
				url: 'visualzation/getJcPgasHour',
				method: 'post',
				data:{
					stime,
					etime
				}
			}).then(res => {
				//1 获取数组
				const arr = res.data;
				//2 筛选数组名称
				const arr2 = arr.map(val => {
					return val.iteamname;
				});
				const arr3 = arr.map(val => {
					return val.curdatetime;
				});
				//3 数组去重
				const arr4 = new Set(arr2);
				const arr5 = Array.from(arr4);
				const arr6 = new Set(arr3);
				const arr7 = Array.from(arr6);
				//4 数据重构
				let rows = [];
				for (let i = 0; i < arr7.length; i++) {
					rows[i] = {};
					rows[i]['日期'] = arr7[i];
					for (let j = 0; j < arr5.length; j++) {
						rows[i][arr5[j]] = '';
					}
				}
				//5 数据结构
				for (let i = 0; i < rows.length; i++) {
					for (let item in rows[i]) {
						if (item !== '日期') {
							for (let k = 0; k < arr.length; k++) {
								if (arr[k].iteamname == item && arr[k].curdatetime == rows[i]['日期']) {
									rows[i][item] = arr[k].itemavgvalue;
								}
							}
						}
					}
				}
				//6 获取分类名称
				const titles = [];
				for (let item in rows[0]) {
					if (item != '日期') {
						titles.push(item);
					}
				}
				//7 获取y轴数值
				const arrList = [];
				for (let i = 0; i < titles.length; i++) {
					arrList[i] = rows.map(val => val[titles[i]]);
				}
				//8 获取x轴数据
				const lineX = rows.map(val => val['日期']);
				//9 构建charts
				const charts = {
					unit: '类型',
					names: titles,
					lineX: lineX,
					value: arrList
				};
				// 10 构建颜色
				const color = [
					'rgba(3,199,229',
					'rgba(85,70,240',
					'rgba(66,145,253',
					'rgba(3,199,229',
					'rgba(130,255,69',
					'rgba(3,199,229',
					'rgba(85,70,240',
					'rgba(66,145,253',
					'rgba(3,199,229',
					'rgba(130,255,69'
				];
				const lineY = [];
				// 11 构建多项y轴
				for (let i = 0; i < charts.names.length; i++) {
					var x = i;
					if (x > color.length - 1) {
						x = color.length - 1;
					}
					const data = {
						name: charts.names[i],
						type: 'line',
						color: color[x] + ')',
						smooth: true,
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0,
											color: color[x] + ', 0.3)'
										},
										{
											offset: 0.8,
											color: color[x] + ', 0)'
										}
									],
									false
								),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						symbol: 'circle',
						symbolSize: 5,
						data: charts.value[i]
					};
					lineY.push(data);
				}
				lineY[0].markLine = {
					silent: true,
					data: [
						{
							yAxis: 5
						},
						{
							yAxis: 100
						},
						{
							yAxis: 200
						},
						{
							yAxis: 300
						},
						{
							yAxis: 400
						}
					]
				};
				// 12 构建数据
				const option = {
					backgroundColor: '',
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: charts.names,
						textStyle: {
							fontSize: 12,
							color: 'rgb(0,253,255,0.6)'
						},
						right: '4%'
					},
					grid: {
						top: '12%',
						left: '4%',
						right: '4%',
						bottom: '12%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: charts.lineX,
						axisLabel: {
							textStyle: {
								color: 'rgb(0,253,255,0.6)'
							},
							formatter: function(params) {
								return params.split(' ')[0];
							}
						}
					},
					yAxis: {
						name: charts.unit,
						type: 'value',
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: 'rgb(0,253,255,0.6)'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgb(23,255,243,0.3)'
							}
						},
						axisLine: {
							lineStyle: {
								color: 'rgb(0,253,255,0.6)'
							}
						}
					},
					series: lineY
				};
				// 13 构建图表
				this.show = true
				this.$nextTick(()=>{
					const myChart = echarts.init(document.getElementById('Cannon'));
					myChart.setOption(option);
				})
				
			});
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
