INSERT INTO "User" ("firstName", "lastName", "username", "password", "email", "role")
VALUES ($1, $2, $3, $4, $5, $6::"Role")
RETURNING "userID", "firstName", "lastName", "username", "email", "role";