import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store'    //index.js 파일은 명명 생략 가능(우선적으로 찾음)
import loadImage from './plugins/loadImage'

createApp(App).use(router).use(store).use(loadImage).mount('#app') //use() : 라이브러리, 플러그인 사용하기 위한 메소드.