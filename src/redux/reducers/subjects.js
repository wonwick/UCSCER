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
            return {
                ...state,
                restSubjects: action.data,
            }

        case 'LOAD_SELECTED':
            var newSelectedSubjects=action.StudentData.exams

            return {
                ...state,
                selectedSubjects: newSelectedSubjects
            }

        case 'PLUS_SUBJECT':
            var newRestSubjects = [...(state.restSubjects)]
            var newSelectedSubject = ""
            for (var i = 0; i < (newRestSubjects).length; i++) {
                for (var j = 0; j < ((newRestSubjects)[i].subjects).length; j++) {
                    if (((newRestSubjects)[i].subjects[j])["subject_code"] == action.data.subject_code) {
                        ((newRestSubjects)[i].subjects[j])["isSelected"] = "true"
                        newSelectedSubject = {
                            "academic_year": (newRestSubjects)[i].academic_year,
                            "semester": (newRestSubjects)[i].semester,
                            "subject_code": ((newRestSubjects)[i].subjects[j])["subject_code"],
                            "year": (newRestSubjects)[i].year,
                            "subject_name":((newRestSubjects)[i].subjects[j])["subject_name"]
                        }
                        state.selectedSubjects.push(newSelectedSubject)
                    }

                }
            }
            console.log("selectedSubjects")
            console.log(state.selectedSubjects)
            console.log("END of selectedSubjects")

            console.log(state.restSubjects)
            return {
                ...state,
                restSubjects: newRestSubjects,
            }
        case 'MINUS_SUBJECT':
            var newRestSubjects = [...(state.restSubjects)]
            console.log("newRestSubjects" + newRestSubjects)


            for (var i = 0; i < (newRestSubjects).length; i++) {
                for (var j = 0; j < ((newRestSubjects)[i].subjects).length; j++) {
                    if (((newRestSubjects)[i].subjects[j])["subject_code"] == action.data.subject_code) {
                        ((newRestSubjects)[i].subjects[j])["isSelected"] = "false"

                        state.selectedSubjects = (state.selectedSubjects).filter(function (subject) {
                            return subject.subject_code !== action.data.subject_code;
                        });
                    }

                }
            }
            console.log(newRestSubjects)
            console.log(state.restSubjects)
            return {
                ...state,
                restSubjects: newRestSubjects,
            }

        case 'REGISTER':
            console.log("REGISTER in subject")
            var newRestSubjects = action.data.exams
            return {
                ...state,
                selectedSubjects: action.data.exams
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