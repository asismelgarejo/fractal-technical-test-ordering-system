import { createContext, useContext, useState } from "react";

type ThemeContextProps = {
  open: boolean;
  setOpen(o: boolean): void;
};
const ThemeContext = createContext<ThemeContextProps>({
  open: false,
  setOpen(m: boolean) {},
});

type SettingContextProviderProps = {
  children: React.ReactNode;
};
export const SettingContextProvider: React.FC<SettingContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ThemeContext.Provider value={{ open, setOpen }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useSettingContext = () => useContext(ThemeContext);
