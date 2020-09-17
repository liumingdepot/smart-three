<template>
    <div class="device">
        <div class="nav">
            <div class="item" :class="{ active: index == item.id }" v-for="item in nav" :key="item.id"
                 @click="changeIndex(item.id)">{{ item.name }}
            </div>
        </div>
        <div class="box1" v-if="index == 2">
            <div class="box">
                <div>
                    <div>进</div>
                    <img src="@/assets/image/icon/aaa.png" alt=""/>
                </div>
                <div>
                    <div>出</div>
                    <img src="@/assets/image/icon/aaaa.png" alt=""/>
                </div>
            </div>
        </div>
        <div class="box2" v-if="index == 1">
            <div class="box">
                <img style="width: 200px;" src="@/assets/image/icon/ww.gif" v-if="wbj == 1"/>
                <img style="width: 200px;" src="@/assets/image/icon/ww.png" v-if="wbj == 0"/>
            </div>
            <div class="left">
                <div style="display: flex;align-items: center">
                    <div class="kai">
                        <div class="item" @click="changewbj(0)" :class="{_item:wbj == 0}">OFF</div>
                        <div class="item" @click="changewbj(1)" :class="{_item:wbj == 1}">ON</div>
                    </div>
                </div>
                <div class="slider">
                    <div style="font-size: 18px;color: #00ccff;margin-bottom: 10px">阈值： {{value}} mg/m³</div>
                    <el-slider v-model="value" :max="300" @change="changeValue"></el-slider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Slider,Message} from 'element-ui';
    export default {
        components: {
            elSlider: Slider
        },
        data() {
            return {
                index: 1,
                wbj: 0,
                value: 0,
                nav: [{name: '雾炮机', id: 1},{name: '闸门', id: 2}]
            };
        },
        created() {
            this.getWpjStatus()
        },
        methods: {
            changeIndex(index) {
                this.index = index;
            },
            getWpjStatus() {
                this.$axios({
                    method: 'post',
                    url: `visualzation/getWpjStatus`,
                }).then(res => {
                    this.value = res.data.value;
                    this.wbj = res.data.sw == 'off' ? 0:1
                })
            },
            changeValue(value) {
                this.$axios({
                    method: 'get',
                    url: `/wupaoji/autopw?value=${value}&username=HXcjFK&password=F2171D2B-BE43-4377-A873-8E1544A0AF1C`,
                }).then(res => {
                    if(res.cmd1 == 'success' && res.cmd2 == 'success'){
                        this.getWpjStatus()
                    }else{
                        Message.error('服务器错误')
                    }
                })
            },
            changewbj(wbj) {
                this.$axios({
                    method: 'get',
                    url: `/wupaoji/manualpw?sw=${wbj}&username=HXcjFK&password=F2171D2B-BE43-4377-A873-8E1544A0AF1C`,
                }).then(res => {
                    if(res.cmd1 == 'success' && res.cmd2 == 'success'){
                        this.getWpjStatus()
                        this.wbj = wbj
                    }else{
                        Message.error('服务器错误')
                    }
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .device {
        background: #000;
        padding: 0.625rem;
        height: 100%;
        border-radius: 10px;

        .nav {
            display: flex;
            color: #ffffff;

            .item {
                padding: 0.25rem 0.625rem;
                text-align: center;
                cursor: pointer;
                box-sizing: border-box;
            }

            .active {
                border: 1px solid #00ccff;
                border-radius: 0.25rem;
                color: #00ccff;
            }
        }

        .box1 {
            color: #fff;
            padding: 2.5rem;

            .box {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

        .box2 {
            color: #fff;
            display: flex;
            align-items: center;

            .box {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .left {
                padding-top: 50px;
                padding-left: 50px;

                .kai {
                    border-radius: 20px;
                    border: 2px solid #00e4ff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    text-align: center;

                    .item {
                        width: 60px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 20px 0 0 20px;
                        cursor: pointer;
                    }

                    ._item {
                        background: #00e4ff;
                    }

                }

                .slider {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
