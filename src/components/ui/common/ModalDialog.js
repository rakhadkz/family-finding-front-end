import Modal, { ModalTransition } from "@atlaskit/modal-dialog";

export function ModalDialog({
  isOpen,
  setIsOpen,
  onClick,
  positiveLabel = "Okay",
  negativeLabel = "Cancel",
  heading = null,
  body,
  appearance = null,
  hasActions = true,
  width = "medium",
  isLoading = false
}) {
  const close = () => setIsOpen(false);
  return (
    <>
      <ModalTransition>
        {isOpen && (
          <Modal
            width={width}
            actions={hasActions && [
              { text: positiveLabel, onClick: onClick, isLoading: isLoading },
              { text: negativeLabel, onClick: close },
            ]}
            onClose={close}
            heading={heading}
            appearance={null}
          >
            {body}
          </Modal>
        )}
      </ModalTransition>
    </>
  );
}
