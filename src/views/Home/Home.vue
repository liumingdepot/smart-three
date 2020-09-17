<template>
    <div class="home">
        <Header/>
        <div class="main">
            <AsideLeft/>
            <Main/>
            <AsideRight/>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header/Header.vue';
    import AsideLeft from './components/AsideLeft/AsideLeft.vue';
    import Main from './components/Main/Main.vue';
    import AsideRight from './components/AsideRight/AsideRight.vue';

    export default {
        components: {
            Header,
            AsideLeft,
            Main,
            AsideRight
        }
    }
</script>

<style scoped lang="scss">
    .home {
        width: 100vw;
        height: 100vh;
        min-height: 1080px;
        background-image: url('../../assets/image/bg.png');
        background-size: 100% 100%;
        position: absolute;
    }

    .main {
        height: calc(100vh - 70px);
        width: 100%;
        display: grid;
        grid-template-columns: 25% 50% 25%;
    }
</style>