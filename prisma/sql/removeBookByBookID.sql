--- Remove book by bookID
DELETE FROM "Book"
WHERE "bookID" = $1;