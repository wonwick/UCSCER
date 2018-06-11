// src/redux/reducers/articles.js
const initialState = {
    selectedSubjects: [],
    restSubjects: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_SUBJECTS' :
        return {
            ...state,
            restSubjects:action.data,
        }
        case 'UNREGISTER' :
        var newSelectedSubjects=state.selectedSubjects.filter(function(subject){ return subject.subject_code!=action.subject_code });
        var newRestSubjects=state.restSubjects.push(action.subject)
        return {
            selectedSubjects:newSelectedSubjects,
            restSubjects:newRestSubjects,
        }
        case 'REGISTER':
        var newRestSubjects=state.restSubjects.filter(function(subject){ return subject.subject_code!=action.subject_code });
        var newSelectedSubjects =state.selectedSubjects.push(action.subject)
        return {
            selectedSubjects:newSelectedSubjects,
            restSubjects:newRestSubjects,
        }
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