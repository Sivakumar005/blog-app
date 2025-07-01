import React from "react";
import logo from "../../assets/logo.png"
export const Navbar=()=>{
    return (
        <header className="flex gap-4 p-3 border-b-gray-300 bg-gray-800">
            <div className="w-12 h-12">
                <img src={logo} alt="logo" className="w-full h-full"/>
            </div>
            <h1 className="text-5xl font-bold text-orange-400">Vite<span className="text-white">Blog</span></h1>
        </header>
    )
}