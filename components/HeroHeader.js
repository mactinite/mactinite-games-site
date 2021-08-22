import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from "react";
let scrollPosition = 0;
export const HeroHeader = (props = { scrollAction: 250, children: null }) => {
    const _containerDOM = useRef(null);
    const [height, setHeight] = useState(undefined)
    

    useEffect(() => {
        
        window.addEventListener('scroll', onScroll)
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        };
    })

    const onScroll = () => {
        const scrollTop = window.pageYOffset || _containerDOM.current.scrollTop;
        if (props.scrollAction >= scrollTop) {
            const step = scrollPosition - scrollTop;
            const actualHeight = _containerDOM.current.offsetHeight;
            const height = actualHeight + step;
            setHeight(height);
            scrollPosition = scrollTop;
        }
    }
    return (
        <>
            <div className="hero" style={{ height: height + "px" }} ref={_containerDOM}>
                <div className='hero-content'>
                    {props.children}
                </div>
            </div>
            <div style={{ height: props.scrollAction + "px" }}>
            </div>
        </>
    )
}
