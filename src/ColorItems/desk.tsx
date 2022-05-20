import React, { useLayoutEffect, useRef } from "react";
import { Item } from "../item";
import { useMContext } from "../context";
import { ListItemProps, StorageCabinetProps } from "../storageCabinet";
import { useListenPosition } from "../useListenPosition";

export interface DeskProps extends StorageCabinetProps {
    colors: Array<ListItemProps>;
    handleColorChange: (res: ListItemProps[]) => void;
}

export const Desk: React.FC<DeskProps> = ({ colors, handleChange, value, handleColorChange }) => {
    const listRef = useRef([...colors]);

    const { mouseUpOnStorage } = useMContext();

    const ref = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        listRef.current = [...colors];
    }, [colors]);

    useListenPosition(ref);

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
            val: {
                code: value.code,
                content: value.content,
            },
        };
    };

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

    return (
        <div className="storageCabinet_row" ref={ref}>
            {colors.map((item, n) => {
                return (
                    <div
                        className="storageCabinet_item"
                        key={`${item.code}`}
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
                                value={value ? JSON.parse(JSON.stringify(value)) : undefined}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
