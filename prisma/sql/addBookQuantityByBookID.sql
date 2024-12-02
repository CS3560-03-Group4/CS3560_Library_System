--- Add book quantity by book ID
INSERT INTO "BookInventory" ("bookID", "quantity")
VALUES ($1, $2);