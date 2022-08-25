/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React, { useMemo } from "react";
import { comms } from ".";
import { Product } from "./product";
import Frame from "./frame";
import { ScrollComponent } from "./Scroll";
import { deepCloneData } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Warehouse: React.FC = () => {
    const params = useMemo(() => deepCloneData(comms.config.options?.[1] ?? []), []);

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

            <div className="warehouse_container">
                <Frame type="top" />
                <ScrollComponent
                    className="warehouse_scrollWrap"
                    bodyClassName="warehouse_scrollBody"
                    hidden={{
                        x: true,
                    }}
                >
                    {content}
                </ScrollComponent>
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
