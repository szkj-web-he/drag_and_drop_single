import React from "react";
import { Item } from "../item";
import { ListItemProps } from "../storageCabinet";
import { ScrollComponent } from "../Scroll";
import bg from "../Assets/svg/bg_product.svg";
import bg1 from "../Assets/svg/bg_product1.svg";

export interface DeskProps {
    colors: Array<ListItemProps>;
    activeIndex?: number;
}

export const Desk: React.FC<DeskProps> = ({ colors, activeIndex }) => {
    return (
        <ScrollComponent className="storageCabinet_deskScrollWrap">
            <div className="storageCabinet_row">
                {colors.map((item, n) => {
                    return (
                        <div
                            className={`storageCabinet_item${activeIndex === n ? " active" : ""}`}
                            key={`${item.code}`}
                            data-i={n}
                        >
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
                                <Item values={item.value} index={n} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </ScrollComponent>
    );
};
