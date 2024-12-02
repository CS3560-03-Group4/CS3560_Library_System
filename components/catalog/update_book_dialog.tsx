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
  import dayjs from "dayjs";
  import { useEffect, useState } from "react";
  import { categories } from "./add_book_dialog";
  import { BookCatalogProps } from "./columns";
  import { toast } from "react-toastify";
  
  interface UpdateBookDialogProps {
    selectedBook: BookCatalogProps | null;
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
  
  export default function UpdateBookDialog({
    selectedBook,
    isDialogOpen,
    isSubmitting,
    setDialogOpen,
    onSubmit,
  }: UpdateBookDialogProps) {
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
    const [initialFormData, setInitialFormData] = useState<FormData | null>(null);
  
    useEffect(() => {
      if (selectedBook) {
        const initialData = {
          title: selectedBook.title || "",
          author: selectedBook.author || "",
          datePublished: selectedBook.datePublished
            ? dayjs(selectedBook.datePublished) // Convert Date to Dayjs
            : null,
          publisher: selectedBook.publisher || "",
          numberOfPages: selectedBook.numberOfPages || 0,
          genre: selectedBook.genre ? selectedBook.genre.split(", ") : [],
          quantity: selectedBook.quantity || 0,
          description: selectedBook.description || "",
          imageURL: selectedBook.imageURL || "",
        };
        setFormData(initialData);
        setInitialFormData(initialData);
      }
    }, [selectedBook]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "numberOfPages" || name === "quantity" ? +value : value,
      }));
    };
  
    // Check if the form data has changed
    const hasChanges = initialFormData
      ? Object.keys(initialFormData).some(
          (key) =>
            JSON.stringify(formData[key as keyof FormData]) !==
            JSON.stringify(initialFormData[key as keyof FormData])
        )
      : false;
  
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
  
    if (!selectedBook) {
      return null;
    }
  
    return (
      <Dialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Book</DialogTitle>
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
                required
                multiple
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
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: hasChanges && !isSubmitting ? "#00843D" : "gray",
              color: "white",
              "&:disabled": {
                backgroundColor: "gray",
                color: "lightgray",
              },
            }}
            disabled={!hasChanges || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  