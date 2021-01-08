import React from "react";
import styled from "styled-components";

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    // @defaultSelectText => Show default text in select
    // @showOptionList => Show / Hide List options
    // @optionsList => List of options
    this.state = {
      defaultSelectText: "",
      showOptionList: false,
      optionsList: [],
    };
  }

  componentDidMount() {
    // Add Event Listner to handle the click that happens outside
    // the Custom Select Container
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({
      defaultSelectText: this.props.defaultText,
    });
  }

  componentWillUnmount() {
    // Remove the event listner on component unmounting
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // This method handles the click that happens outside the
  // select text and list area
  handleClickOutside = (e) => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        showOptionList: false,
      });
    }
  };

  // This method handles the display of option list
  handleListDisplay = () => {
    this.setState((prevState) => {
      return {
        showOptionList: !prevState.showOptionList,
      };
    });
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  handleOptionClick = (e) => {
    this.setState({
      defaultSelectText: e.target.getAttribute("data-name"),
      showOptionList: false,
    });
    this.props.onChange(e.target.getAttribute("data-name"));
  };

  render() {
    const { optionsList } = this.props;
    const { showOptionList, defaultSelectText } = this.state;
    return (
      <Container>
        <SelectedText
          showOptionList={showOptionList}
          // className={showOptionList ? "selected-text active" : "selected-text"}
          onClick={this.handleListDisplay}
        >
          {defaultSelectText}
        </SelectedText>
        {showOptionList && (
          <StyledList>
            {optionsList.map((option) => {
              return (
                <ListItem
                  data-name={option.name}
                  key={option.id}
                  onClick={this.handleOptionClick}
                >
                  {option.name}
                </ListItem>
              );
            })}
          </StyledList>
        )}
      </Container>
    );
  }
}

export default CustomSelect;

const SelectedText = styled.div`
  background-color: #47eded;
  padding: 6px 20px;
  border-bottom: 1px solid #37b0b0;
  ${(props) =>
    props.showOptionList
      ? `&:after {
    top: 8px;
    border-color: transparent transparent #fff transparent;
  }`
      : ""}
  &:after {
    content: "";
    position: absolute;
    right: 10px;
    top: 16px;
    border: 7px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;
// .title {
//   text-align: center;
// }
const Container = styled.div`
  display: inline-block;
  min-width: 250px;
  text-align: center;
  position: relative;
`;
const ListItem = styled.li`
  list-style-type: none;
  padding: 6px 20px;
  background: #47eded;
  border-bottom: 1px solid #37b0b0;
  cursor: pointer;
  &:hover {
    background-color: #32a6a6;
    color: #ffffff;
  }
`;
const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  text-align: center;
  position: absolute;
  width: 100%;
`;
