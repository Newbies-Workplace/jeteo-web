import React from "react";
import {config, useTransition, animated} from "react-spring";

interface AnimatedListProps {
    items: React.ReactNode[]
}

export const AnimatedList: React.FC<AnimatedListProps> = ({ items }) => {
    const listTransition = useTransition(items, {
        trail: 25,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.gentle,
    });

    return listTransition((style, item) =>
        <animated.div
            style={style}>
            {item}
        </animated.div>
    )
}