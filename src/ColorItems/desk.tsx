import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Item } from "../item";
import { useMContext } from "../context";
import { ListItemProps, StorageCabinetProps } from "../storageCabinet";
import { useListenPosition } from "../useListenPosition";
import jt from "../icon_jt.png";
import { ScrollComponent } from "../Scroll";
import { getScrollValue } from "../getScrollValue";
import bg from "../Assets/svg/bg_product.svg";
import bg1 from "../Assets/svg/bg_product1.svg";

export interface DeskProps extends StorageCabinetProps {
    colors: Array<ListItemProps>;
    handleColorChange: (res: ListItemProps[]) => void;
}

export const Desk: React.FC<DeskProps> = ({ colors, handleChange, value, handleColorChange }) => {
    const listRef = useRef([...colors]);

    const { mouseUpOnStorage, position } = useMContext();

    const ref = useRef<HTMLDivElement | null>(null);

    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    const scrollBodyRef = useRef<HTMLElement>();

    const timer = useRef<number>();

    const enterInScrollTime = useRef<number>();

    useLayoutEffect(() => {
        listRef.current = [...colors];
    }, [colors]);

    useListenPosition(ref);

    useEffect(() => {
        if (!value) {
            setShowTop(false);
            setShowBottom(false);
            scrollBodyRef.current = undefined;
        }
    }, [value]);

    useEffect(() => {
        () => {
            timer.current && window.clearTimeout(timer.current);
        };
    }, []);

    /**
     * 当鼠标在滚动容器上松开时
     */
    const handleMouseUpOnScroll = () => {
        if (!value || !position) return;
        const scrollData = getScrollValue();

        const els = document.elementsFromPoint(
            position.pageX - scrollData.x,
            position.pageY - scrollData.y,
        );
        let n = -1;
        for (let i = 0; i < els.length; ) {
            const el = els[i];
            const classAttr = el.getAttribute("class")?.split(" ");
            if (classAttr?.includes("storageCabinet_item")) {
                n = Number(el.getAttribute("data-i")) ?? -1;
                i = els.length;
            } else {
                ++i;
            }
        }

        if (!listRef.current[n]) {
            return;
        }
        listRef.current[n].value = {
            code: value.code,
            content: value.content,
        };

        handleColorChange([...listRef.current]);

        mouseUpOnStorage.current = {
            index: n,
            val: {
                code: value.code,
                content: value.content,
            },
        };
    };

    /**
     * 当  松开item时
     */
    const handleUp = (n: number) => {
        const data = mouseUpOnStorage.current;
        handleChange(undefined);
        if (n === data?.index) {
            return;
        }
        const arr = [...listRef.current];
        arr[n].value = undefined;

        handleColorChange([...listRef.current]);
    };

    /**
     * 观察滚动条状态
     */
    const watchScrollStatus = (scrollBody: HTMLElement) => {
        setShowTop(scrollBody.scrollTop > 0);
        setShowBottom(scrollBody.scrollTop + scrollBody.clientHeight < scrollBody.scrollHeight);
    };

    /**
     * 当鼠标进入滚动容器时
     */
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!value) {
            return;
        }
        enterInScrollTime.current = Date.now();
        const scrollWrap = e.currentTarget;
        let scrollBody: HTMLElement | null = null;
        for (let i = 0; i < scrollWrap.children.length; ) {
            const item = scrollWrap.children[i];
            if (item instanceof HTMLElement) {
                const classAttr = item.getAttribute("class");
                if (classAttr?.includes("scroll_scrollBody")) {
                    i = scrollWrap.children.length;
                    scrollBody = item;
                } else {
                    ++i;
                }
            } else {
                ++i;
            }
        }

        if (!scrollBody) {
            return;
        }
        scrollBodyRef.current = scrollBody;
        watchScrollStatus(scrollBody);
    };
    /**
     * 当鼠标离开滚动容器时
     */
    const handleMouseLeave = () => {
        if (!value) {
            return;
        }
        setShowTop(false);
        setShowBottom(false);
        scrollBodyRef.current = undefined;
    };
    /**
     * 开始滚动
     */
    const startScroll = (status: 1 | -1) => {
        const el = scrollBodyRef.current;
        timer.current && window.clearTimeout(timer.current);
        if (!el) {
            return;
        }

        switch (status) {
            case 1:
                if (el.scrollTop + el.clientHeight < el.scrollHeight) {
                    el.scrollTop = el.scrollTop + 1;
                    timer.current = window.setTimeout(() => startScroll(status));
                }
                break;
            case -1:
                if (el.scrollTop > 0) {
                    el.scrollTop = el.scrollTop - 1;
                    timer.current = window.setTimeout(() => startScroll(status));
                }

                break;
        }
    };

    /**
     * 当滚动容器 滚动时
     */
    const handleScrollChange = () => {
        const el = scrollBodyRef.current;
        if (!el) {
            return;
        }
        watchScrollStatus(el);
    };

    /**
     * 鼠标进入 自动向上的滚动容器时
     */
    const handleMouseEnterOnTop = () => {
        timer.current && window.clearTimeout(timer.current);
        let delay = 1;
        if (enterInScrollTime.current && Date.now() - enterInScrollTime.current <= 201) {
            delay = 200;
        }

        timer.current = window.setTimeout(() => startScroll(-1), delay);
    };
    /**
     * 鼠标离开 自动向下的滚动容器时
     */
    const handleMouseLeaveOnTop = () => {
        timer.current && window.clearTimeout(timer.current);
    };
    /**
     * 鼠标进入 自动向下的滚动容器时
     */
    const handleMouseEnterOnBottom = () => {
        timer.current && window.clearTimeout(timer.current);
        let delay = 1;
        if (enterInScrollTime.current && Date.now() - enterInScrollTime.current <= 201) {
            delay = 200;
        }

        timer.current = window.setTimeout(() => startScroll(1), delay);
    };
    /**
     * 鼠标离开 自动向下的滚动容器时
     */
    const handleMouseLeaveOnBottom = () => {
        timer.current && window.clearTimeout(timer.current);
    };

    return (
        <ScrollComponent
            className="storageCabinet_deskScrollWrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            handleBarChange={handleScrollChange}
            onMouseUp={handleMouseUpOnScroll}
        >
            <div
                className="storageCabinet_deskTopTips"
                style={{
                    opacity: showTop ? 1 : 0,
                    pointerEvents: showTop ? "auto" : "none",
                }}
                onMouseEnter={handleMouseEnterOnTop}
                onMouseLeave={handleMouseLeaveOnTop}
            >
                <img src={jt} className="storageCabinet_img" />
            </div>
            <div
                className="storageCabinet_deskBottomTips"
                style={{
                    opacity: showBottom ? 1 : 0,
                    pointerEvents: showBottom ? "auto" : "none",
                }}
                onMouseEnter={handleMouseEnterOnBottom}
                onMouseLeave={handleMouseLeaveOnBottom}
            >
                <img src={jt} className="storageCabinet_img" />
            </div>

            <div className="storageCabinet_row" ref={ref}>
                {colors.map((item, n) => {
                    return (
                        <div className="storageCabinet_item" key={`${item.code}`} data-i={n}>
                            <div
                                className="storageCabinet_itemBg"
                                dangerouslySetInnerHTML={{
                                    __html: bg,
                                }}
                            />

                            <div
                                className="storageCabinet_itemBg1"
                                dangerouslySetInnerHTML={{
                                    __html: bg1,
                                }}
                            />
                            <div className="storageCabinet_itemBg2" />
                            <div className="storageCabinet_itemBg3" />
                            <div className="storageCabinet_itemBg4" />

                            <div className="storageCabinet_itemTitle">{item.content}</div>
                            <div className="storageCabinet_itemValues">
                                <Item
                                    values={item.value}
                                    handleChange={handleChange}
                                    onUp={() => handleUp(n)}
                                    index={n}
                                    value={value ? JSON.parse(JSON.stringify(value)) : undefined}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </ScrollComponent>
    );
};
