const initialState = {
    allSubjects: [],
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_ALL_SUBJECTS':
            console.log(action.data)
            var selectedSubjects = action.data
            const l = selectedSubjects.length
            if (selectedSubjects.length > 0) {
                for (var i = 0; i < l; i++) {
                    var repeatcount = ((selectedSubjects[i]).repeat).length
                    var normalcount = ((selectedSubjects[i]).normal).length
                    var total = repeatcount + normalcount
                    var count = {
                        "repeats": repeatcount,
                        "normals": normalcount,
                        "total": total
                    }
                    selectedSubjects[i]["count"] = count
                    selectedSubjects[i]["isVisible"] = false

                }
            }

            return {
                ...state,
                allSubjects: selectedSubjects,
            }

        case "ADD_SUBJECTS":
            
            return {
                ...state,
                allSubjects: [action.data],
            }


        default:
            return { ...state }
    }
}