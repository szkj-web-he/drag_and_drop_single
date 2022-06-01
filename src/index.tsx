import "./font";
import "./style.scss";

import { Warehouse } from "./warehouse";
import React, { useEffect, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { Context } from "./context";
import { isMobile } from "./isMobile";
import { deepCloneData, DragData, OptionProps, PointProps } from "./unit";
import leftHr from "./Assets/svg/leftHr.svg";
import rightHr from "./Assets/svg/rightHr.svg";
import spider from "./Assets/svg/spider.svg";
import pumpkin from "./Assets/svg/pumpkin.svg";

import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        options?: Array<Array<{ code: string; content: string }>>;
    };
    state: unknown;
    renderOnReady: (res: React.ReactNode) => void;
};

const Main: React.FC = () => {
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
        <div className="wrapper">
            <div className="question">
                <div
                    className="questionContent"
                    dangerouslySetInnerHTML={{
                        __html: comms.config.question ?? "",
                    }}
                />
                <div
                    className="questionDes"
                    dangerouslySetInnerHTML={{
                        __html: `(${comms.config.instruction ?? ""})`,
                    }}
                />
            </div>
            <Context.Provider
                value={{
                    mouseUpOnStorage: status,
                    isMobile: mobileStatus,
                    position,
                    setPosition,
                }}
            >
                <Warehouse
                    handleChange={(res) => {
                        setSelectItem(deepCloneData(res));
                    }}
                    value={deepCloneData(selectItem)}
                />
                <div className="hr">
                    <div
                        className="hr_left"
                        dangerouslySetInnerHTML={{
                            __html: leftHr,
                        }}
                    />
                    <div
                        className="hr_right"
                        dangerouslySetInnerHTML={{
                            __html: rightHr,
                        }}
                    />
                </div>
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
                        <div className="itemBg1" />
                        <div className="itemBg2" />
                        <div className="itemBg3" />
                        <div
                            className="itemBg4"
                            dangerouslySetInnerHTML={{
                                __html: pumpkin,
                            }}
                        />
                        <div
                            className="itemBg5"
                            dangerouslySetInnerHTML={{
                                __html: spider,
                            }}
                        />
                        <span
                            className="itemContent"
                            dangerouslySetInnerHTML={{
                                __html: selectItem?.content ?? "",
                            }}
                        />
                    </div>
                )}
            </Context.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
