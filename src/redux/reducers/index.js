const NewsPortalReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Section data
        case "GET_SECTION_REQUEST":
            return { ...state, Loading: true }

        case "GET_SECTION_SUCCESS":
            return { ...state, sectionList: action.payload.results, Loading: false, sectionListError: "" }

        case "GET_SECTION_FAILURE":
            return { ...state, sectionListError: action.payload, sectionList: "", Loading: false }

        // Get Article data
        case "GET_ARTICLE_REQUEST":
            return { ...state, Loading: true }

        case "GET_ARTICLE_SUCCESS":
            return { ...state, articleList: action.payload.results, Loading: false, articleListError: "" }

        case "GET_ARTICLE_FAILURE":
            return { ...state, articleListError: action.payload, articleList: "", Loading: false }

        default: {
            return state
        }
    }

}

export default NewsPortalReducer