import React from "react";
import "./SplashScreen.css";
import Image from "./assets/splashImg.png";

function SplashScreen() {
  return (
    <div
      className="splash_screen"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "navyBlue",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "pink",
        backgroundImage: `url(${Image})`,
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f063748a",
          backdropFilter: "blur(3px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="splash_h1">
          <span>G</span>
          <span>r</span>
          <span>o</span>
          <span>c</span>
          <span>e</span>
          <span>r</span>
          <span>l</span>
          <span>y</span>
        </h1>
        <br />

        <marquee
          behavior="scroll"
          direction="left"
          style={{
            width: "60vw",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "normal",
              color: "#ffffff",
              fontFamily: "cursive",
              textShadow: "2px 2px 4px #d09898",
            }}
          >
            Never Forget What To buy
          </div>
        </marquee>
      </div>
    </div>
  );
}

export default SplashScreen;
