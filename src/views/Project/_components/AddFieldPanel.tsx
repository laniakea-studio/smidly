import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldIcon } from "../../_components/SvgFieldIcons";
import { Button } from "../../_components/Button";
import theme from "../../../theme/theme.js";
import equal from "fast-deep-equal";
import short from "short-uuid";

const defaultFieldSettings = [
  {
    type: "text",
    typeTitle: "Text",
    defaultValues: {
      type: "text",
      fieldId: "",
      title: "",
      hint: "",
      required: false,
      localization: false,
      value: { default: "" },
    },
  },
  {
    type: "richText",
    typeTitle: "Rich Text",
    defaultValues: {
      type: "richText",
      fieldId: "",
      title: "",
      hint: "",
      required: false,
      localization: false,
      toolbar: ["h1", "h2", "h3"],
      value: { default: `<p>Well helloo...</p>` },
    },
  },
  {
    type: "repeater",
    typeTitle: "Repeater",
    defaultValues: {
      type: "repeater",
      fieldId: "",
      title: "",
      hint: "",
      required: false,
      localization: false,
      value: { default: "" },
    },
  },
];

interface TextSettingsProps {
  addNewField: (arg0: object) => void;
}

export const AddFieldPanel: FC<TextSettingsProps> = ({ addNewField }) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    defaultObject: any
  ) => {
    e.preventDefault();
    defaultObject.id = short.generate();
    addNewField(defaultObject);
  };

  return (
    <NewFieldDiv>
      <h2>Add new field</h2>
      <div className="grid">
        {defaultFieldSettings.map((i) => (
          <button
            key={i.typeTitle}
            onClick={(e) => handleClick(e, { ...i.defaultValues })}
          >
            <FieldIcon icon={i.type} />
            <span>{i.typeTitle}</span>
          </button>
        ))}
      </div>
    </NewFieldDiv>
  );
};

const NewFieldDiv = styled.div`
  margin-top: auto;
  padding-bottom: 100px;
  .grid {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    button {
      svg {
        height: 20px;
        margin-bottom: 10px;
      }
      width: 80px;
      height: 80px;
      border: 1px solid #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-size: 12px;
    }
  }
`;
