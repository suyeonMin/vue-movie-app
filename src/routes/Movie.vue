<template>
    <div class="container">

        <!-- 서버 응답 전까지 보일 요소 -->
        <template v-if="loading">
            <div class="skeletons">
                <div class="skeleton poster"></div>
                <div class="specs">
                    <div class="skeleton title"></div>
                    <div class="skeleton spec"></div>
                    <div class="skeleton plot"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                </div>
            </div>
            <Loader :size="3" :zIndex="9" :fixed="true" />
        </template>

        <!-- 서버 응답 후 보일 요소 -->
        <div v-else class="movie-details">
            <div :style="{backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}" class="poster">
                <Loader v-if="imageLoading" absolute />
            </div>
            <div class="specs">
                <div class="title">{{ theMovie.Title }}</div>
                <div class="labels">
                    <span>{{ theMovie.Released }}</span>
                    <span>{{ theMovie.Runtime }}</span>
                    <span>{{ theMovie.Country }}</span>
                </div>
                <div class="plot">{{ theMovie.Plot }}</div>
                <div class="ratings">
                    <h3>Ratings</h3>
                    <div class="rating-wrap">
                        <div v-for="{Source: name, Value: score} in theMovie.Ratings" :key="name" :title="name" class="rating">
                            <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" :alt="name" />
                            <span>{{ score }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {{ theMovie.Actors }}
                </div>
                <div>
                    <h3>Director</h3>
                    {{ theMovie.Director }}
                </div>
                <div>
                    <h3>Production</h3>
                    {{ theMovie.Production }}
                </div>
                <div>
                    <h3>Genre</h3>
                    {{ theMovie.Genre }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default{
    components: {
        Loader
    },
    data(){
        return{
            imageLoading : true
        }
    },
    computed: {
        ...mapState('movie', [
            'theMovie',
            'loading'
        ])

        //위에랑 같은 코드. 아래 코드를 mapState헬퍼써서 위 처럼 정리한거임! 근데 직관적인 코드를 더 추천함.
        // theMovie(){
        //     return this.$store.state.movie.theMovie
        // },
        // loading(){
        //     return this.$store.state.movie.loading
        // }
    },
    created(){
        this.$store.dispatch('movie/searchMovieWithId', {
            id : this.$route.params.id
        })
    },
    methods: {
        requestDiffSizeImage(url, size = 700) {
            if(!url || url === 'N/A'){
                this.imageLoading = false
                return ''
            }
            const src = url.replace('SX300', `SX${size}`)
            this.$loadImage(src)
            .then(() => {
                this.imageLoading = false
            })

            return src
        }
    }
}
</script>

<style lang="scss" scoped>

    .container {
        padding-top: 40px;

        .skeletons {
            display: flex;
            .poster {
                flex-shrink: 0;
                margin-right: 70px;
                width: 500px; height: 500px * 3 / 2;
            }
            .specs {
                flex-grow: 1;
            }
            .skeleton {
                background-color: $gray-200;
                border-radius: 10px;

                &.title {
                    width: 80%; height: 70px
                }
                &.spec{
                    margin-top: 20px;
                    width: 60%; height: 30px
                }
                &.plot{
                    margin-top: 20px;
                    width: 100%; height: 250px
                }
                &.etc{
                    margin-top: 20px;
                    width: 50%; height: 50px
                }
            }
        }
        .movie-details{
            display: flex;
            color: $gray-600;
            .poster{
                flex-shrink: 0;
                position: relative;
                margin-right: 70px;
                width: 500px; height: 500px * 3 / 2;
                background-color: $gray-200; border-radius: 10px;
                background-size: cover; background-position: center;
            }
            .specs{
                flex-grow: 1;
                .title{
                    margin-bottom: 30px;
                    font-family: 'Oswald', sans-serif; font-size: 70px; color: $black; line-height: 1;
                }
                .labels{
                    color: $primary;

                    span {
                        &::after {
                            content: '\00b7';
                            margin: 0 6px;
                        }
                        &:last-child::after {
                            display: none;
                        }
                    }
                }
                .plot{
                    margin-top: 20px;
                }
                .ratings{
                    .rating-wrap{
                        display: flex;
                        .rating{
                            display: flex; align-items: center;
                            margin-right: 32px;
                            img{
                                flex-shrink: 0;
                                margin-right: 6px;
                                height: 30px;
                            }
                        }
                    }
                }
                h3{
                    margin: 24px 0 6px;
                    color: $black; font-family: 'Oswald', sans-serif; font-size: 20px;
                }
            }

            @include media-breakpoint-down(xl) {
                .poster {
                    margin-right: 40px;
                    width: 300px; height: 300px * 3 / 2;
                }
            }

            @include media-breakpoint-down(lg){
                display: block;
                .poster {margin-bottom: 40px}
            }

            @include media-breakpoint-down(md){
                .specs {
                    .title {font-size: 50px;}
                }
                .rating {
                    .rating-wrap {
                        display: block;

                        .rating {margin-top: 10px;}
                    }
                }
            }
        }
    }
</style>