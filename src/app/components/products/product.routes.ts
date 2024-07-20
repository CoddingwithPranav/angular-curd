import { Route } from '@angular/router';

export const Product_Routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (a) => a.ProductListComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./product-edit/product-edit.component').then(
        (a) => a.ProductEditComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./product-edit/product-edit.component').then(
        (a) => a.ProductEditComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (a) => a.ProductDetailComponent
      ),
  },
];
