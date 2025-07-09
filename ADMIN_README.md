# Code and Cash Admin Panel Documentation

## Overview

The admin panel provides administrative functionality for the Code and Cash platform, allowing administrators to manage users, tasks, and submissions.

## Access Control

Admin access is secured through two layers:

1. **Client-side validation**: Checks for admin role in user's localStorage
2. **Server-side validation**: Verifies admin status via API endpoint

## Admin Layout Component

Located at `src/layouts/AdminLayout.jsx`, this component:

- Verifies admin status on mount
- Redirects non-admin users to dashboard
- Provides admin navigation sidebar
- Handles responsive design for mobile/desktop

## API Integration

The admin functionality uses the following API endpoints through `src/api/adminService.js`:

### Authentication

- `GET /api/admin/check-access` - Verifies admin privileges

### Dashboard

- `GET /api/admin/stats` - Fetches dashboard statistics

### User Management

- `GET /api/admin/users` - Lists all users with pagination
- `GET /api/admin/users/:id` - Gets user details
- `DELETE /api/admin/users/:id` - Deletes a user
- `PATCH /api/admin/users/:id/status` - Updates user status

### Task Management

- `GET /api/admin/tasks` - Lists all tasks with pagination
- `GET /api/admin/tasks/:id` - Gets task details
- `POST /api/admin/tasks` - Creates a new task
- `PUT /api/admin/tasks/:id` - Updates task details
- `DELETE /api/admin/tasks/:id` - Deletes a task

### Application Management

- `GET /api/admin/task-applications` - Lists all task applications
- `GET /api/admin/applications/:userId/:taskId` - Gets specific application details

### Submission Management

- `GET /api/admin/submissions` - Lists all submissions with filtering
- `GET /api/admin/user-submissions/:userId` - Gets submissions for a specific user
- `GET /api/admin/submissions/:id` - Gets submission details
- `GET /api/admin/submissions/:id/download` - Downloads submission files
- `PATCH /api/admin/submissions/:id/status` - Updates submission status with feedback

## Testing Admin Access

For development and testing:

1. Login with admin credentials (e.g., admin@codeandcash.com)
2. OR use the `/admin-helper` utility to grant admin privileges
3. Check browser console for detailed access debug logs

## Security Notes

- Admin validation occurs on both client and server side
- API calls require valid JWT token with admin privileges
- Failed admin validation redirects to dashboard
