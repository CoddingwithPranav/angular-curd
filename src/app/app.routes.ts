import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/product.routes').then(
        (a) => a.Product_Routes
      ),
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
