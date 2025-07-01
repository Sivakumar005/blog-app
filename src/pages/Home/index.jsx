import React from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import NewPost from "../Newpost";

export const Home = () => {
    const navigate = useNavigate();
    const onCreatePostClick = () => {
        navigate("/newpost");
    }

    return (
        <>
            <Navbar />
            <main className="bg-gray-900 min-h-screen flex flex-col overflow-y-hidden">
                <div className="flex flex-1">
                    <Sidebar />
                    <div className="flex-1 p-4 text-white">
                        <h1 className="text-2xl font-semibold">Welcome to Home</h1>
                    </div>
                    <div className="p-4">
                        <button
                            className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
                            onClick={onCreatePostClick}
                        >
                            New Post
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};
