import React, { FC, useMemo, useState, useCallback } from "react";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import styled from "styled-components";
// Import the Slate
import {
  BaseEditor,
  Descendant,
  createEditor,
  Editor,
  Transforms,
  Text,
} from "slate";
import { ReactEditor, Slate, Editable, withReact } from "slate-react";
import { HistoryEditor } from "slate-history";

export const serialize = (node) => {
  if (Text.isText(node.nodeType)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};

export const deserialize = (el) => {
  console.log("des:", el);
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "BLOCKQUOTE":
      return jsx("element", { type: "quote" }, children);
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    case "strong":
      return jsx("element", { type: "bold", bold: true }, children);
    case "EM":
      return jsx("element", { type: "bold" }, children);
    default:
      return el.textContent;
  }
};
