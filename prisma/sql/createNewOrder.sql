INSERT INTO "BookOrder" ("totalItems", "status", "orderDate")
VALUES ($1, 'PLACED', NOW())
RETURNING "orderID", "totalItems";
