import React from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from "react";
let scrollPosition = 0;
export const HeroHeader = (props = { maxHeight: 250, minHeight: 50, children: null }) => {
    const _containerDOM = useRef(null);
    const [height, setHeight] = useState(undefined)
    const [scrollValue, setScrollValue] = useState(1)

    useEffect(() => {
        var scrollValue = clamp(window.pageYOffset, 0, props.maxHeight) / props.maxHeight;
        var height = lerp(props.maxHeight, props.minHeight, scrollValue);
        window.addEventListener('scroll', onScroll)
        setHeight(height);
        setScrollValue(scrollValue);
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        };
    })

    const onScroll = () => {
        var scrollValue = clamp(window.pageYOffset, 0, props.maxHeight) / props.maxHeight;
        var height = lerp(props.maxHeight, props.minHeight, scrollValue);
        setHeight(height);
        setScrollValue(scrollValue);
        scrollPosition = _containerDOM.current.scrollTop;
    }
    var style = {
        height: height + "px",
        maxHeight: props.maxHeight + "px",
    }

    return (
        <>
            <div className="hero" style={style} ref={_containerDOM}>
                <div className='hero-content'>
                    {typeof props.children === 'function' &&
                        props.children(scrollValue)
                    }
                    {typeof props.children !== 'function' &&
                        props.children
                    }
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