import Link from "next/link";
import * as css from "./card.module.css";
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import GameCartridge from '../GameCart/GameCartridge'
export function Card({ url = "", title = "", subhead = "", summary = "", imageUrl = "https://picsum.photos/350/350" }) {

    const [{ x, y }, dragSpring] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
        dragSpring.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    })

    return (
        <animated.div
            {...bind()}
            style={{ x, y }}
        >
            
            <GameCartridge/>
            {/* <div className={`${css.cartridgeBrand}`}>mactinite<b>boy</b></div>
            <div className={`${css.cartridgeLabel}`} style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", x, y }}>
                
            </div> */}
            {/* <animated.div
                    className={`${css.content}`}
                    style={{
                        overflow: "hidden",
                    }}
                >
                <div className="transform rotate-15 mb-4">
                    <h2 className="text-xl">{title}</h2>
                </div>
                <p className="text-xs">
                    {subhead}
                </p>
                <div className="text-sm">
                    {summary}
                </div>
            </animated.div> */}
        </animated.div>
    );
}