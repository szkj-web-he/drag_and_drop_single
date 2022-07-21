/**
 * @file
 * @date 2022-07-18
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { ReactNode } from "react";
import { createElement } from "react";
import lt from "../Assets/img/icon_lt.png";
import rb from "../Assets/img/icon_rb.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    isActive?: boolean;
    children?: ReactNode;
    title?: string;
    index: number;
    tag?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ isActive, children, title, index, tag }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    const content = (
        <>
            <img alt="" src={lt} className="storageCabinet_itemBg_lt" />
            <img alt="" src={rb} className="storageCabinet_itemBg_rb" />
            <div className="storageCabinet_itemTitle">{title}</div>
            <div className="storageCabinet_itemValues">{children}</div>
        </>
    );
    return createElement(
        tag ?? "div",
        {
            className: `storageCabinet_item${isActive ? " active" : ""}`,
            "data-i": index,
        },
        content,
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
