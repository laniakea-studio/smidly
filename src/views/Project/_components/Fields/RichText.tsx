import * as React from "react";
import styled from "styled-components";
import { InputText } from "../../../_components/Inputs";
import theme from "../../../../theme/theme.js";

interface TypeRichTextField {
  type: string;
  fieldId: string;
  title: string;
  hint: string;
  value?: any;
  required: boolean;
  localization: boolean;
}

interface TextSettingsProps {
  data: TypeRichTextField;
  setField: (arg0: TypeRichTextField) => void;
}

export const RichTextField: React.FC<TextSettingsProps> = ({
  data,
  setField,
}) => {
  const [fieldCheck, setFieldCheck] = React.useState({
    hasTitleValue: true,
    hasFieldIdValue: true,
    isFieldIdUnique: true,
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;

    setField({ ...data, [key]: value });
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
          name="value"
          label={`${data.title}${data.required && "*"}`}
          value={data.value.default}
          onChange={(e) => handleChange(e)}
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
