import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import gsap from "gsap";

import Header from "./components/header";
import "./styles/App.scss";

// components

import CaseStudies from "./pages/caseStudies";
import Approach from "./pages/approach";
import Services from "./pages/services";
import About from "./pages/about";
import Home from "./pages/home";
import Navigation from "./components/navigation";

const routes = [
  { path: '/', name:'Home', Component: Home},
  { path: '/case-studies', name:'Case Studies', Component: CaseStudies},
  { path: '/approach', name:'Approach', Component: Approach},
  { path: '/services', name:'Services', Component: Services},
  { path: '/about-us', name:'About Us', Component: About},
  
];

function debounce(fn, ms){
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms)
  }
}

function App() {

    // prevent flashing
    gsap.to("body", 0, { css: { visibility: 'visible'} });

  const [dimension, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  useEffect(() => {
    let vh = dimension.height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const debouncedHandleResize = debounce(function handleResize(){
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <>
      <Header dimension={dimension}/>
      <div className="App">
        <Routes>
          {routes.map(({path, Component}) => (
              <Route key={path} path={path} element={<Component/>}></Route>
            ))}
        </Routes>
  
      </div>
      <Navigation/>
    </>
  );
}

export default App;
