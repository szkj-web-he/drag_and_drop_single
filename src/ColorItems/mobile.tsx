import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useListenPosition } from "../useListenPosition";
import { useMContext } from "../context";
import { Item } from "../item";
import { DeskProps } from "./desk";
import bg from "../Assets/svg/bg_product.svg";
import bg1 from "../Assets/svg/bg_product1.svg";

export const Mobile: React.FC<DeskProps> = ({ colors, handleChange, value, handleColorChange }) => {
    const listRef = useRef([...colors]);

    const { mouseUpOnStorage } = useMContext();

    const ref = useRef<HTMLDivElement | null>(null);

    const handleColorChangeFn = useRef(handleColorChange);

    useLayoutEffect(() => {
        handleColorChangeFn.current = handleColorChange;
    }, [handleColorChange]);

    const handleUp = (n: number) => {
        const data = mouseUpOnStorage.current;
        handleChange(undefined);
        if (n === data?.index) {
            return;
        }

        const arr = [...listRef.current];
        arr[n].value = undefined;

        handleColorChangeFn.current([...arr]);
    };

    useLayoutEffect(() => {
        listRef.current = [...colors];
    }, [colors]);
    /**
     * touch 事件的穿透处理
     * 本无穿透
     * 做穿透处理
     */
    useEffect(() => {
        const fn = () => {
            if (mouseUpOnStorage.current) {
                const data = mouseUpOnStorage.current;
                const n = data.index;
                const arr = [...listRef.current];
                arr[n].value = {
                    code: data.val.code,
                    content: data.val.content,
                };

                handleColorChangeFn.current([...arr]);
            }
        };
        document.addEventListener("touchend", fn);

        return () => {
            document.removeEventListener("touchend", fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mouseUpOnStorage]);

    useListenPosition(ref);

    return (
        <div className="mobile_colorWrap">
            <div className="mobile_colorContainer" ref={ref}>
                {colors.map((item, n) => {
                    return (
                        <div className="storageCabinet_item" key={item.code} data-i={n}>
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
                                    value={value}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
