import { useBlog } from "../../context/blog-context";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { PostsCard } from "../../components/PostsCard";

export const Posts = () => {
    const { posts } = useBlog();

    return (
        <>
            <Navbar />
            <main className="flex flex-col md:flex-row bg-gray-900 min-h-screen overflow-y-auto">
                <aside className="hidden md:block">
                    <Sidebar />
                </aside>

                <div className="w-full md:max-w-5xl h-full mx-auto mt-6 md:mt-10 px-4 sm:px-6 lg:px-8 pb-8 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 my-4 md:my-6 text-center md:text-left">
                        Posts
                    </h2>

                    {posts.length === 0 && (
                        <p className="text-gray-600 text-center py-8 text-lg">No posts created yet!</p>
                    )}

                    <div className="space-y-4">
                        {posts.map(({ content, title, id, createdAt }) => (
                            <PostsCard
                                key={id}
                                id={id}
                                title={title}
                                content={content}
                                createdAt={createdAt}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};
