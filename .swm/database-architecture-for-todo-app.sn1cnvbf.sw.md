---
title: Database Architecture for Todo App
---
## Overview

This document outlines the database architecture for a Todo App that utilizes Google Sign-In for authentication. The design is focused on simplicity, efficiency, and compliance with data privacy regulations.

## Tables Description

### 1\. **Users Table**

- **Purpose**: Stores basic user information obtained through Google Sign-In.

- **Fields**:

  - `GoogleUserID` (string, primary key): Unique ID from Google.

  - `Email` (string): User's email address.

  - `Name` (string): User's full name.

  - `ProfilePictureURL` (string): URL to the user’s profile image.

  - `CreatedAt` (timestamp): Record creation time.

  - `LastLogin` (timestamp): Last login time.

### 2\. **Tasks Table**

- **Purpose**: Manages tasks created by users.

- **Fields**:

  - `TaskID` (UUID, primary key): Unique identifier for the task.

  - `GoogleUserID` (string, foreign key): Links to the Users table.

  - `Title` (string): Task title.

  - `Description` (text): Detailed task description.

  - `DueDate` (date): When the task is due.

  - `Priority` (enum): Priority level (e.g., High, Medium, Low).

  - `CreatedAt` (timestamp): Record creation time.

  - `UpdatedAt` (timestamp): Last update time.

### 3\. **Categories/Tags Table**

- **Purpose**: Organizes tasks into categories or tags for easier retrieval.

- **Fields**:

  - `CategoryID` (UUID, primary key): Unique identifier for each category/tag.

  - `Name` (string): Category or tag name.

### 4\. **TaskCategories Table**

- **Purpose**: Establishes a many-to-many relationship between tasks and categories/tags.

- **Fields**:

  - `TaskID` (UUID, foreign key): Links to the Tasks table.

  - `CategoryID` (UUID, foreign key): Links to the Categories/Tags table.

&nbsp;

![](/.swm/images/Untitled-2024-1-22-16-58-28-496.png)

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBVG9kby1hcHAlM0ElM0FDQUJsYW5r" repo-name="Todo-app"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
