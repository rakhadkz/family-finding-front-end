import React, { Component, useState, useEffect, useRef } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import Toolbar from "./Toolbar";
import addLinkPlugin from "./LinkPlugin";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import draftToHtml from "draftjs-to-html";
import { stateToHTML } from "draft-js-export-html";
import mentionsStyles from "./mentionsStyles.css";
import styled from "styled-components";

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.length > 0) {
    transform = "scaleY(1)";
    transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)";
  } else if (state.isActive) {
    transform = "scaleY(0)";
    transition = "all 0.25s cubic-bezier(.3,1,.2,1)";
  }

  return {
    transform,
    transition,
  };
};

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <StyledEntry isFocused={isFocused}>
      <StyledEntryContainer>
        <StyledLeft>
          <StyledAvatar src={mention.avatar} role="presentation" />
        </StyledLeft>

        <StyledRight>
          <StyledText>{mention.name}</StyledText>

          <StyledTitle>{mention.title}</StyledTitle>
        </StyledRight>
      </StyledEntryContainer>
    </StyledEntry>
  );
};

const MentionWysiwygEditor = (props) => {
  const mentionPlugin = createMentionPlugin({
    mentions: props.mentions,
    entityMutability: "IMMUTABLE",
    theme: mentionsStyles,
    positionSuggestions,
    mentionPrefix: "@",
    supportWhitespace: true,
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);
  let editor = useRef(null);

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, [props.upd]);

  const onChange = (editorState) => {
    setEditorState(editorState);
    props.onChange(
      stateToHTML(editorState.getCurrentContent()),
      convertToRaw(editorState.getCurrentContent())
    );
  };

  const onSearchChange = ({ value }) => {
    if (value) {
      setSuggestions(defaultSuggestionsFilter(value, this.props.mentions));
    }
  };

  const focus = () => {
    editor.focus();
  };

  const onAddLink = () => {
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link");
    if (!link) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      console.log("handled");
      return "handled";
    }
    console.log("not-handled");
    return "not-handled";
  };

  const onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const onFontSizeClick = (fontSize) => {
    console.log(fontSize);
    onChange(RichUtils.toggleBlockType(editorState, "header-three"));
  };

  const onOrderedPointsClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const onBulletPointsClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onStrikeThroughClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    console.log("PROPS ==> ", this.props);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  const { MentionSuggestions } = mentionPlugin;
  const plugins = [mentionPlugin, addLinkPlugin];
  const theme = mentionPlugin;
  console.log(convertToRaw(editorState.getCurrentContent()));
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <EditorContainer>
      <Toolbar
        blockType={blockType}
        onUnderlineClick={onUnderlineClick}
        onBoldClick={onBoldClick}
        onItalicClick={onItalicClick}
        onStrikeThroughClick={onStrikeThroughClick}
        onAddLink={onAddLink}
        onBulletPointsClick={onBulletPointsClick}
        onOrderedPointsClick={onOrderedPointsClick}
        onFontSizeClick={onFontSizeClick}
        toggleBlockType={toggleBlockType}
      />
      <Editors onClick={focus}>
        <Editor
          editorState={editorState}
          // onEditorStateChange={this.onEditorStateChange}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
          ref={(element) => {
            editor = element;
          }}
          name="comment"
          control={props.control}
          error={""}
          reset={props.reset}
        />
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestions}
          entryComponent={Entry}
          className={theme.mentionSuggestions}
        />
      </Editors>
    </EditorContainer>
  );
};

export default MentionWysiwygEditor;

const EditorContainer = styled.div`
  padding: 0em 1em 1em 1em;
  margin: 1em;
`;

const Editors = styled.div`
  border: 1px transparent solid;
  padding: 1.5em 2em 2.75em 2em;
  font-size: 14px;
  /* letter-spacing: 1.2px; */
  border-radius: 6px;
  text-align: left;
  line-height: 1.5em;
  color: black;
`;

const StyledEntry = styled.div`
  padding: 7px 10px 3px 10px;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  background-color: ${(props) => (props.isFocused ? "#cce7ff" : "")};
`;
const StyledText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 80%;
  color: #a7a7a7;
`;
const StyledEntryContainer = styled.div`
  display: table;
  width: 100%;
`;
const StyledRight = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  padding-left: 8px;
`;
const StyledLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
const StyledAvatar = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
