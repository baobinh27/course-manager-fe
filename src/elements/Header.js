import {Link} from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import {FaAngleDown, FaAngleRight, FaUserCircle} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

function Header() {
    const [nameInput, setNameInput] = useState("");
    const { isLoggedIn, userInfo } = useAuth();
    const [showMenu, setShowMenu] = useState(false); 
    const navigate = useNavigate();

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    
    return <header className={styles.header}> 
        <Link to="/"><button className={styles["nav-btn"]}>Trang chủ</button></Link>
        <div className={styles["explore-box"]}>
            <Link to="/explore"><button className={`${styles["nav-btn"]} ${styles.explore}`}>Khám phá</button></Link>
            <ul type="none" className={styles["explore-menu"]}>
                <li>Python</li>
                <li>Javascript</li>
            </ul>
        </div>
        

        <div id={styles["search-box"]}>
            <input 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)} 
                type="text" 
                id={styles["search-bar"]} 
                placeholder="Tìm kiếm bất kỳ thứ gì..." 
            />
            {nameInput ? 
            <Link to={`/search?name=${nameInput}`}>
                <button 
                    onClick={() => setNameInput("")} 
                    id={styles["search-btn"]} 
                    style={{display: "flex", justifyItems: "center", alignItems: "center"}}
                >
                    <FaAngleRight className={styles.icon} />
                </button>
            </Link> : <button 
                disabled
                onClick={() => setNameInput("")} 
                id={styles["search-btn"]} 
                style={{display: "flex", justifyItems: "center", alignItems: "center"}}
            >
                <FaAngleRight className={styles.icon} />
            </button>}
            
            
        </div>
        <Link to="/teaching"><button className={styles["nav-btn"]}>Giảng dạy</button></Link> 
        <Link to="/my-courses"><button className={styles["nav-btn"]}>Khoá học của tôi</button></Link> 
        {isLoggedIn ? (
            <div className={`${styles["user-area"]} flex-row align-center`}>
                <button onClick={handleToggleMenu} className={`${styles["nav-btn"]} flex-row align-center`}>
                    <FaUserCircle />
                    <p className="h5">{userInfo.username}</p>
                    <FaAngleDown />
                </button>
                
                {showMenu && <div className={`${styles.menu}`}>
                    <button onClick={handleLogout} style={styles.button}>Đăng xuất</button>
                </div>}
                
            </div>
        ) : <button onClick={handleLogin} id={styles["login-btn"]}>Đăng nhập</button>}
    </header>
}

export default Header;