/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useMContext } from "./context";
import { Product } from "./product";
import { ScrollComponent } from "./Scroll";
import { deepCloneData, OptionProps } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ItemProps {
    values?: OptionProps;
    index: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Item: React.FC<ItemProps> = ({ values, index }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile } = useMContext();
    const content = (
        <div className="scrollBody">
            <Product list={values ? [deepCloneData(values)] : []} index={index} />
        </div>
    );
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return isMobile ? (
        <div className="mobileScroll">{content}</div>
    ) : (
        <ScrollComponent hidden={{ x: true, y: false }}>{content}</ScrollComponent>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
