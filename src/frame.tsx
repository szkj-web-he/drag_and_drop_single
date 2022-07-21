/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    className?: string;
    style?: React.CSSProperties;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ className, style }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [el, setEl] = useState<SVGElement | null>(null);
    const [size, setSize] = useState<{
        width: number;
        height: number;
    }>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const fn = () => {
            if (!el) {
                return;
            }
            const parent = el.parentElement;

            if (parent instanceof HTMLElement) {
                setSize({
                    width: parent.offsetWidth,
                    height: parent.offsetHeight,
                });
            }
        };
        fn();
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, [el]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const width = size?.width ?? 680;
    const height = size?.height ?? 220;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={`frame${className ? ` ${className}` : ""}`}
            width={width}
            height={height}
            style={style}
            fill="none"
            ref={setEl}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_b_4311_9017)">
                <rect
                    width={width}
                    height={height}
                    rx="12"
                    fill="url(#paint0_linear_4311_9017)"
                    fillOpacity="0.3"
                />
                <rect
                    x="0.5"
                    y="0.5"
                    width={width - 1}
                    height={height - 1}
                    rx="11.5"
                    stroke="url(#paint1_linear_4311_9017)"
                    strokeOpacity="0.6"
                />
            </g>
            <defs>
                <filter
                    id="filter0_b_4311_9017"
                    x="-10"
                    y="-10"
                    width={width + 20}
                    height={height + 20}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
                    <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_4311_9017"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_4311_9017"
                        result="shape"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_4311_9017"
                    x1={width - 41 + 0.941}
                    y1="2.09568e-06"
                    x2={width - 1 + 0.812}
                    y2={height - 3 + 0.072}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#D0F1FF" stopOpacity="0.8" />
                    <stop offset="0.971139" stopColor="#80E0FF" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_4311_9017"
                    x1={width + 10.515}
                    y1={height - 41 + 0.5}
                    x2={width - 7 + 0.835}
                    y2="-86.1224"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#368CDC" stopOpacity="0.99" />
                    <stop offset="1" stopColor="#84BCFF" stopOpacity="0.8" />
                </linearGradient>
            </defs>
        </svg>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
