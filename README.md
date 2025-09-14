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
- Security & Authentication

   - Implement JWT authentication with refresh tokens to secure API access and enable session renewal without re-login.

   - Add API key support for service-to-service communication.

- Data & Persistence

   - Replace the in-memory DB with a persistent relational database (SQL Server / PostgreSQL) for real-world storage.

   - Introduce EF Core migrations for schema versioning and smooth deployments.

   - Seed sample data via migrations instead of code for reproducibility.

- Frontend Enhancements

   - Add sorting and search to the applications table for better UX.

   - Improve form validation UX with inline messages and status indicators.

   - Implement frontend testing (React Testing Library / Jest) to ensure UI reliability.

- Testing & Quality

   = Add integration tests for API endpoints (with WebApplicationFactory) to complement existing unit tests.

   - Add end-to-end tests (Playwright / Cypress) covering the full stack.

- DevOps & Deployment

   - Set up CI/CD with GitHub Actions for automated build, test, and deployment.

   - Add Docker & Docker Compose for consistent local and cloud deployment.

   - Prepare Kubernetes manifests / Helm charts for scalability in production.

- Monitoring & Observability

   - Integrate logging and metrics (Serilog, Application Insights, Grafana) for production health monitoring.

   - Add alerts and dashboards for error rates, API response times, and DB performance
