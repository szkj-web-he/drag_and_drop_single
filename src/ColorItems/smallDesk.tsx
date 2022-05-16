import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMContext } from "../context";
import { Item } from "../item";
import { ScrollComponent } from "../Scroll";
import { Icon } from "../icon";
import { DeskProps } from "./desk";

export const SmallDesk: React.FC<DeskProps> = ({
    colors,
    handleChange,
    value,
    handleColorChange,
}) => {
    const listRef = useRef([...colors]);

    const { mouseUpOnStorage, position } = useMContext();

    const ref = useRef<HTMLDivElement | null>(null);

    const scrollEl = useRef<HTMLDivElement | null>(null);
    /**
     * 0 起点
     * 1 终点
     * 2 在起点或终点之间
     */
    const [scrollStatus, setScrollStatus] = useState<0 | 1 | 2>(0);

    useLayoutEffect(() => {
        listRef.current = [...colors];
    }, [colors]);

    const getScrollEl = () => {
        const el = scrollEl.current;
        if (!el) return;
        let node: null | Element = null;
        for (let i = 0; i < el.children.length; ) {
            const item = el.children[i];
            if (
                item
                    .getAttribute("class")
                    ?.split(" ")
                    .some((val) => val === "scroll_scrollBody")
            ) {
                i = el.children.length;

                node = item;
            } else {
                ++i;
            }
        }
        return node;
    };

    const toLeft = () => {
        if (scrollStatus === 0) return;
        const node = getScrollEl();
        if (!node) return;
        node.scrollTo({
            left: node.scrollLeft - 165,
            behavior: "smooth",
        });
    };
    const toRight = () => {
        if (scrollStatus === 1) return;
        const node = getScrollEl();
        if (!node) return;
        node.scrollTo({
            left: node.scrollLeft + 164,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const fn = () => {
            const el = ref.current;
            if (!el) return;

            const childList = el.children;

            const els = position ? document.elementsFromPoint(position.x, position.y) : [];

            for (let i = 0; i < childList.length; i++) {
                const child = childList[i];
                const status = els.some((item) => item === child);
                const classList = child.getAttribute("class")?.split(" ") || [];
                const n = classList?.findIndex((item) => item === "active");
                if (status) {
                    if (n === undefined || n < 0) {
                        classList.push("active");
                        child.setAttribute("class", classList.join(" "));
                    }
                } else if (typeof n === "number" && n > 0) {
                    classList.splice(n, 1);
                    child.setAttribute("class", classList.join(" "));
                }
            }
        };

        const timer = window.setTimeout(fn);
        return () => {
            window.clearTimeout(timer);
        };
    }, [position]);

    const handleMouseUp = (n: number) => {
        if (!value) return;
        const arr = [...listRef.current];
        arr[n].value = {
            code: value.code,
            content: value.content,
        };
        handleColorChange([...arr]);

        mouseUpOnStorage.current = {
            index: n,
            val: value,
        };
    };

    const handleScroll = ({
        left,
        scrollWidth,
        clientWidth,
    }: {
        left: number;
        top: number;
        scrollHeight: number;
        scrollWidth: number;
        offsetHeight: number;
        offsetWidth: number;
        clientHeight: number;
        clientWidth: number;
    }) => {
        if (Math.ceil(left + clientWidth) >= scrollWidth) {
            setScrollStatus(1);
        } else if (left <= 0) {
            setScrollStatus(0);
        } else {
            setScrollStatus(2);
        }
    };

    const handleUp = (n: number) => {
        const data = mouseUpOnStorage.current;

        if (n === data?.index) {
            return;
        }

        const arr = [...listRef.current];
        arr[n].value = undefined;

        handleColorChange([...arr]);
        handleChange(undefined);
    };

    return (
        <>
            <div className="arrowContainer">
                <div
                    className={`arrowContainer_pre${scrollStatus === 0 ? " gray" : ""}`}
                    onClick={toLeft}
                >
                    <Icon className="arrowContainer_icon" />
                </div>
                <div
                    className={`arrowContainer_next${scrollStatus === 1 ? " gray" : ""}`}
                    onClick={toRight}
                >
                    <Icon className="arrowContainer_icon" />
                </div>
            </div>
            <ScrollComponent
                height="220px"
                className="smallDesk_scrollWrap"
                bodyClassName="smallDesk_scrollBody"
                handleBarChange={handleScroll}
                ref={scrollEl}
            >
                <div className="storageCabinet_smallDeskRow" ref={ref}>
                    {colors.map((item, n) => {
                        return (
                            <div
                                className="storageCabinet_item"
                                key={item.code}
                                data-i={n}
                                onMouseUp={() => handleMouseUp(n)}
                            >
                                <div className="storageCabinet_itemTitle">{item.content}</div>
                                <div className="storageCabinet_itemValues">
                                    <Item
                                        values={item.value}
                                        handleChange={handleChange}
                                        onUp={() => handleUp(n)}
                                        index={n}
                                        value={value}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollComponent>
        </>
    );
};
