import { Box } from "../components/ui/atoms";
import { FitScore } from "../components/ui/molecules";
import { Switch } from "@chakra-ui/react";
import { Avatar } from "../components/ui/molecules/Avatar";
import { updateChildContactRequestConnections } from "../api/childContact";
import EditorEditIcon from "@atlaskit/icon/glyph/editor/edit";
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import { ChakraProvider } from "@chakra-ui/react";
import Button from "@atlaskit/button";

const connectionsTableData = (data, setIsLoading, setContacts, setIsOpenEdit, setIsDisqualifyModalOpen, setCurrentContact) => {
  console.log("TREEEE:", data)
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
        .then((items) => {
          console.log("something");
          data[index].potential_match = !item.potential_match;
          setContacts(data);
        })
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
              <Avatar name={`${item?.contact?.first_name} ${item?.contact?.last_name}`} size="medium" />
              <span style={{ marginLeft: "8px", marginRight: "5px" }}>
                {`${item?.contact?.first_name || ""} ${
                  item?.contact?.last_name || ""
                }`}
              </span>
              <Button spacing="none" appearance="link" onClick={() => {
                setCurrentContact(item)
                setIsOpenEdit(true)
              }}>
                <EditorEditIcon size="medium" />
              </Button>
              <Button spacing="none" appearance="link" onClick={() => {
                setCurrentContact(item)
                setIsDisqualifyModalOpen(true)
              }}>
                <EditorRemoveIcon primaryColor="red" size="medium" />
              </Button>
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
            <ChakraProvider>
              <Box
                d="flex"
                style={{
                  marginTop: "10px",
                  marginLeft: "30px",
                }}
              >
                <Switch
                  id="potential_match"
                  isChecked={item.potential_match}
                  onChange={onSubmitHandle}
                />
              </Box>
            </ChakraProvider>
          ),
        },
      ],
    };
  });
};

export { connectionsTableData };
