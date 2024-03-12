import React from "react";
import "./BackButton.css";

const BackButton = () => {
    return (
        <div className="back-button" onClick={() => window.history.back()}>Back</div>
    );
}
export default BackButton;