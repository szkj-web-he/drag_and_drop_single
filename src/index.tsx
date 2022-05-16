import "./font";
import "./style.scss";

import { listenToParentIPC, render } from "./boilerplate";
import { Warehouse } from "./warehouse";
import React, { useEffect, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { Context } from "./context";
import { isMobile } from "./isMobile";
import { createPortal } from "react-dom";
import { deepCloneData, DragData, OptionProps } from "./unit";

listenToParentIPC();

const Main = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [selectItem, setSelectItem] = useState<DragData>();

    const status = useRef<
        { index: number; val: OptionProps }
    >();

    const [mobileStatus, setMobileStatus] = useState(isMobile);

    const [position, setPosition] = useState<{
        x: number;
        y: number;
    }>();

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
                    handleChange={(res) => { setSelectItem(deepCloneData(res)) }}
                    value={deepCloneData(selectItem)}
                />
                <StorageCabinet
                    handleChange={(res) => { setSelectItem(deepCloneData(res)) }}
                    value={deepCloneData(selectItem)}
                />
            </div>

            {!!position &&
                createPortal(
                    <div
                        className="floating"
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                        }}
                    >
                        {selectItem?.content}
                    </div>,
                    document.body
                )}
        </Context.Provider>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

render(<Main />);
