export interface OptionProps {
    code: string;
    content: string;
}

export interface PointProps {
    pageX: number;
    pageY: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ConfigProps {
    config: {
        question?: string;
        instruction?: string;
        options: Array<{
            code: string;
            content: string;
        }>;
    };
}

/**
 * 当前点位是否包含了 storageCabinet这个组件里的element
 * @param {number} x pageX
 * @param {number} y pageY
 * @returns {boolean}
 */
export const hasStorageEl = (x: number, y: number): boolean => {
    const els = document.elementsFromPoint(x, y);

    let status = false;
    for (let i = 0; i < els.length; ) {
        const el = els[i];
        const classAttr = el.getAttribute("class")?.split(" ") ?? [];

        const overOnStorage = classAttr.includes("storageCabinet_container");
        if (overOnStorage) {
            status = true;
            i = els.length;
        } else {
            ++i;
        }
    }
    return status;
};

/**
 * 画圆角矩形
 */

export const drawItemRoundRect = (el: HTMLCanvasElement): undefined => {
    const initDraw = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        isStroke?: boolean,
    ) => {
        ctx.beginPath();
        const r = 2;
        const margin = 11;
        const stroke = isStroke ? 0.6 : 0;
        const startX = stroke;
        const startY = stroke;
        const endX = width - stroke;
        const endY = height - stroke;
        ctx.lineJoin = "round";
        ctx.arc(endX - r, endY - r, r, 0, Math.PI / 2);
        ctx.lineTo(r + startX, endY);
        ctx.arc(startX + r, endY - r, r, Math.PI / 2, Math.PI);
        ctx.lineTo(startX, startY + r);
        ctx.arc(startX + r, startY + r, r, Math.PI, (Math.PI / 2) * 3);
        //缺角部分
        ctx.lineTo(endX - r - margin, startY);
        ctx.arc(endX - r - margin, startY + r, r, (Math.PI / 2) * 3, (Math.PI / 4) * 7);
        ctx.lineTo(endX - r, startY + margin - r);
        ctx.arc(endX - r, startY + margin + r, r, (Math.PI / 4) * 7, Math.PI * 2);
        ctx.lineTo(endX, endY - r);
    };

    const parent = el.parentElement;

    let width = 0;
    let height = 0;
    if (parent instanceof HTMLElement) {
        width = parent.offsetWidth;
        height = parent.offsetHeight;
    }

    const ctx = el.getContext("2d");

    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, el.width, el.height);
    el.width = width;
    el.height = height;

    initDraw(ctx, width, height, false);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
    ctx.closePath();

    initDraw(ctx, width, height, true);
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = "#55E5F2";
    ctx.stroke();
    ctx.closePath();
};

export const drawRoundRect = (el: HTMLCanvasElement, type: "top" | "bottom"): undefined => {
    const parent = el.parentElement;
    let width = 0;
    let height = 0;
    if (parent instanceof HTMLElement) {
        width = parent.offsetWidth;
        height = parent.offsetHeight;
    }

    const r = 12;

    const ctx = el.getContext("2d");
    if (!ctx) {
        return;
    }

    ctx.clearRect(0, 0, el.width, el.height);
    el.width = width;
    el.height = height;

    ctx.beginPath();

    ctx.lineJoin = "round";
    ctx.lineWidth = 1;

    const color =
        type == "top"
            ? ctx.createLinearGradient(15, -3, width * 0.895, height * 0.948)
            : ctx.createLinearGradient(30, -6, width * 0.895, height * 0.936);
    color.addColorStop(0, "rgba(255,255,255,0.5)");
    color.addColorStop(0.4, "rgba(255,255,255,0)");
    color.addColorStop(0.7, "rgba(75,243,254,0.34)");
    color.addColorStop(1, "rgba(14,193,204,0.8)");
    ctx.strokeStyle = color;

    ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
    ctx.lineTo(r, height);
    ctx.arc(r, height - r, r, Math.PI / 2, Math.PI);
    ctx.lineTo(0, r);
    ctx.arc(r, r, r, Math.PI, (Math.PI / 2) * 3);
    ctx.lineTo(width - r, 0);
    ctx.arc(width - r, r, r, (Math.PI / 2) * 3, Math.PI * 2);

    ctx.closePath();
    ctx.stroke();
};

export const deepCloneData = <T>(data: T): T => {
    const d = data ? JSON.parse(JSON.stringify(data)) : undefined;
    return d as T;
};

const toMs = (s: string) => (s ? Number(s.slice(0, -1)) * 1000 : 0);

export interface DragData extends OptionProps {
    placement: "warehouse" | { storageCabinet: number };
}

export const getTimeout = (delays: string[], durations: string[]): number =>
    delays.length > durations.length
        ? Math.max(...delays.map((item, n) => toMs(item) + toMs(durations[n])))
        : Math.max(...durations.map((item, n) => toMs(item) + toMs(delays[n])));
/**
 *
 * @param {HTMLElement} el
 * @returns {timeout: number;propCount: number;}
 */
export const getTransitionAttr = (
    el: HTMLElement,
): {
    timeout: number;
    propCount: number;
} => {
    const styles = window.getComputedStyle(el);

    const transitionDelays = styles.transitionDelay.split(", ");
    const transitionDurations = styles.transitionDuration.split(", ");

    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);

    let timeout = 0;
    let propCount = 0;
    if (transitionTimeout > 0) {
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
    }

    return {
        timeout,
        propCount,
    };
};

/**
 * 新增class
 */
export const addClass = (el: HTMLElement, c: string): void => {
    const classNameList = el.getAttribute("class")?.split(" ");
    if (classNameList) {
        if (!classNameList.includes(c)) {
            classNameList.push(c);
        }
        el.setAttribute("class", classNameList.join(" "));
    } else {
        el.setAttribute("class", c);
    }
};

/**
 * 移出class
 */

export const removeClass = (el: HTMLElement, c: string): void => {
    const classNameList = el.getAttribute("class")?.split(" ");
    const n = classNameList?.findIndex((item) => item === c);
    if (typeof n === "number" && n >= 0) {
        classNameList?.splice(n);
    }
    if (classNameList?.length) {
        el.setAttribute("class", classNameList.join(" "));
    } else {
        el.removeAttribute("class");
    }
};

export const getMatrixAttr = (
    el: HTMLElement,
): {
    scaleX: string;
    skewY: string;
    skewX: string;
    scaleY: string;
    translateX: string;
    translateY: string;
} | null => {
    const attr = window.getComputedStyle(el, null).transform;

    if (attr.includes("matrix")) {
        const attrArr = attr.replace(/(matrix|[()])/g, "").split(",");
        return {
            scaleX: attrArr[0],
            skewY: attrArr[1],
            skewX: attrArr[2],
            scaleY: attrArr[3],
            translateX: attrArr[4],
            translateY: attrArr[5],
        };
    } else {
        return null;
    }
};
