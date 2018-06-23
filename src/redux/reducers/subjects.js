// src/redux/reducers/articles.js
const initialState = {
    selectedSubjects: [],
    restSubjects: ["asdasd"]
}
export default (state = initialState, action) => {

    switch (action.type) {
        case 'LOAD_SUBJECTS':
            for (var i = 0; i < (action.data).length; i++) {
                for (var j = 0; j < ((action.data)[i].subjects).length; j++) {
                    ((action.data)[i].subjects[j])["isSelected"] = "false"
                }
            }
            console.log(action.data)
            return {
                ...state,
                restSubjects: action.data,
            }
        case 'PLUS_SUBJECT':
            var newSelectedSubjects = [...(state.restSubjects)]
            console.log("newSelectedSubjects" + newSelectedSubjects)

            for (var i = 0; i < (newSelectedSubjects).length; i++) {
                for (var j = 0; j < ((newSelectedSubjects)[i].subjects).length; j++) {
                    if (((newSelectedSubjects)[i].subjects[j])["subject_code"] == action.data.subject_code) {
                        ((newSelectedSubjects)[i].subjects[j])["isSelected"] = "true"
                    }

                }
            }
            console.log(newSelectedSubjects)
            console.log(state.restSubjects)
            return {
                ...state,
                restSubjects: newSelectedSubjects,
            }
        case 'MINUS_SUBJECT':
            var newSelectedSubjects = [...(state.restSubjects)]
            console.log("newSelectedSubjects" + newSelectedSubjects)

            for (var i = 0; i < (newSelectedSubjects).length; i++) {
                for (var j = 0; j < ((newSelectedSubjects)[i].subjects).length; j++) {
                    if (((newSelectedSubjects)[i].subjects[j])["subject_code"] == action.data.subject_code) {
                        ((newSelectedSubjects)[i].subjects[j])["isSelected"] = "false"
                    }

                }
            }
            console.log(newSelectedSubjects)
            console.log(state.restSubjects)
            return {
                ...state,
                restSubjects: newSelectedSubjects,
            }
        default:
            return { ...state }
        // case 'CLAP_ARTICLE':
        // let article = Object.assign({}, state.article)
        // article.claps++
        // console.log(article)
        // return {
        //     ...state,
        //     article: article
        // }
        // default:
        //     return state
    }
}