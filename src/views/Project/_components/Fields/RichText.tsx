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

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

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
  return (
    <Div>
      <InputText
        name="value"
        label={`${data.title}${data.required && "*"}`}
        value={data.value.default}
      />
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
