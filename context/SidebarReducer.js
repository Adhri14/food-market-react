import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [toggleMenu, setToggleMenu] = useState('');
    return (
        <SidebarContext.Provider value={{ toggleMenu, setToggleMenu }}>{children}</SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext);

export default SidebarProvider;