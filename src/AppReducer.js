export default (state, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...action.payload
            };
        case "SEARCH":
            const searchResult = state.data.filter(item => (
                item.first_name.includes(action.payload),
                item.last_name.includes(action.payload),
                item.email.includes(action.payload))
            )
            return {
                ...state,
                search: action.payload,
                searchResult: searchResult,
                pagination: { ...state.pagination, total: searchResult.length }
            };
        case "CURRENT_PAGE":
            return {
                ...state,
                pagination: { ...state.pagination, current: action.payload }
            };
        case "ADD":
            return {
                ...state,
                data: [action.payload, ...state.data],
                searchResult: [action.payload, ...state.searchResult],
            };
        case "EDIT":
            let rows = [...state.data]
            let index = rows.findIndex(users => users.id === action.payload.id)
            rows[index].first_name = action.payload.first_name;
            rows[index].last_name = action.payload.last_name;
            rows[index].email = action.payload.email;
            return {
                ...state,
                data: rows
            };
        case "REMOVE":
            return {
                ...state,
                data: state.data.filter(user => user.id !== action.payload),
                searchResult: state.searchResult.filter(user => user.id !== action.payload)
            };
        case "SHOW_MODAL":
            return {
                ...state,
                currentUser: action.payload,
                visibleModal: true
            };
        case "HIDE_MODAL":
            return {
                ...state,
                visibleModal: false,
                currentUser: { first_name: "", last_name: "", email: "" },
                pagination: { ...state.pagination, total: state.data.length }
            };
        default:
            return state;
    }
};