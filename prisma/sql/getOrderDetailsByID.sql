SELECT B3."orderID", B1."bookID", B1."title", B1."author", B1."datePublished", B1."imageURL", B3."totalItems", B3."orderDate", B3."dueDate", B3."status"
FROM "Book" AS B1
JOIN "BookItem" AS B2 ON B1."bookID" = B2."bookID"
JOIN "BookOrder" AS B3 ON B2."orderID" = B3."orderID"
WHERE B3."orderID" = $1;