import Modal, { ModalTransition } from "@atlaskit/modal-dialog";

export function ModalDialog({
  isOpen,
  setIsOpen,
  onClick,
  positiveLabel = "Okay",
  negativeLabel = "Cancel",
  heading,
  body,
  appearance = "warning",
}) {
  const close = () => setIsOpen(false);
  return (
    <>
      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[
              { text: positiveLabel, onClick: onClick },
              { text: negativeLabel, onClick: close },
            ]}
            onClose={close}
            heading={heading}
            appearance={appearance}
          >
            {body}
          </Modal>
        )}
      </ModalTransition>
    </>
  );
}
