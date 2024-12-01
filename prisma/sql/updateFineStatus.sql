UPDATE "Fine" 
SET "status" = $1::"FineStatus"
WHERE "fineID" = $2
RETURNING *;