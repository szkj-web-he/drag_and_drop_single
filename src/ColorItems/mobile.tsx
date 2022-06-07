import React from "react";
import { Item } from "../item";
import { DeskProps } from "./desk";
import flower from "../Assets/svg/lotus_flower.svg";
import Iframe from "../typeIcon";

export const Mobile: React.FC<DeskProps> = ({ colors, activeIndex }) => {
    return (
        <div className="mobile_colorWrap">
            <div className="mobile_colorContainer">
                {colors.map((item, n) => {
                    return (
                        <div
                            className={`storageCabinet_item${activeIndex === n ? " active" : ""}`}
                            key={item.code}
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
        </div>
    );
};
