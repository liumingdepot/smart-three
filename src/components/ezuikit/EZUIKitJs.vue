<template>
    <div class="video">
        <div id="video"></div>
    </div>
</template>

<script>
    import EZUIKit from "ezuikit-js";

    export default {
        data() {
            return {
                playr: ''
            }
        },
        mounted() {
            this.init(1)
        },
        methods: {
            init(e) {
                //开始初始化监控地址
                this.playr = new EZUIKit.EZUIKitPlayer({
                    id: 'video',
                    url: `ezopen://open.ys7.com/E51738772/${e}.hd.live`,
                    autoplay: true,
                    accessToken: "at.dhl5063v60wq44ibbvdlegzn7tnmbv08-5j2i2uqgfu-0x4imur-5qy82oich",
                    decoderPath: '',
                    width: 400,
                    height: 200,
                    template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                });
            }
        }
    }
    ;
</script>

<style scoped>
    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /deep/ iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
