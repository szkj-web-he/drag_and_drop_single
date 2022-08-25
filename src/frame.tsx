/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { drawRoundRect } from "./unit";
import { useRef } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<{ type: "top" | "bottom" }> = ({ type }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [el, setEl] = useState<HTMLCanvasElement | null>(null);
    const timer = useRef<number>();

    const elRef = useRef(el);

    const typeRef = useRef(type);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useLayoutEffect(() => {
        elRef.current = el;
    }, [el]);

    useLayoutEffect(() => {
        typeRef.current = type;
    }, [type]);

    useLayoutEffect(() => {
        if (el) {
            timer.current && window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                timer.current = undefined;

                drawRoundRect(el, type);
            });
        }
    }, [el, type]);

    useEffect(() => {
        const fn = () => {
            timer.current && window.clearTimeout(timer.current);

            timer.current = window.setTimeout(() => {
                if (!elRef.current) {
                    return;
                }
                drawRoundRect(elRef.current, typeRef.current);
                timer.current = undefined;
            });
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <>
            <div className="frame" />
            <canvas
                className="frameBorder"
                ref={(el) => {
                    setEl(el);
                }}
            />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
