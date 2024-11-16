import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface DialogProps {
  orderID: string;
  orderItems: string[];
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsDialog({
  orderID,
  orderItems,
  open,
  onClose,
}: DialogProps) {
  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          Order ID: {orderID}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography variant="h6" className="font-bold" gutterBottom>
            Order Items:
          </Typography>
          <ol className="list-inside custom-list">
            {orderItems.map((item) => (
              <li className="text-lg font-medium" key={orderID}>
                {item}
              </li>
            ))}
          </ol>
        </DialogContent>
      </Dialog>
    </>
  );
}
