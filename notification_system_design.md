# Campus Notifications Microservice System Design

## Overview

This project implements a Campus Notifications Microservice system that fetches notifications from the provided API, prioritizes them based on notification type and recency, and displays them in a React frontend application.

The project is divided into two stages:

1. Stage 1 — Backend priority notification processing
2. Stage 2 — Frontend notification dashboard

Logging middleware is integrated throughout the application from the very first function.

---

# Architecture

## Components

### 1. Logging Middleware
Responsible for:
- Sending logs to the evaluation logging API
- Tracking API calls
- Tracking state updates
- Tracking errors and application events

### 2. Backend Service
Responsible for:
- Fetching notifications from API
- Assigning notification priority weights
- Sorting notifications
- Selecting top N notifications

### 3. Frontend Application
Responsible for:
- Displaying notifications
- Filtering notifications
- Pagination
- Viewed/unviewed state handling
- Responsive UI

---

# Stage 1 — Priority Notification Processing

## Notification Priority Rules

| Notification Type | Weight |
|-------------------|---------|
| Placement         | 3       |
| Result            | 2       |
| Event             | 1       |

Higher weight notifications are prioritized first.

If two notifications have equal weight, the newer notification is prioritized based on timestamp.

---

# Stage 1 Workflow

1. Fetch notifications from API
2. Assign weights
3. Sort notifications
4. Select top 10 notifications
5. Display notifications

---

# Sorting Logic

Notifications are sorted using:

1. Descending priority weight
2. Descending timestamp

Example:
- Placement notifications appear before Result notifications
- Newer notifications appear before older notifications

---

# Logging Middleware Integration

The reusable logging function:

```javascript
Log(stack, level, packageName, message)