import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from "react";
let scrollPosition = 0;
export const HeroHeader = (props = { maxHeight: 250, minHeight: 50, children: null }) => {
    const _containerDOM = useRef(null);
    const [height, setHeight] = useState(undefined)


    useEffect(() => {
        scrollPosition = window.pageYOffset || _containerDOM.current.scrollTop;
        window.addEventListener('scroll', onScroll)
        setHeight(props.scrollAction);
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        };
    })

    const onScroll = () => {
        var scrollValue = clamp(window.pageYOffset, 0, props.maxHeight) / props.maxHeight;
        var height = lerp(props.maxHeight, props.minHeight, scrollValue);
        setHeight(height);
        scrollPosition = _containerDOM.current.scrollTop;
    }


    return (
        <>
            <div className="hero" style={{ height: height + "px" }} ref={_containerDOM}>
                <div className='hero-content'>
                    {props.children}
                </div>
            </div>
            <div style={{ height: props.maxHeight + "px" }}>
            </div>
        </>
    )
}


const lerp = (a, b, t) => {
    Math.clamp
    return a + (b - a) * t;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);