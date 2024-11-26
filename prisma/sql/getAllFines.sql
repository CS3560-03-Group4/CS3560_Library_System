SELECT F."fineID", F."orderID", P."studentID", F."amount", F."status", P."paymentDate"
FROM "Fine" AS F
LEFT JOIN "Payment" AS P ON F."fineID" = P."fineID"
LEFT JOIN "Student" AS S ON P."studentID" = S."studentID";