import "./style.scss";

import { Warehouse } from "./warehouse";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { BasketUpFnProps, Context, MoveFnProps, ValueChangeFnProps } from "./context";
import { isMobile } from "./isMobile";
import Hr from "./hr";
import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";
import Frame from "./itemFrame";

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

    const [mobileStatus, setMobileStatus] = useState(isMobile);

    const [position, setPosition] = useState<MoveFnProps>();

    const [selectValue, setSelectValue] = useState<ValueChangeFnProps>();

    const basketFn = useRef<{
        move: (x: number, y: number) => undefined;
        up: (res: BasketUpFnProps) => undefined;
    }>({
        move: () => undefined,
        up: () => undefined,
    });

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

    const handleMoveCallback = useCallback((res?: MoveFnProps) => setPosition(res), []);

    const handleValueChangeCallback = useCallback((res?: ValueChangeFnProps) => {
        setSelectValue(res);
    }, []);
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
                    isMobile: mobileStatus,
                    handleMoveCallback,
                    handleValueChangeCallback,
                    basketFn,
                }}
            >
                <Warehouse />
                <Hr />
                <StorageCabinet />
                {!!selectValue && (
                    <div
                        className="floating"
                        style={{
                            left: `${position?.x ?? 0}px`,
                            top: `${position?.y ?? 0}px`,
                            width: `${selectValue.width}px`,
                            height: `${selectValue.height}px`,
                        }}
                    >
                        <Frame className={`itemBg`} />
                        <div
                            className={`itemContent`}
                            dangerouslySetInnerHTML={{
                                __html: selectValue?.content ?? "",
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
