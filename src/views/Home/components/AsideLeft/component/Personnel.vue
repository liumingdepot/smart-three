<template>
    <ul class="person">
        <li class="box">
            <div class="item">
                <div class="title1" style="font-family: 'b';font-size: 1.5rem;">{{data.totalCount}}</div>
                <div>在场人数</div>
            </div>
            <div class="item">
                <div class="title1">{{data.personName}}</div>
                <div>入场人员</div>
            </div>
            <div class="item">
                <img :src="data.headImage" alt="">
            </div>
        </li>
        <li class="box">
            <div class="item">
                <div class="title">进场时间</div>
                <div clsss="date">{{data.checKInTime?data.checKInTime:'--'}}</div>
            </div>
            <div class="item">
                <div class="title">出场时间</div>
                <div clsss="date">{{data.checkOutTime?data.checkOutTime:'--'}}</div>
            </div>
            <div class="item">
                <div class="title">在场时间</div>
                <div clsss="date">{{data.diffTime?data.diffTime:'--'}}</div>
            </div>
        </li>
        <li class="box" style="border:none">
            <div class="item" style="width: 100%;">
                <div class="title">近期状况</div>
                <div id="situation" style="height: 100px"></div>
            </div>
        </li>
    </ul>
</template>

<script>
    import echarts from 'echarts'

    export default {
        data() {
            return {
                data: {}
            }
        },
        created() {
            this.getGroup()
        },
        methods: {
            getGroup() {
                this.$axios({
                    method: 'post',
                    url: `/visualzation/getPersonAttendance`,
                }).then(res => {
					if(!res.totalCount){
						this.getGroup()
						return
					}
                    this.data = res;
                    const myChart = echarts.init(document.getElementById('situation'));
                    const xData = res.data.map(val => val.checkTime)
                    const yData = res.data.map(val => val.diffTime ? val.diffTime.replace(':','.') : 0)
                    const fontColor = '#30eee9';
                    const option = {
                        backgroundColor: '',
                        grid: {
                            left: '1%',
                            right: '1%',
                            top: '5%',
                            bottom: '5%',
                            containLabel: true
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                axisLabel: {
                                    color: fontColor
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#397cbc'
                                    }
                                },
                                axisTick: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#195384'
                                    }
                                },
                                data: xData
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '',
                                min: 0,
                                max: 20,
                                axisLabel: {
                                    formatter: '{value}',
                                    textStyle: {
                                        color: '#2ad1d2'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#27b4c2'
                                    }
                                },
                                axisTick: {
                                    show: false,
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#11366e'
                                    }
                                }
                            },

                        ],
                        series: [{
                            name: '已采纳',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#0092f6',
                                    lineStyle: {
                                        color: "#0092f6",
                                        width: 1
                                    },
                                }
                            },
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        color: 'red'
                                    }
                                }
                            },
                            data: yData
                        }
                        ]
                    };
                    myChart.setOption(option);
                })
            },
        }
    };
</script>

<style scoped lang="scss">
    .person {
        padding: 0 1.625rem;

        .box {
            display: flex;
            align-items: center;
            padding: 0.625rem;
            color: #00ccff;
            border-bottom: 1px dashed #00ccff;
            font-size: 1rem;
            color: #00ccff;

            .item {
                width: 33%;

                img {
                    width: 3.75rem;
                    height: 3.75rem;
                    background-color: #fff;
                    border-radius: 50%;
                }

                .date {
                    font-family: 'b'
                }

                .title1 {
                    font-size: 1.5rem;
                    color: #ffc71c;
                    padding-bottom: 0.625rem;
                }

                .title {
                    font-size: 0.875rem;
                    padding: 10px 0;
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
