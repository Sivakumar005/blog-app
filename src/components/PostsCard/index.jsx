import React, { useEffect, useState } from "react";
import { useBlog } from "../../context/blog-context";
import { findBloginImp } from "../../utils/findBloginImp";

export const PostsCard = ({ title, content,id, createdAt }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentLimit = 200;
    const toggleContent = () => {
        setIsExpanded((prev) => !prev);
    };

    const {important,BlogDispatch}=useBlog();
    if(important.length>0){
        var isBlogInImp=findBloginImp(important,id);
    }

    const onImpClick=()=>{
        !isBlogInImp?BlogDispatch({
            type:"ADD_TO_IMP",
            payload:{id}
        }):BlogDispatch({
            type:"REMOVE_FROM_IMP",
            payload:{id}
        }); 
    }

    const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    useEffect(()=>{
        console.log("imporatant posts",important);
    },[important])

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md space-y-2">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="text-lg font-bold text-white truncate max-w-[60%]">
                    {title}
                </h3>

                <div className="flex items-center gap-2">
                    <button onClick={onImpClick} className="material-icons-outlined  cursor-pointer">
                        label_important
                    </button>
                    <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                        Edit
                    </button>
                    <button className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition">
                        Delete
                    </button>
                </div>
            </div>

            <p className="text-base text-gray-100">
                {isExpanded ? content : content.slice(0, contentLimit)}
                {content.length > contentLimit && !isExpanded && "..."}


                {content.length > contentLimit && (
                    <button
                        onClick={toggleContent}
                        className="text-blue-400 hover:underline text-sm font-medium mt-2"
                    >
                        {isExpanded ? "Show Less" : "Read More"}
                    </button>
                )}
            </p>
            <p className="text-sm text-gray-400">{formattedDate}</p>

        </div>
    );
};
