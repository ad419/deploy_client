import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Chat from "./Chat";
import { BsChatDots } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function TutorialModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <BsChatDots />
      <div className="sm:hidden lg:block">
        <Box sx={{ ...style }}>
          <Chat />
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </div>
    </Modal>
  );
}

export default TutorialModal;
