import { Box } from "../components/ui/atoms";
import { FitScore } from "../components/ui/molecules";
import { Avatar } from "../components/ui/molecules/Avatar";
import { updateChildContactRequestConnections } from "../api/childContact";
import { useState, useContext } from "react";
import Switch from "react-switch";
import { ChildContext } from "../pages/ChildProfilePage";
import { ACTIONS, initialState } from "../reducers/child.reducer";

const ConnectionsTableData = (data, setIsLoading) => {
  const { dispatch } = useContext(ChildContext);
  return data.map(function (item, index) {
    const onSubmitHandle = async () => {
      setIsLoading(true);
      updateChildContactRequestConnections(
        {
          child_contact: {
            potential_match: !item.potential_match,
          },
        },
        item.id
      )
        .then(() =>
          dispatch({
            type: ACTIONS.POST_POTENTIAL_MATCH,
            payload: index,
          })
        )
        .finally(() => {
          setIsLoading(false);
        });
    };

    return {
      key: index,
      cells: [
        {
          key: "full_name",
          content: (
            <Box d="flex" align="center">
              <Avatar
                name={`${item?.contact?.first_name} ${item?.contact?.last_name}`}
                size="medium"
              />
              <span style={{ marginLeft: "8px" }}>
                {`${item?.contact?.first_name || ""} ${
                  item?.contact?.last_name || ""
                }`}
              </span>
            </Box>
          ),
        },
        {
          key: "relationship",
          content: item?.contact?.relationship,
        },
        {
          key: "phone",
          content: item.contact?.phone,
        },
        {
          key: "email",
          content: item.contact?.email,
        },
        {
          key: "fit_score",
          content: (
            <FitScore
              score={
                item.contact?.score
                  ? item.contact?.score
                  : Math.floor(Math.random() * 6)
              }
            />
          ),
        },
        {
          key: "potential_match",
          content: (
            <Box
              d="flex"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
              }}
            >
              <Switch
                id="potential_match"
                checked={item.potential_match}
                onChange={onSubmitHandle}
                onColor="#3182ce"
                borderRadius={30}
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={14}
                width={35}
              />
            </Box>
          ),
        },
      ],
    };
  });
};

export { ConnectionsTableData };
