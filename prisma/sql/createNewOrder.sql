INSERT INTO "BookOrder" ("totalItems", "orderDate", "dueDate", "status", "studentID")
VALUES ($1, $2, $3, $4::"OrderStatus", $5)
RETURNING "orderID", "totalItems", "orderDate", "dueDate", "status", "studentID";
