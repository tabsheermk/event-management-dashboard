This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

P.S. There are lots of errors in the frontend and it does not work well. I had other things that needed my attention so I submitted early 
didn't really implement all the features.


# API Documentation

## Events API

## `/api/events`

### `GET`

*   **Description:** Get all events.
*   **Response:**

    *   **200 OK:**

        ```json
        [
          {
            "id": 1,
            "name": "Sample Event 1",
            "description": "This is a sample event.",
            "location": "Virtual",
            "date": "2024-01-15",
            "attendees": []
          },
          {
            "id": 2,
            "name": "Sample Event 2",
            "description": "This is another sample event.",
            "location": "New York",
            "date": "2024-03-20",
            "attendees": []
          }
        ]
        ```

### `POST`

*   **Description:** Create a new event.
*   **Request Body:**

    ```json
    {
      "name": "New Event Name",
      "description": "New Event Description",
      "location": "New Event Location",
      "date": "2024-05-10"
    }
    ```

*   **Response:**

    *   **201 Created:**

        ```json
        {
          "id": 1678886400000,
          "name": "New Event Name",
          "description": "New Event Description",
          "location": "New Event Location",
          "date": "2024-05-10",
          "attendees": []
        }
        ```

    *   **400 Bad Request:** If the request body is invalid or missing required fields.

    *   **500 Internal Server Error:** If there is an error on the server.



## `/api/events/[id]`

### `GET`

*   **Description:** Get details for a specific event.
*   **Path Parameters:**
    *   `id` (number): The ID of the event to retrieve.
*   **Response:**

    *   **200 OK:**

        ```json
        {
          "id": 1,
          "name": "Sample Event 1",
          "description": "This is a sample event.",
          "location": "Virtual",
          "date": "2024-01-15",
          "attendees": []
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "message": "Event Not Found"
        }
        ```

### `PUT`

*   **Description:** Update the details of a specific event.
*   **Path Parameters:**
    *   `id` (number): The ID of the event to update.
*   **Request Body:**

    ```json
    {
      "name": "Updated Event Name",
      "description": "Updated Event Description",
      "location": "Updated Event Location",
      "date": "2024-12-25",
      "attendees": []
    }
    ```

*   **Response:**

    *   **200 OK:**

        ```json
        {
          "id": 1,
          "name": "Updated Event Name",
          "description": "Updated Event Description",
          "location": "Updated Event Location",
          "date": "2024-12-25",
          "attendees": []
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "message": "Event Not Found"
        }
        ```

### `DELETE`

*   **Description:** Delete an event.
*   **Path Parameters:**
    *   `id` (number): The ID of the event to delete.
*   **Response:**

    *   **200 OK:**

        ```json
        {
          "message": "Event deleted successfully"
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "message": "Event Not Found"
        }
        ```

## Attendees

## `/api/attendees`

### `GET`

*   **Description:** Get all attendees across all events.
*   **Response:**

    *   **200 OK:**

        ```json
        [
          {
            "id": 1,
            "name": "John Doe"
          },
          {
            "id": 2,
            "name": "Jane Smith"
          }
        ]
        ```

### `POST`

*   **Description:** Add a new attendee.
*   **Request Body:**

    ```json
    {
      "name": "New Attendee Name"
    }
    ```

*   **Response:**

    *   **201 Created:**

        ```json
        {
          "id": 1678886400000,
          "name": "New Attendee Name"
        }
        ```

    *   **400 Bad Request:** If the request body is invalid or missing required fields.

    *   **500 Internal Server Error:** If there is an error on the server.

## `/api/attendees/[id]`

### `DELETE`

*   **Description:** Delete an attendee.
*   **Path Parameters:**
    *   `id` (number): The ID of the attendee to delete.
*   **Response:**

    *   **200 OK:**

        ```json
        {
          "message": "Attendee deleted successfully"
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "message": "Attendee Not Found"
        }
        ```
## Tasks

## `/api/tasks`

### `GET`

*   **Description:** Get all tasks associated with an event.
*   **Query Parameters:**
    *   `eventId` (number, required): The ID of the event to get tasks for.
*   **Response:**

    *   **200 OK:**

        ```json
        [
          {
            "id": 1,
            "eventId": 1,
            "name": "Prepare presentation slides",
            "deadline": "2024-01-12",
            "status": "Pending",
            "attendeeId": 1
          },
          {
            "id": 2,
            "eventId": 1,
            "name": "Send meeting invites",
            "deadline": "2024-01-15",
            "status": "Completed",
            "attendeeId": 2
          }
        ]
        ```

    *   **400 Bad Request:**

        ```json
        {
          "error": "Event ID missing"
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "error": "Event Not Found"
        }
        ```

### `POST`

*   **Description:** Create a task associated with an event.
*   **Request Body:**

    ```json
    {
      "eventId": 1,
      "name": "New Task Name",
      "deadline": "2024-06-15",
      "attendeeId": 3
    }
    ```

*   **Response:**

    *   **201 Created:**

        ```json
        {
          "id": 1678886400000,
          "eventId": 1,
          "name": "New Task Name",
          "deadline": "2024-06-15",
          "status": "Pending",
          "attendeeId": 3
        }
        ```

    *   **400 Bad Request:** If the request body is invalid or missing required fields.
    *   **404 Not Found:**
        ```json
        {
            "error": "Event Not Found"
        }
        ```

    *   **500 Internal Server Error:** If there is an error on the server.

## `/api/tasks/[id]`

### `PUT`

*   **Description:** Update a task's status.
*   **Path Parameters:**
    *   `id` (number): The ID of the task to update.
*   **Request Body:**

    ```json
    {
      "status": "Completed"
    }
    ```

*   **Response:**

    *   **200 OK:**

        ```json
        {
          "id": 1,
          "eventId": 1,
          "name": "Prepare presentation slides",
          "deadline": "2024-01-12",
          "status": "Completed", // Updated status
          "attendeeId": 1
        }
        ```

    *   **400 Bad Request:**

        ```json
        {
          "error": "Invalid status value"
        }
        ```

    *   **404 Not Found:**

        ```json
        {
          "error": "Task not found"
        }
        ```
