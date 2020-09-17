<template>
    <div class="top">
        <div class="top-item" v-for="(item,index) in JcDqdjc" :key="item.name" @click="changeTopTwo(item,index)">
            <div class="name">{{ item.itemname }}</div>
            <div class="value">
                {{ item.itemavgvalue }}
                <span style="font-size: 10px;color: #fff;">{{ item.itemunit }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '@/bus/bus'

    export default {
        data() {
            return {
                JcDqdjc: [],
                num:0
            };
        },
        created() {
            this.getJcDqdjc();
            this.changeTopInter()
        },
        methods: {
            getJcDqdjc() {
                this.$axios({
                    url: '/visualzation/getToDayData',
                    method: 'post'
                }).then(res => {
					this.JcDqdjc = res.data.map(val=>{
                        if(val.itemname === 'TSP'){
                            val.threshold = 200
                            val.max = 250
                        }
                        if(val.itemname === 'PM10'){
                            val.threshold = 150
                            val.max = 200
                        }
                        if(val.itemname === 'PM2.5'){
                            val.threshold = 75
                            val.max = 125
                        }
                        if(val.itemname === '湿度' || val.itemname === '婀垮害'){
                            val.threshold = 65
                            val.max = 100
                        }
                        if(val.itemname === '气压' || val.itemname === '姘斿帇'){
                            val.threshold = 101
                            val.max = 150
                        }
                        if(val.itemname === '噪声' || val.itemname === '鍣０'){
                            val.threshold = 65
                            val.max = 100
                        }
                        return val
					});
					this.changeTopTwo(this.JcDqdjc[0],0)
                });
            },
            changeTopTwo(item,index) {
				bus.$emit('changeTop', item);
                this.num = index
            },
            changeTopInter(){
                setInterval(()=>{
                    bus.$emit('changeTop', this.JcDqdjc[this.num]);
                    if(this.num==5){
                        this.num = 0
                    }else{
                        this.num++
                    }
                },10000)
            }
        }
    };
</script>

<style scoped lang="scss">
    @keyframes myfirst {
        0% {
            text-shadow: none;
        }
        50% {
            text-shadow: 0 0 10px #00ccff, 0 0 20px #00ccff, 0 0 30px #00ccff, 0 0 4px #00ccff;
        }
        100% {
            text-shadow: none;
        }
    }

    .top {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        height: 80px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 10px;

        .top-item {
            cursor: pointer;
            background-image: url(../../../../../assets/image/topItem.png);

            .name {
                color: #00ccff;
                padding: 1.125rem 1.375rem;
            }

            .value {
                font-size: 20px;
                color: #ffffff;
                text-align: center;
                animation: myfirst 3s 9999;
            }
        }
    }
</style>
