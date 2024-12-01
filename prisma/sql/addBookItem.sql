INSERT INTO "BookItem" ("orderID", "bookID")
VALUES ($1, $2)
RETURNING "orderID", "bookID";
