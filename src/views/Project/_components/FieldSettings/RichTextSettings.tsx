import * as React from "react";
import styled from "styled-components";
import { InputText, InputCheckbox } from "../../../_components/Inputs";
import theme from "../../../../theme/theme.js";

interface TypeRichTextField {
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  required: boolean;
  localization: boolean;
  toolbar: object;
  value?: any;
}

interface SettingsProps {
  data: TypeRichTextField;
  setFieldSettings: (arg0: TypeRichTextField) => void;
}

export const RichTextSettings: React.FC<SettingsProps> = ({
  data,
  setFieldSettings,
}) => {
  const [fieldCheck, setFieldCheck] = React.useState({
    hasTitleValue: true,
    hasFieldIdValue: true,
    isFieldIdUnique: true,
  });

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

  React.useEffect(() => {
    setFieldCheck(checkIfValid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const checkIfValid = () => {
    const object = {
      hasTitleValue: data.title.length > 0 ? true : false,
      hasFieldIdValue: data.fieldId.length > 0 ? true : false,
      isFieldIdUnique: true,
    };

    console.log(object);
    return object;
  };

  return (
    <Div>
      <form>
        <InputText
          className={fieldCheck.hasTitleValue ? undefined : "warning"}
          name="title"
          label="Title*"
          value={data.title}
          onChange={(e) => handleChange(e)}
        />
        <InputText
          className={fieldCheck.hasFieldIdValue ? undefined : "warning"}
          name="fieldId"
          label="Field ID*"
          value={data.fieldId}
          onChange={(e) => handleChange(e)}
        />
        <InputText
          name="hint"
          label="Hint"
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
  .warning input:focus {
    border: 1px solid #f55c5c;
  }
`;
