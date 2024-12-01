-- Update the quantity of a book in stock after order submission
UPDATE "BookInventory" SET "quantity" = "quantity" - 1 WHERE "bookID" = $1;