
# Authentication API Documentation

## Table of Contents

- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
  - [Sign Up](#sign-up)
  - [Login](#login)
  - [Password Reset](#password-reset)
    - [Request Password Reset](#request-password-reset)
    - [Reset Password](#reset-password)
- [Example cURL Requests](#example-curl-requests)
- [Additional Notes](#additional-notes)

## Overview

Our authentication system uses JSON Web Tokens (JWT) for managing user sessions. Passwords are securely hashed using bcrypt, and user data is stored in a MySQL database managed by Prisma. The API includes endpoints for:

- Creating new user accounts
- Logging in (and generating a JWT)
- Resetting a user’s password via a two-step process (requesting a reset token and then resetting the password)

## Environment Variables

Make sure to set the following environment variables in your **.env** file:

- `DATABASE_URL`: The connection string for your MySQL database.
- `JWT_SECRET`: A secret key used to sign and verify JWT tokens (e.g., a long random string).

> [!NOTE]
> This is the .env as of current, we might add more
> check out [.env-example](../.env-example)



## Endpoints

### Sign Up

**URL:** `/api/auth/register`  
**Method:** `POST`

**Description:**  
Creates a new user account. The endpoint expects the following fields in the JSON payload:

- `email` (string): The user's email address (must be unique).
- `username` (string): The user's chosen username (must be unique).
- `password` (string): The plaintext password, which will be hashed before storing.

**Success Response:**

- **Status:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User created. Please check your email for verification."
  }
  ```

**Error Responses:**

- `400 Bad Request`: Missing required fields.
- `409 Conflict`: A user with the provided email or username already exists.
- `500 Internal Server Error`: An error occurred during processing.

### Login

**URL:** `/api/auth/login`  
**Method:** `POST`

**Description:**  
Authenticates a user by verifying the provided credentials. You may log in using either an email or username along with the password.

**Payload:**
- `email` (optional, string): The user's email.
- `username` (optional, string): The user's username.
- `password` (string): The plaintext password.

At least one identifier (email or username) and a password are required.

**Success Response:**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN_HERE",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "myusername",
      "isVerified": false
    }
  }
  ```

**Error Responses:**

- `400 Bad Request`: Missing required fields.
- `404 Not Found`: User not found.
- `401 Unauthorized`: Invalid credentials.
- `500 Internal Server Error`: An error occurred during processing.

### Password Reset

The password reset feature is implemented in two steps:

#### Request Password Reset

**URL:** `/api/auth/reset-password/request-reset`  
**Method:** `POST`

**Description:**  
Initiates a password reset by accepting the user's email. If the email exists, a reset token and expiration time are generated and stored. (An email with the reset link should be sent in production.)

**Payload:**
- `email` (string): The user's email address.

**Success Response (Always Generic):**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "If the email exists, a reset link will be sent"
  }
  ```

#### Reset Password

**URL:** `/api/auth/reset-password/reset-password`  
**Method:** `POST`

**Description:**  
Completes the password reset process. The endpoint expects a valid reset token and a new password. It verifies that the token exists and is not expired before updating the user's password.

**Payload:**
- `token` (string): The reset token received via email.
- `newPassword` (string): The new password (must be at least 8 characters long).

**Success Response:**

- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Password reset successfully"
  }
  ```

**Error Responses:**

- `400 Bad Request`: Missing required fields or invalid/expired token.
- `500 Internal Server Error`: An error occurred during processing.

## Example cURL Requests

### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "MySecretPassword",
    "username": "myusername"
}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "MySecretPassword"
}'
```

### Request Password Reset

```bash
curl -X POST http://localhost:3000/api/auth/reset-password/request-reset \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
}'
```

### Reset Password

```bash
curl -X POST http://localhost:3000/api/auth/reset-password/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "RESET_TOKEN_RECEIVED_VIA_EMAIL",
    "newPassword": "NewSecurePassword"
}'
```
