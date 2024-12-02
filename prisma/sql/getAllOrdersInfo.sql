SELECT bo."orderID" AS "OrderID",
       bo."studentID" AS "StudentID",
       ARRAY_AGG(b."title") AS "BookItem(s)",
       bo."orderDate" AS "Order Date",
       bo."dueDate" AS "Due Date",
       bo."status" AS "Status"
FROM public."BookOrder" bo
JOIN public."BookItem" bi ON bo."orderID" = bi."orderID"
JOIN public."Book" b on bi."bookID" = b."bookID"
GROUP BY bo."orderID", bo."studentID"