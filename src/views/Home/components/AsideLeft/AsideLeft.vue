<template>
    <aside class="aside">
        <div class="aside-item" v-for="item in aside" :key="item.id">
            <div class="title">
                <div class="text">{{item.name}}</div>
                <img src="@/assets/image/right.png" alt="img"/>
            </div>
            <div class="common">
                <Project v-if="item.id == 1"/>
                <Personnel v-if="item.id == 2"/>
                <Group v-if="item.id == 3"/>
            </div>
        </div>
    </aside>
</template>

<script>
    import Personnel from './component/Personnel'
    import Project from './component/Project'
    import Group from './component/Group'

    export default {
        components: {
            Personnel, Project, Group
        },
        data() {
            return {
                aside: [
                    {name: '项目情况', id: 1},
                    {name: '人员进出', id: 2},
                    {name: '班组人员进出统计', id: 3}
                ]
            }
        }
    }
</script>


<style scoped lang="scss">
    .aside {
        .aside-item {
            height: 31%;
            margin-bottom: 3%;

            .title {
                margin: 0 auto;
                width: 94%;
                box-sizing: border-box;
                height: 40px;
                border-radius: 17px;
                border: 3px solid #00e4ff;
                font-size: 18px;
                padding: 0 18px;
                color: #ffffff;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: space-between;

                img {
                    height: 20px;
                }
            }

            .common {
                margin: 0 auto;
                width: 94%;
                height: calc(100% - 40px);
                background-color: #0d0d0d;
                box-shadow: 0px 11px 8px 0px rgba(0, 0, 0, 0.29);
                border-radius: 10px;
                border: solid 1px rgba(0, 204, 255, 0.13);
                opacity: 0.8;
            }
        }
    }
</style>
