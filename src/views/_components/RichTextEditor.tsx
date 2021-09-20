import React, { FC, useMemo, useState } from "react";
import styled from "styled-components";
// Import the Slate editor factory.
import { createEditor } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;

export type FormattedText = { text: string; bold?: true };

export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const RichTextEditor: FC<{}> = () => {
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  return (
    <Div>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable className="slate" />
      </Slate>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .slate {
    margin-bottom: 40px;
    border: 1px solid #a1a1a1;
    padding: 20px;
    border-radius: 4px;
    min-width: 300px;
  }
`;
