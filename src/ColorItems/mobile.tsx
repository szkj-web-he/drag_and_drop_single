import React from "react";
import { Item } from "../item";
import { DeskProps } from "./desk";
import Box from "./container";

export const Mobile: React.FC<DeskProps> = ({ colors, activeIndex, children }) => {
    return (
        <div className="mobile_colorWrap">
            {children}
            <div className="mobile_scrollContainer">
                <div className="mobile_colorContainer">
                    {colors.map((item, n) => {
                        return (
                            <Box
                                index={n}
                                key={`${item.code}`}
                                isActive={activeIndex === n}
                                title={item.content}
                            >
                                <Item values={item.value} index={n} />
                            </Box>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
