/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { ConfigYML } from "@possie-engine/dr-plugin-sdk/config/yml";
import { PluginComms } from "@possie-engine/dr-plugin-sdk/pluginComms";
import React from "react";
import { Product } from "./product";
import { deepCloneData, DragData, OptionProps } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
const comms = new PluginComms({ defaultConfig: new ConfigYML() });

const options = comms.getConfigNode('options')[1] as Array<OptionProps>;

// const fruits = options.map(item => { const key = Object.keys(item)[0]; return item[key] });

/** This section will include all the interface for this tsx file */
export interface WarehouseProps {
    handleChange: (res: DragData | undefined) => void;
    value?: DragData;

}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Warehouse: React.FC<WarehouseProps> = ({
    handleChange,
    value,
}) => {

    const handleUp = () => {
        handleChange(undefined);
    }

    return (
        <div className="warehouse_wrap">
            <div className="warehouse_total">
                共
                <span
                    className={`warehouse_totalVal${options.length ? "" : " red"}`}
                >
                    {options.length}
                </span>
                项
            </div>
            <div className="warehouse_items" >
                <Product list={options} placement="warehouse" handleChange={handleChange} value={deepCloneData(value)} onUp={handleUp} />
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
