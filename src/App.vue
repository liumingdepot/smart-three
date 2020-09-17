<template>
    <div id="app">
        <router-view/>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" center modal :show-close="false"
                   :close-on-click-modal="false" :close-on-press-escape="false">
            <div style="text-align: center">是否全屏浏览</div>
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="changeWind" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {dialog, button} from 'element-ui'

export default {
    components: {
        elDialog: dialog,
        elButton: button
    },
    data() {
        return {
            dialogVisible: true
        }
    },
    methods: {
        changeWind() {
            var docElm = document.documentElement;
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            //FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            //Chrome等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            //IE11
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            this.dialogVisible = false
        }
    }
}
</script>

<style>
@font-face {
    font-family: 'a';
    src: url('./assets/font/a.ttf');
}

@font-face {
    font-family: 'b';
    src: url('./assets/font/b.ttf');
}

*, html, body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1;
    font-family: 'a';
}
</style>