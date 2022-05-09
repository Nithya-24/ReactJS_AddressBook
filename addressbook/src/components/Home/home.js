import React from "react";
import "./home.css";
import logo from "../../assets/logo.png";

export default function Home() {
    return (
        <header className="header-content header">
            <div className="logo-content">
                <img src={logo} alt="logo" />
                <div>
                    <span className="addressBook-text">Address</span><br />
                    <span className="addressBook-text addressBook-book">Book</span>
                </div>
            </div>
        </header>
    )
}
