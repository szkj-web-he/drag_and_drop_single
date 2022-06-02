/**
 * @file 箭头
 */

/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps extends React.SVGAttributes<SVGSVGElement> {
    borderColor?: string;
    fillColor?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({
    borderColor = "#453C5E",
    fillColor = "#B8B7BA",
    ...props
}) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <svg viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M16.5973 3.9857L8.7735 4.43306C8.67686 4.43728 8.5923 4.35709 8.5923 4.25158V2.5128C8.5923 1.2889 7.27558 0.571447 6.32126 1.28046L4.26765 2.79979L1.61004 4.76646C0.796653 5.36997 0.796653 6.63186 1.61004 7.23536L4.26765 9.20204L6.32126 10.7214C7.27558 11.4262 8.5923 10.7129 8.5923 9.48902V7.71648C8.5923 7.61097 8.67686 7.53078 8.7735 7.535L16.5933 8.01613C16.8148 8.02879 17 7.80511 17 7.52234V4.47948C17 4.19672 16.8148 3.97304 16.5973 3.9857Z"
                fill={fillColor}
                stroke={borderColor}
                strokeWidth="0.479078"
                strokeMiterlimit="10"
            />
        </svg>
    );
};
export default Temp;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
