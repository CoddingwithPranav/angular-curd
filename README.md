# Simple CRUD Application with Angular

## Table of Contents

- [Introduction](#introduction)
- [Project Setup and Tools](#project-setup-and-tools)
- [Implemented Features](#implemented-features)
- [Instructions to Run the Project](#instructions-to-run-the-project)
- [API Endpoints](#api-endpoints)
- [Key Features](#key-features)
- [Conclusion](#conclusion)

## Introduction

This project is a simple CRUD application built with Angular, leveraging reactive programming, cross-component communication, state management, and custom pipe/directive implementations.

## Project Setup and Tools

### Tools Used

- Angular 18
- TailwindCSS
- PrimeNG
- RxJS
- TypeScript

## Implemented Features

1. **Set Up the Project:**
   - Created a new Angular project using Angular CLI.
   - Set up routing for the application.

2. **Created a Model:**
   - Defined a Product model with the following properties:
     ```typescript
     export interface Product {
       id: number;
       name: string;
       description: string;
       price: number;
     }
     ```

3. **Build Components:**
   - Created the following components:
     - `ProductListComponent`: Displays a list of products.
     - `ProductDetailComponent`: Displays details of a selected product.
     - `ProductEditComponent`: Form to create/edit a product.
     - `ProductSearchComponent`: Handles product search and emits search events.

4. **Implement Services with RxJS:**
   - Created a service `ProductService` to handle CRUD operations using a mock API.
   - Created another service `SearchService` to share data between components.
   - Utilized RxJS Observables and Operators for handling data streams and asynchronous operations.

5. **Routing:**
   - Set up routes for the components:
     ```typescript
     const routes: Routes = [
       { path: 'products', component: ProductListComponent },
       { path: 'products/:id', component: ProductDetailComponent },
       { path: 'products/edit', component: ProductEditComponent },
       { path: 'products/:id/edit', component: ProductEditComponent }
     ];
     ```

6. **Form Handling with Reactive Forms:**
   - Implemented reactive forms for creating and editing products.
   - Included form validation using reactive forms.

7. **Data Binding and Async Operations:**
   - Implemented data binding to display the product list and details.
   - Used RxJS Observables to fetch and display data.
   - Implemented search functionality in the product list using the `ProductSearchComponent` and RxJS operators like `debounceTime` and `distinctUntilChanged`.

8. **Cross-Component Communication:**
   - Implemented cross-component communication using an Event Emitter and Observer pattern with RxJS.
   - Used a shared service to emit search terms from `ProductSearchComponent` and listen to them in `ProductListComponent`.

9. **Create a Custom Pipe:**
   - Implemented a custom pipe called `CurrencyFormatPipe` to format the product price with a currency symbol.

10. **Create a Custom Directive:**
    - Implemented a custom directive called `HighlightDirective` to highlight a product when the mouse hovers over it.

11. **Error Handling:**
    - Displayed appropriate error messages in the UI.

12. **Styling:**
    - Added basic styling using TailwindCSS to make the UI user-friendly.

## Instructions to Run the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/CoddingwithPranav/angular-curd.git
   cd angular-curd
2. **Install Dependencies::**
   ```bash
   npm install

3. **Run the Application:**
   ```bash
   ng serve -open


## Conclusion

This project demonstrates a simple CRUD application with Angular, focusing on reactive programming, cross-component communication, and custom implementations. It serves as a good starting point for building more complex applications with Angular and RxJS.