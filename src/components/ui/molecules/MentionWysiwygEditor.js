import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import addLinkPlugin from "./LinkPlugin";
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import mentionsStyles from './mentionsStyles.css';
// import mentions from './mentions';
import styled from 'styled-components';
import './styles.css'
import { AuthContext } from "../../../context/auth/authContext";
import { fetchUsersRequest } from "../../../api/user";
import Toolbar from './Toolbar'
import draftToHtml from "draftjs-to-html";
import {stateToHTML} from 'draft-js-export-html';

const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.length > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
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
          <StyledAvatar
            src={mention.avatar}
            role="presentation"
          />
        </StyledLeft>

        <StyledRight>
          <StyledText>
            {mention.name}
          </StyledText>

          <StyledTitle>
            {mention.title}
          </StyledTitle>
        </StyledRight>
      </StyledEntryContainer>
    </StyledEntry>
  );
};

export default class CustomMentionEditor extends Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin({
      mentions: props.mentions,
      entityMutability: 'IMMUTABLE',
      theme: mentionsStyles,
      positionSuggestions,
      mentionPrefix: '@',
      supportWhitespace: true
    });
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: [],
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.onChange(
      stateToHTML(editorState.getCurrentContent()),
      convertToRaw(editorState.getCurrentContent()),
      )
  };

  onSearchChange = ({ value }) => {
    if (value) {
      this.setState({
        suggestions: defaultSuggestionsFilter(value, this.props.mentions),
      });
    }
  };

  focus = () => {
    this.editor.focus();
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      console.log("handled")
      return "handled";
    }
    console.log("not-handled")
    return "not-handled";
  };

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  onFontSizeClick = fontSize => {
    console.log(fontSize)
    this.onChange( RichUtils.toggleBlockType( this.state.editorState, 'header-three' ));
  }

  onOrderedPointsClick = () => {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item')
    );
  }

  onBulletPointsClick = () => {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item')
    );
  }

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onStrikeThroughClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
    );
  };

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })

    console.log("PROPS ==> ", this.props);
    return this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin, addLinkPlugin];
    const theme = this.mentionPlugin;
    console.log(convertToRaw(this.state.editorState.getCurrentContent()))
    const selection = this.state.editorState.getSelection();
    const blockType = this.state.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
    return (
      <div className="editorContainer" >
        <Toolbar 
          blockType={blockType}
          onUnderlineClick={this.onUnderlineClick} 
          onBoldClick={this.onBoldClick} 
          onItalicClick={this.onItalicClick}
          onStrikeThroughClick={this.onStrikeThroughClick}
          onAddLink={this.onAddLink}
          onBulletPointsClick={this.onBulletPointsClick}
          onOrderedPointsClick={this.onOrderedPointsClick}
          onFontSizeClick={this.onFontSizeClick}
          toggleBlockType={this.toggleBlockType}
          />
        <div className="editors" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            // onEditorStateChange={this.onEditorStateChange}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
            name="comment"
            control={this.props.control}
            error={''}
            reset={this.props.reset}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            entryComponent={Entry}
            className={theme.mentionSuggestions}
          />
        </div>
      </div>
    );
  }
}

const StyledEditor = styled(Editor)`
.editor {
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ababab;
  background: #fefefe;
}

.editor :global(.public-DraftEditor-content) {
  min-height: 140px;
}`
const StyledEntry = styled.div`
  padding: 7px 10px 3px 10px;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
  background-color: ${props => props.isFocused ? "#cce7ff" : ""};
`
const StyledText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 80%;
  color: #a7a7a7;
`
const StyledEntryContainer = styled.div`
  display: table;
  width: 100%;
`
const StyledRight = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  padding-left: 8px;
`
const StyledLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`
const StyledAvatar = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`