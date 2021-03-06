import React, { useEffect } from "react";
import { useMContext } from "./context";
import { getScrollValue } from "./getScrollValue";

export const useListenPosition = (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    client?: "tablet",
): void => {
    const { position } = useMContext();

    useEffect(() => {
        const fn = () => {
            const rEl = ref.current;
            if (!rEl) return;
            const scrollData = getScrollValue();
            const els = position
                ? document.elementsFromPoint(
                      position.pageX - scrollData.x,
                      position.pageY - scrollData.y,
                  )
                : [];

            const findChild = (el: HTMLElement) => {
                const childList = el.children;
                for (let i = 0; i < childList.length; i++) {
                    const child = childList[i];

                    const status = els.some((item) => item === child);
                    const classList = child.getAttribute("class")?.split(" ") || [];
                    const n = classList?.findIndex((item) => item === "active");
                    if (status) {
                        if (n === undefined || n < 0) {
                            classList.push("active");
                            child.setAttribute("class", classList.join(" "));
                        }
                    } else if (typeof n === "number" && n > 0) {
                        classList.splice(n, 1);
                        child.setAttribute("class", classList.join(" "));
                    }
                }
            };
            if (!client) {
                findChild(rEl);
            } else {
                const childList = rEl.children;
                for (let i = 0; i < childList.length; i++) {
                    const child = childList[i];
                    findChild(child as HTMLElement);
                }
            }
        };

        const timer = window.setTimeout(fn);
        return () => {
            window.clearTimeout(timer);
        };
    }, [client, position, ref]);
};
