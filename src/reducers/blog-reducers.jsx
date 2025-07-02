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

        default:
            return state;
    }
}