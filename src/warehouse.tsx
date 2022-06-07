/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React from "react";
import { Product } from "./product";
import { comms } from ".";
import { useMContext } from "./context";
import { ScrollComponent } from "./Scroll";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Warehouse: React.FC = () => {
    const { isMobile } = useMContext();

    const params = comms.config.options?.[1] || [];

    const content = (
        <div className="warehouse_body">
            <Product list={params} />
        </div>
    );

    return (
        <div className="warehouse_wrap">
            <div className="warehouse_total">
                共
                <span className={`warehouse_totalVal${params.length ? "" : " red"}`}>
                    {params.length}
                </span>
                项
            </div>

            {isMobile ? (
                <div className="warehouse_items">{content}</div>
            ) : (
                <ScrollComponent
                    className="warehouse_scrollWrap"
                    bodyClassName="warehouse_scrollBody"
                    hidden={{
                        x: true,
                    }}
                >
                    {content}
                </ScrollComponent>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
