<template>
    <div>
        <div>子应用1</div>
        <!-- <img src="/static/images/menu/1@2x.png" alt="">
        <img src="@/assets/img/_defaultMarker.png" alt=""> -->
        <!-- <img :src="loadStaticFile('0a04069843d5615a7b97652f636b2a0.png')" alt=""> -->
        <div class="bg_img"></div>
    </div>
</template>

<script setup lang="ts">

// import imga from '@/assets/img/_defaultMarker.png'
// const imgB = new URL('../assets/img/_defaultMarker.png',import.meta.url).href
// const imgC = new URL('/static/img/0a04069843d5615a7b97652f636b2a0.png',import.meta.url).href

// const loadStaticFile:(url:string) =>any= (url)=> new URL(`/static/img/${url}`,import.meta.url).href
</script>

<style>
.bg_img{
    /* background:url('/static/img/0a04069843d5615a7b97652f636b2a0.png') no-repeat center center; */
    background:url('@/assets/img/_defaultMarker.png');
    width: 40px;
    height: 40px;
}
</style>
