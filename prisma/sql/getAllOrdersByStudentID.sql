SELECT "orderID", "totalItems", "orderDate", "dueDate", "status"
FROM "BookOrder"
WHERE "studentID" = $1
ORDER BY "updatedAt" DESC