//페이지 관리해주는 구성파일

import { createRouter, createWebHashHistory } from "vue-router"
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

export default createRouter({
    // hash모드, history 모드가 있는데 여기서는 hash 모드 사용.
    history : createWebHashHistory(),

    //페이지 이동하면 스크롤 위로 올리기
    scrollBehavior(){
        return {top: 0}
    },

    //pages
    routes: [
        {
            path: '/',
            component: Home
        }, 
        {
            path: '/movie/:id',
            component: Movie
        }, 
        {
            path: '/about',
            component: About
        },
        {
            //이름은 맘대로 해도 됨(정규표현식이 중요!)
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
})