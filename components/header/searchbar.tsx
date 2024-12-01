import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";

const books = [{ title: "Harry Potter and the Philosopher's Stone" }, { title: "Detective Conan" }, { title: "I See yellow Flowers in The Green Grass" }];

const Searchbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-result/${searchQuery}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      className="w-full md:w-1/3 my-2 bg-white rounded-2xl px-2"
      sx={{
        "& .MuiInputBase-root": {
          padding: 0, // Remove padding from TextField's input container
        },
        "& .MuiInputLabel-outlined": {
          transform: "translate(24px, 8px) scale(1)", // Adjust label position
          "&.Mui-focused": {
            transform: "translate(14px, -6px) scale(0.75)", // Adjust label position on focus
          },
        },
      }}
      options={books.map((option) => option.title)}
      value={searchQuery}
      inputValue={searchQuery}
      onInputChange={(event, newInputValue) => {
        setSearchQuery(newInputValue);
      }}
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
          variant="outlined"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
              event.preventDefault(); // Prevent the default action to avoid form submission
            }
          }}
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