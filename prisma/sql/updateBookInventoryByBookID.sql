--- Update book inventory by book ID
UPDATE "BookInventory"
SET "quantity" = $1
WHERE "bookID" = $2;