import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useBlog } from "../../context/blog-context";
import { useEffect } from "react";

const NewPost = () => {
    const { BlogDispatch, title, content, posts } = useBlog();

    const onTitleChange = (e) => {
        BlogDispatch({
            type: "TITLE",
            payload: e.target.value
        })
    }
    const onContentChange = (e) => {
        BlogDispatch({
            type: "CONTENT",
            payload: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        BlogDispatch({
            type:"ADD_POST",
            payload:{
                id:crypto.randomUUID(),
                title,
                content,
                createdAt:new Date().toISOString()
            }
        })
        BlogDispatch({
            type:"TITLE",
            payload:""
        })
        BlogDispatch({
            type:"CONTENT",
            payload:""
        })
        console.log("posts submitted");
        console.log(posts);
    }

    useEffect(() => {
        console.log("Title:", title);
        console.log("Content:", content);
    }, [title, content]);

    return (
        <>
            <Navbar />
            <main className="flex bg-gray-900 min-h-screen overflow-y-auto">
                <Sidebar />
                <div className="w-full max-w-5xl mx-auto mt-10 h-full px-6 pb-4 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 m-6">Create New Post</h2>

                    <form onSubmit={handleSubmit} className="space-y-2">

                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={onTitleChange}
                                placeholder="Enter your post title"
                                className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="content" className="block text-lg font-medium text-gray-700">
                                Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={onContentChange}
                                placeholder="Write your content here..."
                                rows={6}
                                className="mt-1 block w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>

                            <div className="text-sm text-gray-500 mt-1 text-right">
                                Word Count: {content.trim().split(/\s+/).filter(Boolean).length}
                            </div>
                        </div>


                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                disabled={!title || !content}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default NewPost;
