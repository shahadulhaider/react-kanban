import { useFocus } from "hooks/useFocus";
import { useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "styles";

interface NewItemFormProps {
  onAdd(text: string): void;
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  return (
    <NewItemFormContainer
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(text);
      }}
    >
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onAdd(text);
        }}
      >
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
};
