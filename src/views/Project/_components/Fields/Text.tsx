import * as React from "react";
import styled from "styled-components";
import { InputText, InputCheckbox } from "../../../_components/Inputs";
import theme from "../../../../theme/theme.js";

interface TypeTextField {
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  value?: any;
  required: boolean;
  localization: boolean;
}

interface TextSettingsProps {
  data: TypeTextField;
  setField: (arg0: TypeTextField) => void;
}

export const TextField: React.FC<TextSettingsProps> = ({ data, setField }) => {
  const [fieldCheck, setFieldCheck] = React.useState({
    hasTitleValue: true,
    hasFieldIdValue: true,
    isFieldIdUnique: true,
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;

    setField({ ...data, value: { [key]: value } });
    console.log(data);
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
      <pre className="fieldId">{data.fieldId}</pre>
      <InputText
        className={fieldCheck.hasTitleValue ? undefined : "warning"}
        name="default"
        label={`${data.title}${data.required && "*"}`}
        value={data.value.default}
        onChange={(e) => handleChange(e)}
        hint={data.hint}
      />
    </Div>
  );
};

const Div = styled.div`
  padding: 20px 0;
  position: relative;
  .warning label {
    color: #f55c5c;
  }
  .warning input:focus {
    border: 1px solid #f55c5c;
  }
  .fieldId {
    float: right;
  }
`;
