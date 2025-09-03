# Contributing to Call Generator

This document outlines the contribution guidelines for the Call Generator project. All contributors, including AI agents like Jules, are expected to follow these rules to ensure a smooth and efficient development workflow.

## Core Principles

1.  **Single Source of Truth:** The specification documents (`REQUIREMENT.md`, `DESIGN.md`, `task.md`) located in the `main` branch are the single source of truth for this project. All development must align with these documents.
2.  **Issue-Driven Development:** All work must be initiated from a GitHub Issue. Do not start work without a corresponding Issue.
3.  **Human-in-the-Loop:** The final authority for all code reviews and merge decisions rests with the human project manager.

## Workflow for AI Developers (Jules)

When assigned a task via a GitHub Issue number, you MUST follow this procedure precisely:

### 1. Contextual Understanding
- Before writing any code, you MUST first read and fully understand the following documents from the latest `main` branch:
    - `REQUIREMENT.md`
    - `DESIGN.md`
- You must also read the description and acceptance criteria of the assigned GitHub Issue.

### 2. Branching and Implementation
- You MUST create a **new, uniquely named feature branch** for the assigned task, starting from the latest `main` branch. The branch name should be descriptive of the task (e.g., `feat/v3-task-1-1-setup-shadcn`).
- Implement the code changes as specified in the GitHub Issue and the design documents.

### 3. Pull Request Submission
- After you have committed all the changes, you MUST **publish the branch and create a pull request** for review.
- The pull request description should automatically link to the GitHub Issue it resolves.

### 4. Conflict Resolution
- If you encounter a merge conflict that you cannot automatically resolve, clearly state the problem and wait for instructions from the human project manager. Do not force a push or make arbitrary changes.