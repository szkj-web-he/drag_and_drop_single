import { createContext, useContext } from "react";
import { OptionProps } from "./unit";

export interface MoveFnProps {
    x: number;
    y: number;
}

export interface ValueChangeFnProps extends OptionProps {
    width: number;
    height: number;
}

export interface BasketUpFnProps {
    index?: number;
    x: number;
    y: number;
    data: OptionProps;
}

interface ContextDataProps {
    isMobile: boolean;
    handleMoveCallback: (res?: MoveFnProps) => void;
    handleValueChangeCallback: (res?: ValueChangeFnProps) => void;
    basketFn: React.MutableRefObject<{
        move: (x: number, y: number) => void;
        up: (res: BasketUpFnProps) => void;
    }>;
}
const contextData = (): ContextDataProps => ({
    isMobile: false,

    handleMoveCallback: () => undefined,
    handleValueChangeCallback: () => undefined,
    basketFn: {
        current: {
            move: () => undefined,
            up: () => undefined,
        },
    },
});

export const Context = createContext(contextData());

export const useMContext = (): ContextDataProps => useContext(Context);
