import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Modes = "logs" | "settings" | "event" | "command";
type ModeContextValue = [Modes, Dispatch<SetStateAction<Modes>>];

export const ModeContext = createContext<ModeContextValue>([
  "command",
  () => console.error("attempted to use ModeContext outside of a Provider"),
]);

export function useModeContext() {
  return useContext(ModeContext);
}

export function ModeProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<Modes>("command");

  return (
    <ModeContext.Provider value={[mode, setMode]}>
      {children}
    </ModeContext.Provider>
  );
}
