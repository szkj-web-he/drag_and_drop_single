import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMContext } from "../context";
import { Item } from "../item";
import { ScrollComponent } from "../Scroll";
import { DeskProps } from "./desk";
import { useListenPosition } from "../useListenPosition";
import flower from "../Assets/svg/lotus_flower.svg";
import Iframe from "../typeIcon";
import Arrow from "../arrow";
import ArrowBg from "../arrowBg";

export const SmallDesk: React.FC<DeskProps> = ({
    colors,
    handleChange,
    value,
    handleColorChange,
}) => {
    const listRef = useRef([...colors]);

    const { mouseUpOnStorage } = useMContext();

    const ref = useRef<HTMLDivElement | null>(null);

    const scrollEl = useRef<HTMLDivElement | null>(null);

    const [showBtn, setShowBtn] = useState(false);

    /**
     * 0 起点
     * 1 终点
     * 2 在起点或终点之间
     */
    const [scrollStatus, setScrollStatus] = useState<0 | 1 | 2>(0);

    useListenPosition(ref);

    useLayoutEffect(() => {
        listRef.current = [...colors];
    }, [colors]);

    useEffect(() => {
        const fn = () => {
            const el = ref.current;
            if (!el) return;
            setShowBtn(el.scrollWidth > el.offsetWidth);
        };
        window.addEventListener("resize", fn);
        fn();
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

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

    const getItemWidth = (el: HTMLElement): HTMLElement | null => {
        const childrenList = el.children;

        let node: null | HTMLElement = null;
        for (let i = 0; i < childrenList.length; ) {
            const item = childrenList[i];
            const classAttr = item.getAttribute("class")?.split(" ");
            if (classAttr?.includes("storageCabinet_item") && item instanceof HTMLElement) {
                i = childrenList.length;
                node = item;
            } else {
                ++i;
            }
        }

        if (!node) {
            for (let i = 0; i < childrenList.length; ++i) {
                const item = childrenList[i];
                if (item instanceof HTMLElement) {
                    node = getItemWidth(item);
                }
            }
        }
        return node;
    };

    const toLeft = () => {
        if (scrollStatus === 0) return;
        const node = getScrollEl();
        if (!node) return;

        let itemWidth = 0;
        if (node instanceof HTMLElement) {
            const el = getItemWidth(node);
            if (el) {
                itemWidth = el.offsetWidth;
            }
        }

        node.scrollTo({
            left: node.scrollLeft - itemWidth,
            behavior: "smooth",
        });
    };
    const toRight = () => {
        if (scrollStatus === 1) return;
        const node = getScrollEl();
        if (!node) return;

        let itemWidth = 0;
        if (node instanceof HTMLElement) {
            const el = getItemWidth(node);
            if (el) {
                itemWidth = el.offsetWidth;
            }
        }

        node.scrollTo({
            left: node.scrollLeft + itemWidth,
            behavior: "smooth",
        });
    };

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
        offsetWidth,
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
        if (
            Math.ceil(left + clientWidth) >= scrollWidth ||
            Math.ceil(left + offsetWidth) >= scrollWidth
        ) {
            setScrollStatus(1);
        } else if (left <= 0) {
            setScrollStatus(0);
        } else {
            setScrollStatus(2);
        }
    };

    const handleUp = (n: number) => {
        const data = mouseUpOnStorage.current;
        handleChange(undefined);
        if (n === data?.index) {
            return;
        }

        const arr = [...listRef.current];
        arr[n].value = undefined;

        handleColorChange([...arr]);
    };

    return (
        <>
            {showBtn && (
                <div className="arrowContainer">
                    <div
                        className={`arrowContainer_pre${scrollStatus === 0 ? " gray" : ""}`}
                        onClick={toLeft}
                    >
                        <ArrowBg className="arrowContainer_bgIcon" />
                        <Arrow className="arrowContainer_icon" />
                    </div>
                    <div
                        className={`arrowContainer_next${scrollStatus === 1 ? " gray" : ""}`}
                        onClick={toRight}
                    >
                        <ArrowBg className="arrowContainer_bgIcon" />
                        <Arrow className="arrowContainer_icon" />
                    </div>
                </div>
            )}
            <ScrollComponent
                height="220px"
                className="smallDesk_scrollWrap"
                bodyClassName="smallDesk_scrollBody"
                handleBarChange={handleScroll}
                ref={scrollEl}
                hidden={{
                    y: true,
                }}
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
                                <Iframe className="storageCabinet_view" />
                                <div
                                    className="storageCabinet_itemBg"
                                    dangerouslySetInnerHTML={{
                                        __html: flower,
                                    }}
                                />

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
