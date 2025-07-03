export const findBloginImp = (important, id) => {
    return important.some(blog => blog.id === id);
}