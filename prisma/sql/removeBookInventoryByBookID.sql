--- remove book inventory by bookID
DELETE FROM "BookInventory"
WHERE "bookID" = $1;