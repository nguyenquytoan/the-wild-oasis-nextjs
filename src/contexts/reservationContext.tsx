"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Range } from "@/models/common/common";

interface ReservationContextModel {
  range: Range;
  setRange?: Dispatch<SetStateAction<Range>>;
  resetRange?: () => void;
}

const initialState: Range = { from: undefined, to: undefined };

const ReservationContext = createContext<ReservationContextModel>({
  range: initialState,
});

export const ReservationProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext<ReservationContextModel>(ReservationContext);

  if (!context) {
    throw new Error("Context was used outside provider");
  }

  return context;
};
