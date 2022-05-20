import "./font";
import "./style.scss";

import { Warehouse } from "./warehouse";
import React, { useEffect, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { Context } from "./context";
import { isMobile } from "./isMobile";
import { deepCloneData, DragData, OptionProps, PointProps } from "./unit";

import { ConfigYML } from "@possie-engine/dr-plugin-sdk/config/yml";
import { PluginComms } from "@possie-engine/dr-plugin-sdk/pluginComms";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
});

const Main = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [selectItem, setSelectItem] = useState<DragData>();

    const status = useRef<{ index: number; val: OptionProps }>();

    const [mobileStatus, setMobileStatus] = useState(isMobile);

    const [position, setPosition] = useState<PointProps>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            setMobileStatus(isMobile);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <Context.Provider
            value={{
                mouseUpOnStorage: status,
                isMobile: mobileStatus,
                position,
                setPosition,
            }}
        >
            <div className="wrapper">
                <Warehouse
                    handleChange={(res) => {
                        setSelectItem(deepCloneData(res));
                    }}
                    value={deepCloneData(selectItem)}
                />
                <StorageCabinet
                    handleChange={(res) => {
                        setSelectItem(deepCloneData(res));
                    }}
                    value={deepCloneData(selectItem)}
                />
                {!!position && (
                    <div
                        className="floating"
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: `${position.width}px`,
                            height: `${position.height}px`,
                        }}
                    >
                        {selectItem?.content}
                    </div>
                )}
            </div>
        </Context.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
