--- Remove book by book ID
DELETE FROM "Book" 
WHERE "bookID" = $1;