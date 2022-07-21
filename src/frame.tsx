/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [el, setEl] = useState<SVGSVGElement | null>(null);
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
            const parent = el.parentElement?.parentElement;

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
    const width = size?.width ?? 698;
    const height = size?.height ?? 130;

    return (
        <div className="frame">
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                className="frameIcon"
                ref={setEl}
            >
                <g filter="url(#filter0_bd_5508_16030)">
                    <rect
                        x="0.5"
                        y="0.5"
                        width={width - 1}
                        height={height - 1}
                        rx="12.5"
                        stroke="url(#paint1_linear_5508_16030)"
                        shapeRendering="crispEdges"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_bd_5508_16030"
                        x={width * -0.015}
                        y={height * -0.119}
                        width={width * 1.03}
                        height={height * 1.161}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImage" stdDeviation="10.2636" />
                        <feComposite
                            in2="SourceAlpha"
                            operator="in"
                            result="effect1_backgroundBlur_5508_16030"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy="5" />
                        <feGaussianBlur stdDeviation="5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.084375 0 0 0 0 0.533813 0 0 0 0 0.5625 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="effect1_backgroundBlur_5508_16030"
                            result="effect2_dropShadow_5508_16030"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect2_dropShadow_5508_16030"
                            result="shape"
                        />
                    </filter>
                    <linearGradient
                        id="paint1_linear_5508_16030"
                        x1={width * 0.037}
                        y1={height * -0.011}
                        x2={width * 0.174}
                        y2={height * 2.14}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="white" stopOpacity="0.5" />
                        <stop offset="0.376012" stopColor="white" stopOpacity="0" />
                        <stop offset="0.638319" stopColor="#4AF3FE" stopOpacity="0.34" />
                        <stop offset="0.953918" stopColor="#0EC1CC" stopOpacity="0.8" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
