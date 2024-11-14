import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const books = [{ title: "Book 1" }, { title: "Book 2" }, { title: "Book 3" }];

const Searchbar = () => {
  return (
    <Autocomplete
      freeSolo
      className="w-1/2 md:w-1/4 my-2 bg-white rounded-2xl px-2"
      sx={{
        "& .MuiInputBase-root": {
          padding: 0, // Remove padding from TextField's input container
        },
      }}
      options={books.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          className="bg-transparent rounded-2xl px-2"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove border from outlined variant
            },
          }}
          {...params}
          placeholder="Search for book"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default Searchbar;
