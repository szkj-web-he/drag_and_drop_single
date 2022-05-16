/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import { useMContext } from "./context";
import { Product } from "./product";
import { ScrollComponent } from "./Scroll";
import { deepCloneData, DragData, OptionProps } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ItemProps {
    handleChange: (res: DragData | undefined) => void;
    value?: DragData;
    values?: OptionProps;
    onUp: (res: OptionProps | undefined) => void;
    index: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Item: React.FC<ItemProps> = ({ handleChange, value, values, onUp, index }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { isMobile } = useMContext();

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return isMobile ? (
        <div className="mobileScroll">
            <Product
                list={values ? [deepCloneData(values)] : []}
                handleChange={handleChange}
                value={deepCloneData(value)}
                index={index}
                onUp={onUp}
                placement="storageCabinet"
            />
        </div>
    ) : (
        <ScrollComponent>
            <Product
                list={values ? [deepCloneData(values)] : []}
                handleChange={handleChange}
                value={deepCloneData(value)}
                index={index}
                onUp={onUp}
                placement="storageCabinet"
            />
        </ScrollComponent>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
