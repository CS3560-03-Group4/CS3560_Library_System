UPDATE "BookOrder"
SET "status" = $1::"OrderStatus"
WHERE "orderID" = $2;