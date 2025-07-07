# Backend Integration Guide

This document explains how the Explore Tasks page has been updated to work with your backend API.

## Changes Made

### 1. API Integration

- **Updated imports**: Added `useExploreTasks` hook for comprehensive task management
- **Real API calls**: Replaced mock data with actual API calls to your backend
- **Dynamic filtering**: Filters are now processed on the backend for better performance

### 2. New API Endpoints Added

```javascript
// Added to src/constants/appConstants.js
TASKS: {
  LIST: "/api/tasks",
  CREATE: "/api/tasks",
  UPDATE: "/api/tasks/:id",
  DELETE: "/api/tasks/:id",
  APPLY: "/api/tasks/:id/apply",
  CATEGORIES: "/api/tasks/categories",      // NEW
  DIFFICULTIES: "/api/tasks/difficulties",  // NEW
}
```

### 3. Enhanced Task Service

```javascript
// Added to src/api/taskService.js
export const getTaskCategories = async () => {
  /* ... */
};
export const getTaskDifficulties = async () => {
  /* ... */
};
export const getTasksWithFilters = async (filters = {}) => {
  /* ... */
};
```

### 4. New Custom Hook

Created `src/hooks/useExploreTasks.js` with:

- Dynamic category and difficulty loading from backend
- Debounced API calls for better performance
- Comprehensive error handling
- Loading states management

## Backend API Requirements

Your backend should implement these endpoints:

### GET /api/tasks

Returns a list of tasks with optional filtering.

**Query Parameters:**

- `category` (string): Filter by category
- `difficulty` (string): Filter by difficulty level
- `search` (string): Search in title, description, or company
- `maxPrice` (number): Maximum payout filter
- `page` (number): Page number for pagination
- `limit` (number): Items per page

**Response Format:**

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "company": "string",
        "category": "string",
        "difficulty": "easy|medium|hard",
        "payout": 0,
        "duration": 0,
        "status": "open|in_progress|completed",
        "createdAt": "ISO string",
        "updatedAt": "ISO string"
      }
    ],
    "totalCount": 0,
    "currentPage": 1,
    "totalPages": 1
  }
}
```

### GET /api/tasks/categories

Returns available task categories.

**Response Format:**

```json
{
  "success": true,
  "data": [
    {
      "id": "frontend",
      "label": "Frontend",
      "icon": "🎨",
      "description": "Frontend development tasks"
    }
  ]
}
```

### GET /api/tasks/difficulties

Returns available difficulty levels.

**Response Format:**

```json
{
  "success": true,
  "data": [
    {
      "id": "easy",
      "label": "Easy",
      "color": "text-green-500",
      "description": "Beginner-friendly tasks"
    }
  ]
}
```

## Environment Configuration

Make sure your `.env` file is configured:

```bash
# Copy .env.example to .env and update the values
cp .env.example .env
```

Update the `VITE_API_URL` to point to your backend:

```bash
VITE_API_URL=http://localhost:5001
```

## Features Implemented

### Frontend Features

- ✅ Real-time search with debouncing
- ✅ Dynamic category and difficulty filters
- ✅ Price range filtering
- ✅ Loading states
- ✅ Error handling with retry functionality
- ✅ Responsive design
- ✅ Animations and smooth transitions

### Backend Integration

- ✅ RESTful API calls
- ✅ Query parameter filtering
- ✅ Error handling
- ✅ Authentication headers (if token exists)
- ✅ Flexible data structure handling

## Testing the Integration

1. **Start your backend server** (should be running on the URL specified in `.env`)

2. **Start the frontend**:

   ```bash
   npm run dev
   ```

3. **Test the features**:
   - Search for tasks
   - Filter by category and difficulty
   - Adjust price range
   - Verify loading states
   - Test error handling (stop backend to see error state)

## Fallback Behavior

If the backend is not available, the component will:

- Show fallback categories and difficulties
- Display appropriate error messages
- Provide retry functionality
- Maintain a smooth user experience

## Data Structure Flexibility

The TaskCard component handles various backend data structures:

- `id` or `_id` for task identification
- `company`, `companyName`, or `client` for company name
- `title` or `name` for task title
- `description` or `summary` for task description
- `payout`, `budget`, or `price` for payment amount
- `duration`, `estimatedDuration`, or `timeline` for duration

## Future Enhancements

Consider implementing:

- Pagination for large datasets
- Advanced sorting options
- Bookmarking/favorites
- Real-time updates via WebSocket
- Task recommendations based on user profile
- Analytics and metrics

## Troubleshooting

### Common Issues

1. **CORS errors**: Configure your backend to allow requests from your frontend domain
2. **Network errors**: Verify backend URL in `.env` file
3. **Authentication errors**: Check if JWT tokens are properly stored and sent
4. **Data format errors**: Ensure backend response format matches expected structure

### Debug Mode

Set `VITE_DEBUG=true` in your `.env` file to see detailed console logs.
