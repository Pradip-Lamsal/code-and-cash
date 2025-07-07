# Sample Backend API Implementation Guide

This document provides examples of how to implement the backend API endpoints for the Explore Tasks feature.

## Express.js + MongoDB Example

### Task Schema (MongoDB/Mongoose)

```javascript
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  category: {
    type: String,
    enum: ["frontend", "backend", "fullstack", "mobile", "design", "devops"],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  payout: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true, min: 1 }, // in days
  status: {
    type: String,
    enum: ["open", "in_progress", "completed", "cancelled"],
    default: "open",
  },
  requirements: [String],
  skills: [String],
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deadline: Date,
  featured: { type: Boolean, default: false },
});
```

### API Endpoints Implementation

#### 1. GET /api/tasks

```javascript
const getTasks = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      search,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = { status: "open" }; // Only show open tasks

    if (category && category !== "all") {
      filter.category = category;
    }

    if (difficulty && difficulty !== "all") {
      filter.difficulty = difficulty;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (maxPrice) {
      filter.payout = { $lte: parseInt(maxPrice) };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("clientId", "name email avatar")
      .lean();

    // Get total count for pagination
    const totalCount = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: {
        tasks: tasks.map((task) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          company: task.company,
          category: task.category,
          difficulty: task.difficulty,
          payout: task.payout,
          duration: task.duration,
          status: task.status,
          skills: task.skills,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          client: task.clientId,
          applicantCount: task.applicants.length,
          featured: task.featured,
        })),
        totalCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        hasNext: skip + parseInt(limit) < totalCount,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to fetch tasks",
    });
  }
};
```

#### 2. GET /api/tasks/categories

```javascript
const getTaskCategories = async (req, res) => {
  try {
    // You can either hardcode these or fetch from database
    const categories = [
      {
        id: "frontend",
        label: "Frontend Development",
        icon: "🎨",
        description: "UI/UX, React, Vue, Angular, etc.",
        count: await Task.countDocuments({
          category: "frontend",
          status: "open",
        }),
      },
      {
        id: "backend",
        label: "Backend Development",
        icon: "⚙️",
        description: "APIs, databases, server-side logic",
        count: await Task.countDocuments({
          category: "backend",
          status: "open",
        }),
      },
      {
        id: "fullstack",
        label: "Full Stack Development",
        icon: "🔄",
        description: "End-to-end application development",
        count: await Task.countDocuments({
          category: "fullstack",
          status: "open",
        }),
      },
      {
        id: "mobile",
        label: "Mobile Development",
        icon: "📱",
        description: "iOS, Android, React Native, Flutter",
        count: await Task.countDocuments({
          category: "mobile",
          status: "open",
        }),
      },
      {
        id: "design",
        label: "Design",
        icon: "🎨",
        description: "UI/UX design, graphics, branding",
        count: await Task.countDocuments({
          category: "design",
          status: "open",
        }),
      },
      {
        id: "devops",
        label: "DevOps",
        icon: "🚀",
        description: "CI/CD, cloud infrastructure, deployment",
        count: await Task.countDocuments({
          category: "devops",
          status: "open",
        }),
      },
    ];

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to fetch categories",
    });
  }
};
```

#### 3. GET /api/tasks/difficulties

```javascript
const getTaskDifficulties = async (req, res) => {
  try {
    const difficulties = [
      {
        id: "easy",
        label: "Easy",
        color: "text-green-500",
        description: "Beginner-friendly tasks",
        minPayout: 50,
        maxPayout: 200,
        count: await Task.countDocuments({
          difficulty: "easy",
          status: "open",
        }),
      },
      {
        id: "medium",
        label: "Medium",
        color: "text-yellow-500",
        description: "Intermediate level tasks",
        minPayout: 200,
        maxPayout: 500,
        count: await Task.countDocuments({
          difficulty: "medium",
          status: "open",
        }),
      },
      {
        id: "hard",
        label: "Hard",
        color: "text-red-500",
        description: "Advanced and complex tasks",
        minPayout: 500,
        maxPayout: 2000,
        count: await Task.countDocuments({
          difficulty: "hard",
          status: "open",
        }),
      },
    ];

    res.json({
      success: true,
      data: difficulties,
    });
  } catch (error) {
    console.error("Error fetching difficulties:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "Failed to fetch difficulties",
    });
  }
};
```

### Express.js Routes Setup

```javascript
const express = require("express");
const router = express.Router();

// Import controllers
const {
  getTasks,
  getTaskCategories,
  getTaskDifficulties,
} = require("../controllers/taskController");

// Routes
router.get("/tasks", getTasks);
router.get("/tasks/categories", getTaskCategories);
router.get("/tasks/difficulties", getTaskDifficulties);

module.exports = router;
```

### CORS Configuration

```javascript
const cors = require("cors");

// Allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
```

### Error Handling Middleware

```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

app.use(errorHandler);
```

## Testing Your API

### Using curl

```bash
# Test get tasks
curl -X GET "http://localhost:5001/api/tasks?category=frontend&difficulty=easy&search=react&maxPrice=500"

# Test get categories
curl -X GET "http://localhost:5001/api/tasks/categories"

# Test get difficulties
curl -X GET "http://localhost:5001/api/tasks/difficulties"
```

### Using Postman

1. Create a new collection for "Code and Cash API"
2. Add requests for each endpoint
3. Test with various query parameters
4. Verify response format matches expected structure

## Database Seeding

### Sample Data

```javascript
const sampleTasks = [
  {
    title: "Build a React Component Library",
    description:
      "Create a comprehensive React component library with documentation and testing",
    company: "TechCorp",
    category: "frontend",
    difficulty: "medium",
    payout: 250,
    duration: 5,
    skills: ["React", "TypeScript", "Storybook", "Testing"],
    requirements: [
      "3+ years React experience",
      "TypeScript knowledge",
      "Testing experience",
    ],
  },
  {
    title: "API Integration for Payment Gateway",
    description:
      "Integrate Stripe payment gateway with existing Node.js backend",
    company: "DataSys",
    category: "backend",
    difficulty: "hard",
    payout: 300,
    duration: 7,
    skills: ["Node.js", "Express", "Stripe API", "MongoDB"],
    requirements: [
      "Payment gateway experience",
      "Node.js expertise",
      "Security knowledge",
    ],
  },
  // Add more sample tasks...
];

// Seed script
const seedTasks = async () => {
  try {
    await Task.deleteMany({});
    await Task.insertMany(sampleTasks);
    console.log("Tasks seeded successfully");
  } catch (error) {
    console.error("Error seeding tasks:", error);
  }
};
```

## Security Considerations

### Input Validation

```javascript
const { body, query, validationResult } = require("express-validator");

const validateGetTasks = [
  query("category")
    .optional()
    .isIn(["frontend", "backend", "fullstack", "mobile", "design", "devops"]),
  query("difficulty").optional().isIn(["easy", "medium", "hard"]),
  query("search").optional().isLength({ min: 1, max: 100 }),
  query("maxPrice").optional().isNumeric({ min: 0 }),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];
```

### Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

This should give you a comprehensive starting point for implementing the backend API that works with your updated frontend!
