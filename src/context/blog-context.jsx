import { createContext, useContext, useReducer } from "react";
import { BlogReducer } from "../reducers/blog-reducers";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const initialState = {
    title: "",
    content: "",
    posts: [],
    important: [],
  };

  const [state, BlogDispatch] = useReducer(BlogReducer, initialState);
  const { title, content, posts,important } = state;

  return (
    <BlogContext.Provider value={{ title, content, posts,important, BlogDispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export { BlogProvider, useBlog };
