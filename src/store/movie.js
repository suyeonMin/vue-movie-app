import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

const _defaultMsg = 'Search for the movie title!'

export default {
    //module 명명화
    namespaced : 'true',
     //처리할 데이터
    state : () => ({
        movies: [],
        message: _defaultMsg,
        loading: false,
        theMovie: {}
    }),
    //계산된 데이터 만듬
    getters: {},           
    //메소드
    //mutations: 변이. 이 안에서만 데이터 변경 가능. (여기 제외한 다른곳에서는 변경x)
    //actions: 비동기.
    mutations: {
        updateState(state, payload){
            //keys(): 속성의 데이터만 가지고 하나의 배열데이터를 생성
            //['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMsg
            state.loading = false
        }
    },
    actions: {
        async searchMovies({state, commit}, payload){
            if(state.loading){
                return
            }

            //검색 전 메세지 초기화
            commit('updateState', {
                message : '',
                loading: true
            })

            try{
                const res = await _fetchMovie({
                    ...payload,
                    page : 1
                })
                const {Search, totalResults} = res.data;
    
                //변이메소드
                commit('updateState', {
                    //중복되는 id값 제거(같은 영화 출력되는 거 방지)
                    movies: _uniqBy(Search, 'imdbID')
                })
    
                const total = parseInt(totalResults, 10);   //10진수 숫자데이터로 변환
                const pageLength = Math.ceil(total / 10);
    
                //추가요청!
                if(pageLength > 1){
                    for(let p = 2; p <= pageLength; p += 1){
                        if(p > payload.number / 10){
                            //1페이지(10개 가져온 상황)에서는 추가 요청 하지 않는다.
                            break;
                        }
                        const res = await _fetchMovie({
                            ...payload,
                            p: p
                        })
                        const {Search} = res.data;
                        commit('updateState', {
                            //전개연산자: ... 붙여서 넣으면 객체 안의 내용만 새로운 배열에 삽입함. 안 그러면 n차 객체되버림!
                            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
                        })
                    }
                }
            }catch(message){
                commit('updateState', {
                    movies: [],
                    message : message
                })
            }finally{
                commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId({ state, commit }, payload){
            if(state.loading) return

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try{
                const res = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie: res.data
                })
            }catch(error){
                commit('updateState', {
                    theMovie: {}
                })
            }finally{
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

function _fetchMovie(payload){
    const {title, type, year, page, id} = payload
    const API_KEY = '429579cf';
    const url = id
    ? `http://www.omdbapi.com/?apikey=${API_KEY}$i=${id}`
    : `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((res)=> {
                //서버에서는 정상인데 에러메세지가 뜬다면 then에서 reject 뜨게 예외처리.
                if(res.data.Error){
                    reject(res.data.Error)
                }
                resolve(res)
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}