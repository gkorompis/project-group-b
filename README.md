# Group Final Project
## Problem Statement:
Develop a digital solution that address a specific challenge within 1 of 17 UN Sustainable Development Goals (SDGs).
## Goals:
To create a user-friendly applicaion that provide a meaningful solution without introducing unnecessary complexities for end-user.

## Deliverables:
- Project Themes: Industry, Innovation, and Infrastructure.
- Purpose of the Project: UMKM One Click Solution
- Description: One-click solution for simultaneous distribution to UMKM stores.
- Application Name: handpos

## Installation

- Clone the Repository:
1. git clone `github url https code`
2. open the clone folder

- Install the depedencies:
1. backend: `yarn install`
2. frontend: ``

- Setting up the environment variable `.env`
 
## Features
- NoSQL Database (MongoDB)
- Passport Auth
- Joi Validation
- Swagger API Documentation
- Yarn Depedencies
- Dotenv and cross-env Environment
- Helmet HTTP Headers
- CORS

## Run Locally
- Backend:
  ```bash
     yarn dev
  ```
- Frontend:
  ```bash

  ```

## API Reference
### AUTH PAGE
#### REGISTRATION API
```http
  POST /v1/auth/register
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullname` | `string` | **Required**|
| `username` | `string` | **Required** |
| `email` | `string` | **Required**|
| `password` | `string` | **Required**|

#### LOGIN API (Bearer Token **Required**)
```http
  POST /v1/auth/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**|
| `password` | `string` | **Required**|

### USER PAGE
#### Create New User
```http
  POST /v1/users
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullname` | `string` | **Required**|
| `username` | `string` | **Required** |
| `email` | `string` | **Required**|
| `password` | `string` | **Required**|
| `role` | `string` | **Required** (admin or user)|

#### GET USER DATA
```http
  GET /v1/users
```
#### GET USER DATA BY ID USER
```http
  GET /v1/users/:userId
```
#### UPDATE USER DATA BY USING ID USER
```http
  PATCH /v1/users/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullname` | `string` | **Required**|
| `username` | `string` | **Required** |
| `email` | `string` | **Required**|
| `password` | `string` | **Required**|

#### DELETE USER DATA BY USING ID USER
```http
  DELETE /v1/users/:userId
```

### STORE PAGE
#### CREATE A NEW STORE
```http
  POST /v1/stores
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_store` | `string` | **Required**|
| `store_name` | `string` | **Required** |
| `store_category` | `string` | **Required**|
| `id_user` | `string` | **Required**|

#### GET DATA STORE
```http
  GET /v1/stores
```
#### GET USER DATA BY ID STORE
```http
  GET /v1/stores/:storeId
```

#### UPDATE DATA STORE BY USING ID STORE
```http
  PATCH /v1/stores/:storeId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `store_name` | `string` | **Required** |
| `store_category` | `string` | **Required**|
| `id_user` | `string` | **Required**|

#### DELETE DATA STORE BY USING ID STORE
```http
  DELETE /v1/stores/:storeId
```

### MARKET PAGE
#### CREATE A NEW MARKET
```http
  POST /v1/markets
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**|

#### GET DATA MARKET
```http
  GET /v1/markets
```
#### GET MARKET DATA BY USING ID MARKET
```http
  GET /v1/markets/:marketId
```

#### UPDATE MARKET DATA BY USING ID MARKET
```http
  PATCH /v1/markets/:marketId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**|

#### DELETE MARKET DATA BY USING ID MARKET
```http
  DELETE /v1/markets/:marketId
```

### PRODUCT PAGE
#### CREATE A NEW PRODUCT
```http
  POST /v1/products
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idStore` | `string` | **Required**|
| `title` | `string` | **Required** |
| `price` | `number` | **Required**|
| `stock` | `number` | **Required**|
| `description` | `string` | **Required**|
| `image` | `string` | **Required**|

#### GET DATA STORE
```http
  GET /v1/stores
```
#### GET STORE DATA BY ID STORE
```http
  GET /v1/stores/:storeId
```

#### UPDATE DATA STORE BY USING ID STORE
```http
  PATCH /v1/stores/:storeId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idStore` | `string` | **Required**|
