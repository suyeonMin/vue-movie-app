export default{
    namespaced : true,

    //state: 데이터의 불변성을 위해 함수로 만들어 반환한다.
    state: () => {
        return {
            name : 'HEROPY',
            email: 'sy.min@xxxx.com',
            blog: 'https://www.portFolio.com',
            phone: '+82-10-xxx-xxxx'
            // image: 
        }
    }
}