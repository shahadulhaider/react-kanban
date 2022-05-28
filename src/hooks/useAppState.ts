import { AppContext } from "context";
import { useContext } from "react";

export const useAppstate = () => {
  return useContext(AppContext);
};
