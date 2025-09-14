# Job Applications Management System

- **Backend**: ASP.NET Core 8 Web API  
- **Frontend**: React + TypeScript (with Axios for API communication)  

## Features

### Backend (ASP.NET Core 8)
- RESTful API with full **CRUD** (Create, Read, Update, Delete) operations for job applications.
- **Entity Framework Core** with InMemory DB (easily switchable to SQLite/SQL Server).
- **Repository Pattern** and **Dependency Injection** for clean architecture.
- **AutoMapper** for DTO ↔ Entity mapping.
- **Swagger/OpenAPI** for API documentation.
- Centralized **exception handling** 

### Frontend (React + TypeScript)
- Table view of job applications (Company, Position, Status, Date Applied).
- Pagination support.
- Form to **Add** new applications.
- **Edit** existing applications.
- Dropdown to change application status.
- **Axios** for API communication.
- **Client-side validation** and error handling.

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js (LTS)](https://nodejs.org/) + npm
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (for backend) or VS Code (for frontend)

---

## Running the Backend

1. Open the solution in **Visual Studio 2022** or navigate to the folder:

   ```bash
   cd DatacomApplicationAPI
   ```

2. Restore dependencies:

   ```bash
   dotnet restore
   ```

3. Run the application:

   ```bash
   dotnet run
   ```

4. The API will be available at:

   ```
   https://localhost:7063/swagger
   ```

---

## Running the Frontend

1. Navigate to the UI project:

   ```bash
   cd job-applications-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## Key Architectural Decisions

- **Repository Pattern**: Keeps data access logic separate from controllers, making the code testable and maintainable.
- **DTOs + AutoMapper**: Ensures API responses don’t directly expose entity models and simplifies mapping.
- **Exception Middleware**: Centralized error handling with consistent JSON responses and logging.
- **Swagger**: Built-in API documentation for quick testing and onboarding.
- **Frontend Separation**: The React app is decoupled from the backend, communicates only via REST API with Axios.
- **Validation**: 
  - **Backend** → Data annotations and validation middleware.
  - **Frontend** → Client-side validation before making API calls.

---

## Running Tests

Backend (xUnit):

```bash
dotnet test
```
---

## Assumptions

- Using **InMemory DB** for simplicity. Can be swapped to SQLite/SQL Server by updating `DbContext`.
- Pagination is handled on the **frontend** with support from API (page + pageSize).
- Error handling shows **user-friendly messages** on the frontend.
---

## Next Steps (Improvements)
- Implement JWT authentication with refresh tokens / API Key
- Persist DB with DB Server.
- Frontend testing (React Testing Library / Jest)
- Add sorting and search features in the frontend table.
- CI/CD setup with GitHub Actions + Docker.
