﻿import React, {useEffect, useRef, useState} from 'react';
import defaultProfileImage from "../../Images/DefaultProfileImage.jpg"
import {Link} from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import {useDetectClickOutside} from "react-detect-click-outside";
import {changeIsLogged} from "../../features/IsLogged";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "../../features/Theme";
import "./ThemeToggle.css";
import DarkModeToggle from "react-dark-mode-toggle";

function Profile(props) {

    const refProfileMenu = useRef(null);
    
    const dispatch = useDispatch();
    
    const theme = useSelector((state) => state.theme.value)

    const refClickOutsideProf = useDetectClickOutside(
        { onTriggered: closeProfileMenu });
    
    function closeProfileMenu() {
        refProfileMenu.current.classList.remove("expanded__active")
    }
    
    function toggleProfileMenu() {
        refProfileMenu.current.classList.toggle("expanded__active")
    }
    

    let logout = () => {
        fetch('/user/logOut', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("")})
            .then(() => {
                localStorage.removeItem("session")
                dispatch(changeIsLogged(false))
            });
        
    }
    
    const switchTheme = () => {
        refProfileMenu.current.classList.toggle("expanded__active")
        const newTheme = theme === 'light' ? 'dark' : 'light'
        if (newTheme === 'dark') {
            localStorage.setItem('theme', 'dark') 
        }
        else {
            localStorage.removeItem('theme')
        }
        dispatch(changeTheme(newTheme))
    }
    
    return (
        <div className="nav-item" onClick={toggleProfileMenu} ref={refClickOutsideProf}>
            <img src={defaultProfileImage} alt="" />
            <div className="expanded__profile-menu" ref={refProfileMenu}>
                <div className="profile-page-expanded-container">
                    <Link className="go__profile profile-link" to="/profile">
                        <AccountBoxIcon />
                        <span>Profile</span>
                    </Link>
                    <Link className="go__settings profile-link" to="/settings">
                        <SettingsIcon />
                        <span>Settings</span>
                    </Link>
                    <div className="dark-theme-toggle" onClick={switchTheme}>
                        <DarkModeToggle
                            checked={theme === 'dark'}
                            size={37}
                        />
                        Dark theme
                    </div>
                    <Link className="go__log-out profile-link" to="/list-of-events" onClick={logout}>
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;