import "./style.scss";

import { ConfigYML, PluginComms } from "@possie-engine/dr-plugin-sdk";
import React, { useRef } from "react";
import { BasketUpFnProps, Context } from "./context";
import Hr from "./hr";
import { StorageCabinet } from "./storageCabinet";
import { Warehouse } from "./warehouse";

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
                    basketFn,
                }}
            >
                <Warehouse />
                <Hr />
                <StorageCabinet />
            </Context.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
