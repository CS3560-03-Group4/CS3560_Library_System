--- Udoate book info by book id
UPDATE "Book" 
SET "title" = $2, "author" = $3, "datePublished" = $4, "publisher" = $5, "genre" = $6, "numberOfPages" = $7, "description" = $8, "imageURL" = $9 
WHERE "bookID" = $1;