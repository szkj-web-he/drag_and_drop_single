import React from "react";
import { Item } from "../item";
import { ListItemProps } from "../storageCabinet";
import { ScrollComponent } from "../Scroll";
import flower from "../Assets/svg/lotus_flower.svg";
import Iframe from "../typeIcon";

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
                            <Iframe className="storageCabinet_view" />
                            <div
                                className="storageCabinet_itemBg"
                                dangerouslySetInnerHTML={{
                                    __html: flower,
                                }}
                            />

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
