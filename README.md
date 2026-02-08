# Author Royalty API

## Overview

This project is a REST API that manages authors, book sales, royalty
earnings, and withdrawal requests. The API calculates earnings
dynamically from book sales and allows authors to request withdrawals.

------------------------------------------------------------------------

## Tech Stack

### Backend

-   Node.js
-   Express.js

### Database

-   SQLite

### Why This Stack?

Node.js and Express allow fast REST API development. SQLite was chosen
because it is lightweight and meets assignment requirements without
external database setup.

------------------------------------------------------------------------

## Setup Instructions

### Clone Repository

git clone <repo-link>
cd author-royalty-api

### Install Dependencies

npm install

### Run Server

npm start

Server runs at:

    http://localhost:3000


------------------------------------------------------------------------

## API Endpoints

### GET /authors

Returns all authors with earnings and current balance.

------------------------------------------------------------------------

### GET /authors/:id

Returns detailed author information with books.

------------------------------------------------------------------------

### GET /authors/:id/sales

Returns all sales sorted by newest date.

------------------------------------------------------------------------

### POST /withdrawals

Creates withdrawal request.

#### Request Example

# -- json
{
  "author_id": 1,
  "amount": 500
}

#### Validation Rules

-   Minimum withdrawal ₹500
-   Cannot exceed current balance
-   Author must exist

------------------------------------------------------------------------

### GET /authors/:id/withdrawals

Returns withdrawal history sorted by newest first.

------------------------------------------------------------------------

## Time Spent

Approximately 5--6 hours including setup, development, testing, and
deployment.


## END