| `title` | `string` | **Required** |
| `price` | `number` | **Required**|
| `stock` | `number` | **Required**|
| `description` | `string` | **Required**|
| `image` | `string` | **Required**|

#### DELETE DATA STORE BY USING ID STORE
```http
  DELETE /v1/stores/:storeId
```
### TRANSACTION PAGE
#### CREATE A NEW TRANSACTION
```http
  POST /v1/transactions
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idTransaction` | `string` | **Required**|
| `idUser` | `string` | **Required** |
| `idStore` | `number` | **Required**|
| `idProduct` | `number` | **Required**|
| `category` | `string` | **Required**|
| `title` | `string` | **Required**|
| `price` | `number` | **Required**|
| `qty` | `number` | **Required**|
| `subtotal` | `number` | **Required**|
| `transactionDate` | `date` | **Required**|

#### GET DATA TRANSACTION
```http
  GET /v1/transactions
```
#### GET DATA TRANSACTION BY ID TRANSACTION
```http
  GET /v1/transactions/:transactionId
```

#### UPDATE DATA TRANSACTION BY ID TRANSACTION
```http
  PATCH /v1/transactions/:transactionId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idTransaction` | `string` | **Required**|
| `idUser` | `string` | **Required** |
| `idStore` | `number` | **Required**|
| `idProduct` | `number` | **Required**|
| `category` | `string` | **Required**|
| `title` | `string` | **Required**|
| `price` | `number` | **Required**|
| `qty` | `number` | **Required**|
| `subtotal` | `number` | **Required**|
| `transactionDate` | `date` | **Required**|

#### DELETE DATA TRANSACTION BY ID TRANSACTION
```http
  DELETE /v1/transactions/:transactionId
```

## TABLE RESOURCES

| Resource | Status     | Description                |
| :-------- | :------- | :------------------------- |
| `USER` | `prod` | **None**|
| `STORE` | `prod` | **None**|
| `PRODUCT` | `prod` | **None**|
| `TRANSACTION` | `prod` | **None**|
| `MARKET` | `dev` | ****|

*Resource under `dev` are still in progress of development and not ready for staging or public access*




# handpos project b

### Landing Page
![landing-page](https://github.com/gkorompis/project-group-b/assets/52250424/c2f87169-d9c7-468e-9d8c-3ff382c007e7)

### Dashboard Menu
![dashboard-menu](https://github.com/gkorompis/project-group-b/assets/52250424/34c6374a-0f52-4347-b308-49ef7af649b1)

### Transactions Page (view product as customer user)
<img width="1424" alt="Screen Shot 2023-12-13 at 22 46 58" src="https://github.com/gkorompis/project-group-b/assets/52250424/83d0e707-7202-4760-9860-4d5f5f5c9bb5">

### Mobile View Transactions Page (view product as customer user)
<img width="471" alt="Screen Shot 2023-12-13 at 22 47 22" src="https://github.com/gkorompis/project-group-b/assets/52250424/ca8f7dbc-640f-48f6-bf5c-7096cb9532a2">

### Add To Basket Page
<img width="1383" alt="Screen Shot 2023-12-14 at 15 50 58" src="https://github.com/gkorompis/project-group-b/assets/52250424/b7d93158-f980-4045-86a5-0c88b53e4e61">

<img width="1408" alt="Screen Shot 2023-12-19 at 00 53 41" src="https://github.com/gkorompis/project-group-b/assets/52250424/6f651e77-676a-4c14-868b-24abda71b9d2">

### Accounts Page
<img width="1383" alt="Screen Shot 2023-12-21 at 00 06 57" src="https://github.com/gkorompis/project-group-b/assets/52250424/9ffb6993-3ede-40e4-b1ff-a1e72ca41c81">

### Accounts Edit Form
<img width="1390" alt="Screen Shot 2023-12-21 at 00 07 13" src="https://github.com/gkorompis/project-group-b/assets/52250424/f33ef673-49fc-4ece-877b-3442b09d2a5a">

### Stores Page
<img width="1390" alt="Screen Shot 2023-12-21 at 00 07 27" src="https://github.com/gkorompis/project-group-b/assets/52250424/7a9e4db9-3491-4eef-a826-babb22d096c5">
