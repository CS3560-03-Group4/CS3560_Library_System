"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";

// This type is used to define the shape of our data.
export type BookCatalogProps = {
  bookID: string;
  title: string;
  author: string;
  datePublished: string;
  imageURL: string;
  publisher: string;
  numberOfPages: number;
  genre: string;
  quantity: number;
  description: string;
};

export const columns: ColumnDef<BookCatalogProps>[] = [
   {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bookID",
    header: "Book ID",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[8rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          sx={{
            color: "black",
            "&:hover": { backgroundColor: "#00843D", color: "white" },
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableGlobalFilter: true,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[8rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          sx={{
            color: "black",
            "&:hover": { backgroundColor: "#00843D", color: "white" },
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableGlobalFilter: true,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[7rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "datePublished",
    header: "Date Published",
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "numberOfPages",
    header: "Print Length",
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[7rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[1rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[10rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "imageURL",
    header: "Image URL",
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className="w-[10rem] truncate">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#000000] text-white rounded-xl"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white" />
            <DropdownMenuItem
              // className="hover:bg-green-100"
              onClick={() => navigator.clipboard.writeText(book.bookID)}
            >
              Copy book ID
            </DropdownMenuItem>

            <DropdownMenuItem>View book details</DropdownMenuItem>
            <DropdownMenuItem>Update book</DropdownMenuItem>
            <DropdownMenuItem>Remove book</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
