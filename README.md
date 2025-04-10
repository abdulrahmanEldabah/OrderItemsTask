# 🛒 Order Form - Angular + ASP.NET Core Web API

This project is a full-stack application that allows users to create an order by selecting multiple items with quantity using a dynamic form built with Angular. The data is sent to a backend API built with ASP.NET Core Web API for validation and processing.

---

## ✅ Features

### Frontend (Angular)
- Built using Reactive Forms (`FormArray`)
- Dynamic list of order items with:
  - **Item dropdown** (select an item)
  - **Quantity input** (must be a positive number)
- Validation:
  - Required fields
  - Quantity must be greater than 0
- Add and remove items dynamically
- Submit button sends the order to the backend API

### Backend (ASP.NET Core Web API)
- Receives list of items as DTOs
- Validates:
  - Order is not empty
  - Each item has a valid `ItemId` and positive `Quantity`
- Returns success or error response

---

## 🛠️ Technologies Used

- **Frontend**: Angular 15+, TypeScript, Reactive Forms
- **Backend**: ASP.NET Core Web API (.NET 6 or 7)
- **Communication**: HTTP (JSON)
- **CORS**: Enabled for frontend-backend communication

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js + Angular CLI
- .NET SDK (6 or 7)

---

## 🔧 Setup Instructions

### 1. Backend Setup

```bash
# Create and run ASP.NET Core Web API
dotnet new webapi -n OrderApi
cd OrderApi
dotnet run
