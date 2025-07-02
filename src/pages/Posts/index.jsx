import { useBlog } from "../../context/blog-context";
import { Navigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { PostsCard } from "../../components/PostsCard";

export const Posts = () => {
    const { posts } = useBlog();
    return (
        <>
            <Navbar />
            <main className="flex bg-gray-900 min-h-screen overflow-y-auto">
                <Sidebar />
                <div className="w-full max-w-5xl mx-auto mt-10 h-full px-6 pb-4 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 m-6">Posts</h2>
                    {
                        posts.length < 0 && (<p>No posts created yet!!!</p>)
                    }
                    <div>
                        {
                            posts?.length > 0 && posts.map(({ content, title, id, createdAt }) => (
                                <PostsCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    content={content}
                                    createdAt={createdAt}
                                />
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}