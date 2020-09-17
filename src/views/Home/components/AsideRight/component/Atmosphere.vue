<template>
	<div class="Atmosphere">
		<ve-gauge v-if="show" width="300px" height="300px" :settings="chartSettings" :data="chartData" class="gauge"></ve-gauge>
	</div>
</template>

<script>
import bus from '@/bus/bus'
export default {
	data() {
		return {
			JcDqdjc: [],
			chartSettings:{},
			chartData:{},
			show:false
		};
	},
	created() {
		bus.$on('changeTop', (e) => {
			this.change(e)
		})
	},
	methods: {
		change(data){
			this.show = false
			this.chnageGauge(data)
		},
		chnageGauge(data){
			const colors =  data.threshold/data.max
			this.chartData = {
				columns: ['type', 'value'],
				rows: [{ type: data.itemname, value: data.itemavgvalue }]
			}
			this.chartSettings = {
				dataName: {
					[data.itemname]: data.itemunit
				},
				seriesMap: {
					[data.itemname]: {
						min: 0,
						max: data.max,
						splitNumber: 10,
						radius: '90%',
						axisLine: {
							lineStyle: {
								color: [[colors, '#1e90ff'],[1, '#ff4500']],
								width: 4,
								shadowColor: '#fff',
								shadowBlur: 10
							}
						},
						splitLine: {
							length: 30,
							lineStyle: {
								width: 2,
								color: '#fff',
								shadowColor: '#fff',
								shadowBlur: 10
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								shadowColor: '#fff',
								shadowBlur: 1
							}
						},
						axisTick: {
							length:20,
							lineStyle: {
								color: 'auto',
								shadowColor: '#fff',
								shadowBlur: 10
							}
						},
						pointer: {
							shadowColor: '#fff',
							shadowBlur: 1
						},
						title: {
							textStyle: {
								fontWeight: 'bolder',
								fontSize: 20,
								fontStyle: 'italic',
								color: '#fff',
								shadowColor: '#fff',
								shadowBlur: 1
							}
						},
						detail: {
							shadowBlur: 5,
							offsetCenter: [0, '50%'],
							textStyle: {
								color: '#fff',
								fontSize: 30,
							}
						}
					}
				}
			};
			this.show = true
		}
	}
};
</script>

<style>
	.gauge{
		margin: 0 auto;
	}
</style>