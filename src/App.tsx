import { useAppstate } from "hooks/useAppState";
import React from "react";

const App = (): JSX.Element => {
  const { state, dispatch } = useAppstate();

  return (
    <div>
      <h1>Kanban</h1>
    </div>
  );
};

export default App;
