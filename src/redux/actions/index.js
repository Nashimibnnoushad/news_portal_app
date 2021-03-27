import axios from 'axios';

// Get Exchange1 List
export const getSectionList = () => {
    // axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7`)
    //   .then(res => {
    //     const persons = res.data;
    //   })

      return async dispatch => {
        dispatch({ type: "GET_SECTION_REQUEST" })
        return axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7`)
            .then(res => {
                if(res.status === 200){
                dispatch({ type: "GET_SECTION_SUCCESS", payload: res.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_SECTION_FAILURE", payload: error.res }) })
    }
}

// Get Exchange2 List
export const getArticleList = (date) => {
    // axios.get(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`)
    //   .then(res => {
    //     const persons = res.data;
    //   })

      return async dispatch => {
        dispatch({ type: "GET_ARTICLE_REQUEST" })
        return axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7`)
            .then(res => {
              console.log(res,'res')

                if(res.status === 200){
                dispatch({ type: "GET_ARTICLE_SUCCESS", payload: res.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_ARTICLE_FAILURE", payload: error.res }) })
    }
}