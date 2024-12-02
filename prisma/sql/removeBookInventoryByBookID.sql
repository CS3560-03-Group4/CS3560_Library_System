--- Remove book inventory by book ID
DELETE FROM "BookInventory" 
WHERE "bookID" = $1;