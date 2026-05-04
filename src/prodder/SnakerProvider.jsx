import { useState } from "react";
import { SnackbarContext } from "../context/SnackbarContext";
import SimpleSnackbar from "../SimpleSnackbar";
export function SnakerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState("");

  function showSnscker(massage) {
    setOpen(true);
    setMassage(massage);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <SnackbarContext.Provider value={{ showSnscker }}>
      <SimpleSnackbar open={open} massage={massage} />
      {children}
    </SnackbarContext.Provider>
  );
}
