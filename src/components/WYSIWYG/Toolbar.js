import React from "react";
import EditorLinkIcon from "@atlaskit/icon/glyph/editor/link";
import EditorUnderlineIcon from "@atlaskit/icon/glyph/editor/underline";
import EditorBoldIcon from "@atlaskit/icon/glyph/editor/bold";
import EditorItalicIcon from "@atlaskit/icon/glyph/editor/italic";
import EditorStrikethroughIcon from "@atlaskit/icon/glyph/editor/strikethrough";
import EditorBulletListIcon from "@atlaskit/icon/glyph/editor/bullet-list";
import EditorNumberListIcon from "@atlaskit/icon/glyph/editor/number-list";
import Button from "@atlaskit/button";
import styled from "styled-components";

const Toolbar = (props) => {
  const {
    onUnderlineClick,
    onBoldClick,
    onItalicClick,
    onStrikeThroughClick,
    onAddLink,
    onBulletPointsClick,
    onOrderedPointsClick,
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <Divider />

      <StyledBytton
        id="ordered-list-item"
        appearance="subtle"
        onMouseDown={onOrderedPointsClick}
        iconBefore={<EditorNumberListIcon />}
      />

      <Button
        appearance="subtle"
        id="unordered-list-item"
        onMouseDown={onBulletPointsClick}
        iconBefore={<EditorBulletListIcon />}
      />

      <Divider />

      <StyledBytton
        appearance="subtle"
        id="underline"
        onMouseDown={onUnderlineClick}
        iconBefore={<EditorUnderlineIcon />}
      />

      <StyledBytton
        appearance="subtle"
        id="bold"
        onMouseDown={onBoldClick}
        iconBefore={<EditorBoldIcon />}
      />

      <StyledBytton
        appearance="subtle"
        id="italic"
        onMouseDown={onItalicClick}
        iconBefore={<EditorItalicIcon />}
      />

      <Button
        appearance="subtle"
        onMouseDown={onStrikeThroughClick}
        iconBefore={<EditorStrikethroughIcon />}
      />

      <Divider />

      <Button
        id="link_url"
        appearance="subtle"
        onMouseDown={onAddLink}
        iconBefore={<EditorLinkIcon />}
      />
    </div>
  );
};

const StyledBytton = styled(Button)`
  padding: 0px;
  .css-1tg8auj-ButtonBase {
    background: rgb(37, 56, 88);
  }
`;
const Divider = styled.span`
  background: rgb(235, 236, 240);
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0px 20px;
`;

export default Toolbar;
