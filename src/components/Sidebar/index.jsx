import { NavLink } from "react-router-dom"
import React from "react"
export const Sidebar = () => {
    const getStyles = ({ isActive }) => {
        return isActive ? 'text-slate-50 bg-orange-500 flex align-center gap-1 px-3 py-3 rounded-tr-full rounded-br-full' : 'hover:bg-orange-500 hover:text-slate-50 flex align-center gap-1 px-3 py-3 rounded-tr-full rounded-br-full text-white'
    }
    return (
        <aside className="flex flex-col gap-3 border-r-2 p-5  border-gray-200 w-56 h-screen overflow-hidden bg-gray-900">
            <NavLink className={getStyles} to="/">
                <span className="material-icons-outlined">
                    home
                </span>
                <span className="font-semibold">Dashboard</span>
            </NavLink>
            <NavLink className={getStyles} to="/posts">
                <span className="material-symbols-outlined">
                    post
                </span>
                <span className="font-semibold">Posts</span>
            </NavLink>
            <NavLink className={getStyles} to="/important"><span className="material-icons-outlined">
                label_important
            </span>
                <span className="font-semibold">Important</span>
            </NavLink>
            <NavLink className={getStyles} to="/profile"><span className="material-icons-outlined">
                delete
            </span>
                <span className="font-semibold">Profile</span>
            </NavLink>
        </aside>
    )
}