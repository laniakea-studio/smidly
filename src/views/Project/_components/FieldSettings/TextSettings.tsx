import * as React from "react";
import styled from "styled-components";
import { InputText, InputCheckbox } from "../../../_components/Inputs";
import theme from "../../../../theme/theme.js";
import {
  isUnique,
  isSlug,
  hasMinCharacters,
} from "../../../../utils/inputValidation";

interface TypeTextField {
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  required: boolean;
  localization: boolean;
  value?: any;
}

interface TextSettingsProps {
  data: TypeTextField;
  setFieldSettings: (arg0: TypeTextField) => void;
}

export const TextSettings: React.FC<TextSettingsProps> = ({
  data,
  setFieldSettings,
}) => {
  const [showMessage, setShowMessage] = React.useState<any>({});

  const validation: {
    [k: string]: Array<{ valid: boolean; message: string }>;
  } = {
    title: [hasMinCharacters(data.title, 3)],
    fieldId: [hasMinCharacters(data.fieldId, 3), isSlug(data.fieldId)],
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;

    setFieldSettings({ ...data, [key]: value });
  };
  const handleChecboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.checked;
    setFieldSettings({ ...data, [key]: value });
  };

  const showMessageOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;

    const messages = validation[name]
      .filter((i: any) => {
        return i.message !== "";
      })
      .map((i) => i.message);

    const message = {
      field: name,
      messages,
    };

    setShowMessage(message);
  };

  const showWarning = (input: string) => {
    if (showMessage.field === input) {
      return showMessage.messages;
    } else return null;
  };

  return (
    <Div>
      <form>
        <InputText
          className={
            validation.title.every((i) => i.valid) ? undefined : "warning"
          }
          name="title"
          label="Title*"
          value={data.title}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => showMessageOnBlur(e)}
          warning={showWarning("title")}
        />

        <InputText
          className={
            validation.fieldId.every((i) => i.valid) ? undefined : "warning"
          }
          name="fieldId"
          label="Field ID*"
          value={data.fieldId}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => showMessageOnBlur(e)}
          warning={showWarning("fieldId")}
        />
        <InputText
          name="hint"
          label="Hint"
          max="20"
          value={data.hint}
          onChange={(e) => handleChange(e)}
        />
        <InputCheckbox
          name="required"
          label="Required"
          checked={data.required}
          onChange={(e) => handleChecboxChange(e)}
        />
        <InputCheckbox
          name="localization"
          label="Enable localization"
          checked={data.localization}
          onChange={(e) => handleChecboxChange(e)}
        />
      </form>
    </Div>
  );
};

const Div = styled.div`
  padding: 20px 0;
  .warning label {
    color: #f55c5c;
  }
`;
