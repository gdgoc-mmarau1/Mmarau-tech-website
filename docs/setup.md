# Project Setup Guide

This guide will help you set up the project locally from scratch.

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **MySQL Server** installed and running
- **Git**

## Steps

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone <repository-url> 
cd <repository-directory>
```

> Replace `<repository-url>` with the URL of your repository/fork and `<repository-directory>` with the folder name.

### 2. Install Dependencies

Install all required Node.js packages using npm (or yarn):

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of your project which follows `.env.example`:

```bash
cp .env.example .env
```

change the following environment variables:

```env
# .env

# MySQL database connection string
DATABASE_URL="mysql://user:password@localhost:3306/your_database_name"

# JWT secret used for signing tokens
JWT_SECRET="your_very_secure_jwt_secret"
```

> **Note:** Replace `user`, `password`, `your_database_name`, and `your_very_secure_jwt_secret` with your actual database credentials and a strong, random string for the JWT secret. Do not push `.env` to github

### 4. Set Up Prisma

Prisma is used as the ORM for our database interactions. Follow these steps:

1. **Push the Prisma schema to your database:**

   ```bash
   npx prisma db push
   ```

   This command creates or updates the database schema according to `schema.prisma`.


### 5. Run the Development Server

Start the Next.js development server with:

```bash
npm run dev
```

Your app should now be running at [http://localhost:3000](http://localhost:3000).

