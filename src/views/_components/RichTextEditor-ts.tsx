import React, { FC, useMemo, useState, useCallback } from "react";
import styled from "styled-components";
// Import the Slate
import {
  BaseEditor,
  Descendant,
  createEditor,
  Editor,
  Transforms,
} from "slate";
import { ReactEditor, Slate, Editable, withReact } from "slate-react";
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

export type CodeElement = {
  type: "code";
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | CodeElement;

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

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Div>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          className="slate"
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === "`" && event.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              event.preventDefault();
              // Otherwise, set the currently selected blocks type to "code".
              Transforms.setNodes(
                editor,
                { type: "code" },
                { match: (n) => Editor.isBlock(editor, n) }
              );
            }
          }}
        />
      </Slate>
    </Div>
  );
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
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
