# API Usage Guide

## Description

This repository provides a set of RESTful APIs for user management. The APIs allow you to perform basic CRUD operations on user data, including creating a new user, retrieving all users, retrieving a specific user, updating a user, and deleting a user.

## Installation

To run this project locally, follow these steps:

1. Clone the Git repository:

    ```bash
     git clone https://github.com/your-username/your-repository.git

    ```

2. Installation
    ```bash
    cd your-repository
    docker-compose up
    ```

## API Table

| API Path                 | Params                                                           | Expected Response                                     |
| ------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------- |
| `POST /api/users`        | JSON payload: `{ "firstName", "lastName", "password", "email" }` | Successful creation of a new user.                    |
| `GET /api/users`         | None                                                             | List of all users.                                    |
| `GET /api/users/{id}`    | None                                                             | Details of a specific user identified by `{id}`.      |
| `PUT /api/users/{id}`    | JSON payload: `{ "user", "email" }`                              | Successful update of the user identified by `{id}`.   |
| `DELETE /api/users/{id}` | None                                                             | Successful deletion of the user identified by `{id}`. |

## Usage

```
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"firstName": "John", "lastName": "Doe", "password": "securepassword", "email": "john.doe@example.com"}'

```
