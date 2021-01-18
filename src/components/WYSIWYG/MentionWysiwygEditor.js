import React, { Component, useState, useEffect, useRef } from "react";
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import { stateToHTML } from "draft-js-export-html";
import mentionsStyles from "./mentionsStyles.css";
import MentionEntry from "./MentionEntry";
import Toolbars from "./Toolbar";
import "draft-js/dist/Draft.css";
import { useMentions } from "../ChildProfile/tabs/Comments/mentions-context";
import styled from "styled-components";
import Immutable from "immutable";
import Button from "@atlaskit/button";
import QuoteIcon from "@atlaskit/icon/glyph/quote";

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

const MentionWysiwygEditor = (props) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { mentions } = useMentions();
  const [suggestions, setSuggestions] = useState([]);
  const [{ plugins, Toolbar, MentionSuggestions }] = useState(() => {
    console.log("MENTIONS ======>>>>>", mentions);

    const mentionPlugin = createMentionPlugin({
      mentions: mentions,
      entityMutability: "IMMUTABLE",
      theme: mentionsStyles,
      positionSuggestions,
      mentionPrefix: "@",
      supportWhitespace: true,
    });
    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin;
    const { MentionSuggestions } = mentionPlugin;
    const plugins = [toolbarPlugin, mentionPlugin];
    return {
      plugins,
      Toolbar,
      MentionSuggestions,
    };
  });

  const onSearchChange = ({ value }) => {
    console.log(value, mentions, suggestions);
    if (value) {
      setSuggestions(defaultSuggestionsFilter(value, mentions));
    }
  };

  // THIS CODE BREAKS MENTIONS!
  // useEffect(() => {
  //   setEditorState(EditorState.createEmpty());
  // }, [props.upd]);

  // useEffect(() => {
  //   editorRef.current && editorRef.current.focus();
  // }, []);

  useEffect(() => {
    props.setBlocks &&
      props.setBlocks(convertToRaw(editorState.getCurrentContent()).block);
  }, [convertToRaw(editorState.getCurrentContent()).blocks]);

  const onChange = (editorState) => {
    setEditorState(editorState);
    props.onChange(
      convertToRaw(editorState.getCurrentContent())
        .blocks.map((block) => (!block.text.trim() && "\n") || block.text)
        .join("\n"),
      convertToRaw(editorState.getCurrentContent()),
      stateToHTML(editorState.getCurrentContent())
    );
  };

  const focus = () => {
    this.editor.focus();
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
    onChange(RichUtils.toggleBlockType(editorState, "header-one"));
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

  const toggleBlockType2 = (event) => {
    event.preventDefault();

    let block = event.currentTarget.getAttribute("data-block");
    onChange(RichUtils.toggleBlockType(editorState, block));
  };

  console.log(convertToRaw(editorState.getCurrentContent()));

  const renderBlockButton = (value, block) => {
    return (
      <Button
        key={block}
        value={value}
        data-block={block}
        onMouseDown={toggleBlockType2}
        appearance="subtle"
        iconBefore={value === "Blockquote" ? <QuoteIcon size="small" /> : null}
        style={{ color: "#42526E", fontWeight: "600" }}
      >
        {value === "Blockquote" ? null : value}
      </Button>
    );
  };
  const blockTypeButtons = [
    {
      value: "H1",
      block: "header-one",
    },

    {
      value: "H2",
      block: "header-two",
    },

    {
      value: "H3",
      block: "header-three",
    },

    {
      value: "Blockquote",
      block: "blockquote",
    },
  ];
  const blockRenderMap = Immutable.Map({
    "header-two": {
      element: "h2",
    },
    "header-one": {
      element: "h1",
    },
    "header-three": {
      element: "h3",
    },
    "header-four": {
      element: "h4",
    },
  });

  return (
    <EditorContainer>
      <Editors onClick={() => editorRef.current && editorRef.current.focus()}>
        <div
          style={{ display: "flex", marginBottom: "1em", marginLeft: "-1em" }}
        >
          <div className="block-style-options">
            {blockTypeButtons.map((button) => {
              return renderBlockButton(button.value, button.block);
            })}
          </div>
          <Toolbars
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
        </div>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          handleKeyCommand={handleKeyCommand}
          ref={(editor) => (editorRef.current = editor)}
          blockRenderMap={blockRenderMap}
        />
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={suggestions}
          entryComponent={MentionEntry}
          className={mentionsStyles.mentionSuggestions}
        />
      </Editors>
    </EditorContainer>
  );
};
export default MentionWysiwygEditor;

const EditorContainer = styled.div`
  padding: 0em 1em 1em 1em;
  margin: 0.5em 1em 1em 1em;
`;

const Editors = styled.div`
  border: 1px transparent solid;
  // padding: 1.5em 2em 2.75em 2em;
  font-size: 14px;
  /* letter-spacing: 1.2px; */
  border-radius: 6px;
  text-align: left;
  line-height: 1.5em;
  color: black;
`;
