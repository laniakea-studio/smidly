import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { InputText } from "../../../_components/Inputs";
import theme from "../../../../theme/theme.js";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import { RichTextEditor } from "../../../_components/slate/RichTextEditor.jsx";
import {
  serialize,
  deserialize,
} from "../../../_components/slate/htmlSerializing";

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
  console.log("input: ", data.value.default);

  const valueDoc = new DOMParser().parseFromString(
    data.value.default,
    "text/html"
  );

  console.log("domparser: ", valueDoc.body);

  const [value, setValue] = useState(deserialize(valueDoc.body));

  console.log("value: ", value);

  const handleChange = (newValue: any) => {
    setValue(newValue);

    const htmlValue = value.map((i: any) => serialize(i)).join("");

    setField({ ...data, value: { default: htmlValue } });
  };

  return (
    <Div>
      <RichTextEditor value={value} onChange={handleChange} />
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
