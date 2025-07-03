import { v4 as uuid } from "uuid"

export const BlogReducer = (state, { type, payload }) => {
    switch (type) {
        case "TITLE":
            return {
                ...state,
                title: payload
            }
        case "CONTENT":
            return {
                ...state,
                content: payload
            }
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts,payload],
            };
        case "ADD_TO_IMP":
            return{
                ...state,
                important:[...state.important,state.posts.find(({id})=>id===payload.id)]
            }
        case "REMOVE_FROM_IMP":
            return{
                ...state,
                important:state.important.filter(({id})=>id!==payload.id)
            }

        default:
            return state;
    }
}