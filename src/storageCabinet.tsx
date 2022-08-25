/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMContext } from "./context";
import { comms } from ".";
import Frame from "./frame";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

import { Desk } from "./ColorItems/desk";
import { SmallDesk } from "./ColorItems/smallDesk";
import { Tablet } from "./ColorItems/tablet";
import { Mobile } from "./ColorItems/mobile";
import { deepCloneData, OptionProps } from "./unit";
import { isMobile } from "./isMobile";

export interface ListItemProps {
    code: string;
    content: string;
    value?: OptionProps;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const StorageCabinet: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { basketFn } = useMContext();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const listRef = useRef<Array<ListItemProps>>(
        comms.config.options
            ? deepCloneData(comms.config.options[0]).map((item) => ({
                  code: item.code,
                  content: item.content,
              }))
            : [],
    );
    const [list, setList] = useState([...listRef.current]);

    const indexRef = useRef<number>();
    const [activeIndex, setActiveIndex] = useState(indexRef.current);

    const [contentEl, setContentEl] = useState(() => {
        if (isMobile()) {
            return window.matchMedia("(max-width: 703px)").matches ? (
                <Mobile activeIndex={activeIndex} colors={list}>
                    <Frame type="bottom" />
                </Mobile>
            ) : (
                <Tablet activeIndex={activeIndex} colors={list}>
                    <Frame type="bottom" />
                </Tablet>
            );
        } else {
            return window.matchMedia("(max-width: 1000px)").matches ? (
                <SmallDesk activeIndex={activeIndex} colors={list}>
                    <Frame type="bottom" />
                </SmallDesk>
            ) : (
                <Desk activeIndex={activeIndex} colors={list}>
                    <Frame type="bottom" />
                </Desk>
            );
        }
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const fn = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    useEffect(() => {
        const data: Record<string, string | null> = {};
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            data[item.code] = item.value?.code ?? null;
        }
        comms.state = data;
    }, [list]);

    useLayoutEffect(() => {
        let timer: null | number = null;
        const findIndex = (x: number, y: number) => {
            const els = document.elementsFromPoint(x, y);
            let n: number | null = null;
            for (let i = 0; i < els.length; ) {
                const el = els[i];
                const classAttr = el.getAttribute("class")?.split(" ");
                if (classAttr?.includes("storageCabinet_item")) {
                    n = Number(el.getAttribute("data-i"));
                    i = els.length;
                } else {
                    ++i;
                }
            }
            return n;
        };

        basketFn.current = {
            move(x, y) {
                timer && window.clearTimeout(timer);
                timer = window.setTimeout(() => {
                    const n = findIndex(x, y);

                    indexRef.current = n ?? undefined;
                    setActiveIndex(indexRef.current);
                });
            },
            up(res) {
                timer && window.clearTimeout(timer);
                indexRef.current = undefined;
                setActiveIndex(indexRef.current);
                const n = findIndex(res.x, res.y);
                if (n === res.index) {
                    return;
                }

                const arr = [...listRef.current];
                if (typeof res.index === "number") {
                    arr[res.index].value = undefined;
                }
                if (typeof n === "number") {
                    arr[n].value = {
                        code: res.data.code,
                        content: res.data.content,
                    };
                }
                listRef.current = [...arr];
                setList([...listRef.current]);
            },
        };
    }, [basketFn]);

    useEffect(() => {
        setContentEl(() => {
            if (isMobile()) {
                return window.matchMedia("(max-width: 703px)").matches ? (
                    <Mobile activeIndex={activeIndex} colors={list}>
                        <Frame type="bottom" />
                    </Mobile>
                ) : (
                    <Tablet activeIndex={activeIndex} colors={list}>
                        <Frame type="bottom" />
                    </Tablet>
                );
            } else {
                return window.matchMedia("(max-width: 1000px)").matches ? (
                    <SmallDesk activeIndex={activeIndex} colors={list}>
                        <Frame type="bottom" />
                    </SmallDesk>
                ) : (
                    <Desk activeIndex={activeIndex} colors={list}>
                        <Frame type="bottom" />
                    </Desk>
                );
            }
        });
    }, [activeIndex, list, screenWidth]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    let classStr = "storageCabinet_wrap";

    if (isMobile()) {
        classStr += window.matchMedia("(max-width: 703px)").matches ? " mobile" : " tablet";
    } else if (window.matchMedia("(max-width: 1000px)").matches) {
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
            {contentEl}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
