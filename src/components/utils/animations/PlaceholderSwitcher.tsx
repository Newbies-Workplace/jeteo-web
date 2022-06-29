import React from 'react';
import {animated, useTransition} from "react-spring";

interface PlaceholderSwitcherProps {
    children: React.ReactNode
    placeholder: React.ReactNode
    loading: boolean
}

export const PlaceholderSwitcher: React.FC<PlaceholderSwitcherProps> = ({
    children,
    placeholder,
    loading
}) => {

    const loaderTransition = useTransition(loading, {
        from: { opacity: 1 },
        to: { opacity: 1},
        leave: {opacity: 0},
    });

    return (
        <div style={{position: "relative"}}>
            {loaderTransition(({ opacity }, loading) =>
                loading ? (
                    <animated.div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                        }}>
                        {placeholder}
                    </animated.div>
                ) : (
                    <animated.div
                        style={{
                            width: '100%',
                            opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
                        }}>
                        {children}
                    </animated.div>
                ))}
        </div>
    );
}