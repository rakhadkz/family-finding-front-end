import React from "react";
import EditorLinkIcon from "@atlaskit/icon/glyph/editor/link";
import EditorUnderlineIcon from "@atlaskit/icon/glyph/editor/underline";
import EditorBoldIcon from "@atlaskit/icon/glyph/editor/bold";
import EditorItalicIcon from "@atlaskit/icon/glyph/editor/italic";
import EditorStrikethroughIcon from "@atlaskit/icon/glyph/editor/strikethrough";
import EditorBulletListIcon from "@atlaskit/icon/glyph/editor/bullet-list";
import EditorNumberListIcon from "@atlaskit/icon/glyph/editor/number-list";
import MediaServicesTextIcon from "@atlaskit/icon/glyph/media-services/text";
import EditorTextStyleIcon from "@atlaskit/icon/glyph/editor/text-style";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import LinkIcon from "@atlaskit/icon/glyph/link";
import Button from "@atlaskit/button";
import styled from "styled-components";
import Select from "@atlaskit/select";
import CustomSelect from "./CustomSelectNotStyled";

const HEADER_TYPES = [
  { id: 1, name: "(None)", style: "unstyled" },
  { id: 2, name: "H1", style: "header-one" },
  { id: 3, name: "H2", style: "header-two" },
  { id: 4, name: "H3", style: "header-three" },
  { id: 5, name: "H4", style: "header-four" },
  { id: 6, name: "H5", style: "header-five" },
  { id: 7, name: "H6", style: "header-six" },
];

class FontSizeSelect extends React.Component {
  onToggle = (event) => {
    let value = event.target.value;
    this.props.onToggle(value);
  };

  render() {
    return (
      <StyledSelect
        onChange={this.onToggle}
        defaultText={
          <Button appearance="subtle">
            <MediaServicesTextIcon style={{ width: "80%", height: "30px" }} />
          </Button>
        }
        optionsList={HEADER_TYPES}
      />
    );
  }
}

const Toolbar = (props) => {
  const {
    blockType,
    onUnderlineClick,
    onBoldClick,
    onItalicClick,
    onStrikeThroughClick,
    onAddLink,
    onBulletPointsClick,
    onOrderedPointsClick,
    onFontSizeClick,
    toggleBlockType,
  } = props;

  return (
    <div style={{ display: "inline" }}>
      {/* <FontSizeSelect 
        headerOptions={HEADER_TYPES}
        active={blockType}
        onToggle={toggleBlockType}
      /> */}

      <Button id="font-size" appearance="subtle" onMouseDown={onFontSizeClick}>
        <EditorTextStyleIcon />
      </Button>

      <Divider />

      <StyledBytton
        id="ordered-list-item"
        appearance="subtle"
        onMouseDown={onOrderedPointsClick}
      >
        <EditorNumberListIcon />
      </StyledBytton>

      <Button
        appearance="subtle"
        id="unordered-list-item"
        onMouseDown={onBulletPointsClick}
      >
        <EditorBulletListIcon />
      </Button>

      <Divider />

      <Button appearance="subtle" id="underline" onMouseDown={onUnderlineClick}>
        <EditorUnderlineIcon />
      </Button>

      <Button appearance="subtle" id="bold" onMouseDown={onBoldClick}>
        <EditorBoldIcon />
      </Button>

      <Button appearance="subtle" id="italic" onMouseDown={onItalicClick}>
        <EditorItalicIcon />
      </Button>

      <Button appearance="subtle" onMouseDown={onStrikeThroughClick}>
        <EditorStrikethroughIcon />
      </Button>

      <Divider />

      <Button id="link_url" appearance="subtle" onMouseDown={onAddLink}>
        <EditorLinkIcon /> {/*<LinkIcon />*/}
      </Button>
    </div>
  );
};

const StyledSelect = styled(CustomSelect)`
  width: 2em;
`;
const StyledBytton = styled(Button)`
  height: 2em;
  width: 10px;
`;
const Divider = styled.span`
  background: rgb(235, 236, 240);
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0px 8px;
`;

export default Toolbar;
