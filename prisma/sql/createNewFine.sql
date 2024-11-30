INSERT INTO "Fine" ("amount", "status", "orderID", "studentID") 
VALUES ($1, $2::"FineStatus", $3, $4)
RETURNING "fineID", "amount", "status", "orderID", "studentID";