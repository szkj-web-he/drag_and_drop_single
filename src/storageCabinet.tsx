/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from "react";
import { useMContext } from "./context";
import { comms } from ".";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

import { Desk } from "./ColorItems/desk";
import { SmallDesk } from "./ColorItems/smallDesk";
import { Tablet } from "./ColorItems/tablet";
import { Mobile } from "./ColorItems/mobile";
import { deepCloneData, DragData, OptionProps } from "./unit";
export interface StorageCabinetProps {
    handleChange: (res: DragData | undefined) => void;
    value?: DragData;
}

export interface ListItemProps {
    code: string;
    content: string;
    value?: OptionProps;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const StorageCabinet: React.FC<StorageCabinetProps> = ({ handleChange, value }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile } = useMContext();

    const [is1024, setIs1024] = useState(window.matchMedia("(max-width: 1000px)").matches);

    const [is375, setIs375] = useState(window.matchMedia("(max-width: 703px)").matches);

    const [list, setList] = useState<Array<ListItemProps>>(
        comms.config.options
            ? deepCloneData(comms.config.options[0]).map((item) => ({
                  code: item.code,
                  content: item.content,
              }))
            : [],
    );

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    useEffect(() => {
        const fn = () => {
            setIs1024(window.matchMedia("(max-width: 1000px)").matches);
            setIs375(window.matchMedia("(max-width: 703px)").matches);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const handleColorChange = (res: ListItemProps[]) => {
        setList([...res]);
        const data: Record<string, string | undefined> = {};
        for (let i = 0; i < res.length; i++) {
            data[res[i].code] = res[i].value?.code;
        }
        comms.state = data;
    };

    let classStr = "storageCabinet_wrap";
    let mainEl = <></>;

    const valueData = deepCloneData(value);

    if (isMobile) {
        mainEl = is375 ? (
            <Mobile
                value={valueData}
                handleChange={handleChange}
                handleColorChange={handleColorChange}
                colors={list}
            />
        ) : (
            <Tablet
                value={valueData}
                handleChange={handleChange}
                handleColorChange={handleColorChange}
                colors={list}
            />
        );
    } else {
        mainEl = is1024 ? (
            <SmallDesk
                value={valueData}
                handleChange={handleChange}
                handleColorChange={handleColorChange}
                colors={list}
            />
        ) : (
            <Desk
                value={valueData}
                handleChange={handleChange}
                handleColorChange={handleColorChange}
                colors={list}
            />
        );
    }

    if (isMobile) {
        classStr += is375 ? " mobile" : " tablet";
    } else if (is1024) {
        classStr += " small_desk";
    } else {
        classStr += " desk";
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={classStr}>
            <div className="storageCabinet_total">
                共<span>{list.length}</span>
                个分类
            </div>
            {mainEl}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
