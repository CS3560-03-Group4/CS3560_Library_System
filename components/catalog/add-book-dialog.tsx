import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

export const categories = [
  "Trending",
  "Fiction",
  "Non-fiction",
  "Thriller",
  "Mystery",
  "Fantasy",
  "Self-help",
  "Computer Science",
];

interface AddBookDialogProps {
  isDialogOpen: boolean;
  isSubmitting: boolean;
  setDialogOpen: (open: boolean) => void;
  onSubmit: (newBook: any) => void;
}

interface FormData {
  title: string;
  author: string;
  datePublished: Dayjs | null;
  publisher: string;
  numberOfPages: number;
  genre: string[];
  quantity: number;
  description: string;
  imageURL: string;
}

export default function AddBookDialog({
  isDialogOpen,
  isSubmitting,
  setDialogOpen,
  onSubmit,
}: AddBookDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    datePublished: null,
    publisher: "",
    numberOfPages: 0,
    genre: [],
    quantity: 0,
    description: "",
    imageURL: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "numberOfPages" || name === "quantity" ? +value : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.author ||
      !formData.publisher ||
      !formData.numberOfPages ||
      !formData.quantity
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    onSubmit(formData);
    setDialogOpen(false); // Close the dialog after submitting
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <div className="my-4 space-y-4">
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            fullWidth
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Published"
              value={formData.datePublished}
              onChange={(newValue) =>
                setFormData({ ...formData, datePublished: newValue })
              }
            />
          </LocalizationProvider>
          <TextField
            label="Publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Number of Pages"
            name="numberOfPages"
            type="number"
            slotProps={{ htmlInput: { min: 0 } }} // Add min value to 0
            value={formData.numberOfPages}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              name="genre"
              multiple
              required
              value={formData.genre}
              onChange={(event: any) =>
                setFormData({
                  ...formData,
                  genre: event.target.value as string[],
                })
              }
              input={<OutlinedInput id="select-multiple-chip" label="Genre" />}
              renderValue={(selected: any) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {categories.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            slotProps={{ htmlInput: { min: 0 } }} // Add min value to 0
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Image URL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            backgroundColor: !isSubmitting ? "#00843D" : "gray",
            color: "white",
            "&:disabled": {
              backgroundColor: "gray",
              color: "lightgray",
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
