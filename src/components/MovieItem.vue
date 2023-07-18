<template>
    <RouterLink :to="`/movie/${movie.imdbID}`" class="movie" :style="{backgroundImage: `url(${movie.Poster})`}">
        <Loader v-if="imageLoading" :size="1.5" absolute />
        <div class="info">
            <div class="year">{{ movie.Year }}</div>
            <div class="title">{{ movie.Title }}</div>
        </div>
    </RouterLink>
</template>

<script>
    import Loader from '~/components/Loader'
    export default{
        components: {
            Loader
        },  
        props: {
            movie: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                imageLoading : true
            }
        },
        mounted(){
            this.init()
        },  
        methods: {
            async init(){
                const poster = this.movie.Poster;
                if(!poster || poster === 'N/A'){
                    this.imageLoading = false
                }else{
                    await this.$loadImage(poster)
                    this.imageLoading = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .movie {
        $width: 200px;

        position: relative;
        margin: 10px; 
        width: $width; 
        height: $width * 3 / 2; 
        border-radius: 4px; 
        background-color: $gray-400; 
        background-size: cover;
        overflow: hidden;

        &:hover::after {
            content: '';
            position: absolute; left: 0; bottom: 0; right: 0; top: 0;
            border: 6px solid $primary;
        }

        .info {
            position: absolute; left: 0; bottom: 0; 
            padding: 14px; 
            width: 100%; 
            font-size: 14px; text-align: center; 
            background-color: rgba($black, .3); backdrop-filter: blur(10px);

            .year {
                color: $primary;
            }
            .title{
                color: $white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>