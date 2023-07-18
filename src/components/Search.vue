<template>
    <div class="container">
        <!-- v-modal: 양방향 데이터 바인딩 -->
        <input v-model="title" class="form-control" @keyup.enter="apply" type="text" placeholder="Search for Movies, Series & more" />
        <div class="selects">
            <select v-for="filter in filters" v-model="$data[filter.name]" :key="filter.name" class="form-select">
                <option v-if="filter.name == 'year'" value="">All Years</option>
                <option v-for="item in filter.items" :key="item">{{ item }}</option>
            </select>
        </div>
        <button class="btn btn-primary" @click="apply">Apply</button>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                title : '',
                type : 'movie',
                number : 10,
                year : '',
                filters: [
                    {
                        name : 'type',
                        items : ['movie','series','episode']
                    },
                    {
                        name : 'number',
                        items : [10,20,30]
                    },
                    {
                        name : 'year',
                        items : (() =>{
                            const years = [];
                            const thisYear = new Date().getFullYear();

                            for(let i = thisYear; i >= 1985; i -= 1){
                                years.push(i);
                            }

                            return years
                        })() //즉시실행 함수
                    }
                ]
            }
        },
        methods: {
            async apply(){
                //Search Movies
                //Movie.js 안에 있는 searchMovies 실행
                this.$store.dispatch('movie/searchMovies', {
                    //payload
                    title: this.title,
                    type: this.type,
                    number: this.number,
                    year: this.year
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    .container {
        display: flex;
        > * {
            margin-right: 10px; font-size: 15px;
            &:last-child {margin-right: 0;}
        }

        input {border: 1px solid $gray-500; border-radius: 5px;}
        .selects { 
            display: flex;
            select {
                margin-right: 10px; width: 120px;
                border: 1px solid $gray-500; border-radius: 5px;
                &:last-child {margin-right: 0;}
            }
        }
        .btn {
            flex-shrink: 0; 
            width: 120px; height: 50px; 
            font-weight: 700;
            border-radius: 5px;
        }

        @include media-breakpoint-down(lg){
            display: block;
            input {
                margin-right: 0; margin-bottom: 10px;
            }
            .selects {
                margin-right: 0; margin-block: 10px;

                select {
                    width: 100%;
                }
            }
            .btn {width: 100%}
        }
    }

</style>