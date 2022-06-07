/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { stopSelect } from "./noSelected";
import { useMContext } from "./context";
import { getScrollValue } from "./getScrollValue";
import { deepCloneData, OptionProps } from "./unit";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ProductProps {
    list: Array<OptionProps>;

    index?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Product: React.FC<ProductProps> = ({ list, index }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile, handleMoveCallback, handleValueChangeCallback, basketFn } = useMContext();

    const selectedFn = useRef<typeof document.onselectstart>(null);

    const point = useRef({
        offsetX: 0,
        offsetY: 0,
    });

    const selectValueRef = useRef<OptionProps>();
    const [selectValue, setSelectValue] = useState(
        selectValueRef.current ? { ...selectValueRef.current } : undefined,
    );

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    // 当移动时
    const handleMove = (e: MouseEvent | React.TouchEvent<HTMLDivElement>) => {
        if (!selectValueRef.current) {
            return;
        }

        let x = 0;
        let y = 0;

        if (e instanceof MouseEvent) {
            x = e.pageX;
            y = e.pageY;
            basketFn.current.move(e.clientX, e.clientY);
        } else {
            const position = e.changedTouches[0];
            x = position.pageX;
            y = position.pageY;
            basketFn.current.move(position.clientX, position.clientY);
        }
        handleMoveCallback({
            x: x - point.current.offsetX,
            y: y - point.current.offsetY,
        });
    };

    // 当鼠标 或者手 弹起时的通用事件
    const handleUp = (x: number, y: number) => {
        if (!selectValueRef.current) {
            return;
        }

        const data = deepCloneData(selectValueRef.current);
        basketFn.current.up({
            index,
            x,
            y,
            data: {
                code: data.code,
                content: data.content,
            },
        });

        document.onselectstart = selectedFn.current;
        handleValueChangeCallback(undefined);

        selectValueRef.current = undefined;
        setSelectValue(undefined);

        point.current = {
            offsetX: 0,
            offsetY: 0,
        };
    };

    // 当鼠标弹起时
    const handleMouseUp = (e: MouseEvent) => {
        handleUp(e.clientX, e.clientY);
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // 当手离开屏幕时
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const position = e.changedTouches[0];

        handleUp(position.clientX, position.clientY);
    };

    // 手或者鼠标 按下的通用事件
    const handleDown = (
        item: OptionProps,
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
        position: {
            x: number;
            y: number;
        },
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const scrollData = getScrollValue();

        selectValueRef.current = {
            code: item.code,
            content: item.content,
        };
        setSelectValue({
            ...selectValueRef.current,
        });

        handleValueChangeCallback({
            code: item.code,
            content: item.content,
            width: rect.width,
            height: rect.height,
        });

        const left = rect.left + scrollData.x;
        const top = rect.top + scrollData.y;

        handleMoveCallback({
            x: left,
            y: top,
        });

        stopSelect(e, selectedFn, true);

        point.current = {
            offsetX: position.x - left,
            offsetY: position.y - top,
        };
    };

    // 当鼠标按下时
    const handleMouseDown = (
        item: OptionProps,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleDown(item, e, {
            x: e.pageX,
            y: e.pageY,
        });
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    //当手触摸时
    const handleTouchStart = (item: OptionProps, e: React.TouchEvent<HTMLDivElement>) => {
        const position = e.changedTouches[0];
        e.stopPropagation();

        handleDown(item, e, {
            x: position.pageX,
            y: position.pageY,
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            {list.map((item) => {
                return (
                    <div
                        key={item.code}
                        className={`item${selectValue?.code === item.code ? " gray" : ""}`}
                        {...(isMobile
                            ? {
                                  onTouchStart: (e) => {
                                      handleTouchStart(item, e);
                                  },
                                  onTouchMove: handleMove,
                                  onTouchEnd: handleTouchEnd,
                              }
                            : {
                                  onMouseDown: (e) => {
                                      handleMouseDown(item, e);
                                  },
                              })}
                        dangerouslySetInnerHTML={{
                            __html: item.content,
                        }}
                    />
                );
            })}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
