import { createContext, useContext } from "react";
import { OptionProps } from "./unit";

interface ContextDataProps {
    mouseUpOnStorage: React.MutableRefObject<
        | {
              index: number;
              val: OptionProps;
          }
        | undefined
    >;
    isMobile: boolean;
    position?: {
        x: number;
        y: number;
    };
    setPosition: React.Dispatch<
        React.SetStateAction<
            | {
                  x: number;
                  y: number;
              }
            | undefined
        >
    >;
}

const contextData = (): ContextDataProps => ({
    mouseUpOnStorage: { current: undefined },
    isMobile: false,
    position: undefined,
    setPosition: () => undefined,
});

export const Context = createContext(contextData());

export const useMContext = (): ContextDataProps => useContext(Context);
