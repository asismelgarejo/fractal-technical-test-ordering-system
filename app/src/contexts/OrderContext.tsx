import { createContext, useContext, useState } from "react";

type ActiveSection = {
  active: boolean;
  name: string;
};
type ActiveSectionProps = {
  sections: Record<string, ActiveSection>;
  changeSections(_id: string, payload: ActiveSection): void;
};
const ActiveSection = createContext<Partial<ActiveSectionProps>>({});

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

export const ActiveSectionContextProvider: React.FC<
  ActiveSectionContextProviderProps
> = ({ children }) => {
  const [sections, setSections] = useState<Record<string, ActiveSection>>({});
  const changeSections = (_id: string, payload: ActiveSection) => {
    setSections((prev) => ({ ...prev, [_id]: payload }));
  };
  return (
    <ActiveSection.Provider value={{ sections, changeSections }}>
      {children}
    </ActiveSection.Provider>
  );
};

export const useActiveSectionContext = () => useContext(ActiveSection);
