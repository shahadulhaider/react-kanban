import { Column } from "components/Columnm";
import CustomDragLayer from "components/CustomDragLayer";
import { useAppstate } from "hooks/useAppState";
import { AppContainer } from "styles";

const App = (): JSX.Element => {
  const { state } = useAppstate();

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column key={list.id} id={list.id} text={list.text} index={i} />
      ))}
    </AppContainer>
  );
};

export default App;
