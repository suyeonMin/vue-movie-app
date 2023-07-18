<template>
    <div class="about">
        <!-- 나중에 이미지 등록하면 추가하기 -->
        <!-- <div class="photo">
            <img src="" alt="">
        </div> -->
        <div class="name">
            {{ name }}
        </div>
        <div>{{ email }}</div>
        <div>{{ blog }}</div>
        <div>{{ phone }}</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default{
        computed: {
            ...mapState('about', [
                'image',
                'name',
                'email',
                'blog',
                'phone'
            ])
        }
    }
</script>

<style lang="scss" scoped>

    .about {
        text-align: center;

        .photo {
            padding: 30px; margin: 40px auto 20px;
            width: 250px; height: 250px;
            border: 10px solid $gray-300; border-radius: 50%;
            background-color: $gray-200; 
            box-sizing: border-box;

            .img {width: 100%}
        }
        .name {
            margin-bottom: 20px;
            font-size: 40px; font-family: "Oswald", sans-serif;
        }
    
    }
</style>