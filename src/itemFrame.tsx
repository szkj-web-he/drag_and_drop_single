/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { drawItemRoundRect } from "./unit";
import { useLayoutEffect } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    style?: React.CSSProperties;
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ style, className }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [el, setEl] = useState<HTMLCanvasElement | null>(null);

    const elRef = useRef(el);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        elRef.current = el;
        if (el) {
            drawItemRoundRect(el);
        }
    }, [el]);

    useEffect(() => {
        let timer: null | number = null;
        const fn = () => {
            timer && window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                const node = elRef.current;
                timer = null;
                if (!node) {
                    return;
                }

                drawItemRoundRect(node);
            });
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
            timer && window.clearTimeout(timer);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <>
            <canvas className={className} style={style} ref={(el) => setEl(el)} />
            <div className="triangle" />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
