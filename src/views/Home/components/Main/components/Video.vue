<template>
    <div class="box">
        <div class="header">
            <div class="title">
                <img src="@/assets/video/sxt-ico.png" alt="">
                <div style="margin-left: 20px">{{item.name}}</div>
            </div>
            <div class="title">
                <img src="@/assets/video/正常.png" v-if="type == 1">
                <img src="@/assets/video/停止.png" v-if="type == 2">
                <div style="color: #7d7d7d;" v-if="type == 1">正常运行</div>
                <div style="color: #7d7d7d;" v-if="type == 2">设备停止</div>
            </div>
            <img @click="back" src="@/assets/video/x.png" class="xxx">
        </div>
        <div class="video" id="video"></div>
    </div>
</template>

<script>
    import EZUIKit from "ezuikit-js";
    export default {
        props: ['item'],
        data() {
            return {
                type:1,
                player:null
            }
        },
        mounted() {
            if(this.item.liveAddress){
                this.type = 1
                this.getVideo()
            }else{
                this.type = 0
            }
        },
        methods: {
            getVideo() {
                //开始初始化监控地址
                this.playr = new EZUIKit.EZUIKitPlayer({
                    id: 'video',
                    url: `ezopen://open.ys7.com/E51738772/${this.item.channelNo}.hd.live`,
                    autoplay: true,
                    accessToken: this.item.accessToken,
                    decoderPath: '',
                    template: 'security', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                });
            },
            back(){
                this.$emit('changeType',0)
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
            .title{
                display: flex;
                align-items: center;
                color: #fff;
            }
        }

        .video {
            width: 100%;
            height: calc(100% - 72px);
        }
        .xxx{
            width: 20px;
            height: 20px;
            cursor:pointer;
        }
    }
</style>
