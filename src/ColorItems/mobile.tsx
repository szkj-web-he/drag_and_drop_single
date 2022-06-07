import React from "react";
import { Item } from "../item";
import { DeskProps } from "./desk";
import bg from "../Assets/svg/bg_product.svg";
import bg1 from "../Assets/svg/bg_product1.svg";

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
        </div>
    );
};
