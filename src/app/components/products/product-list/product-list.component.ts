import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { SearchService } from '../../../shared/services/search.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableModule, CurrencyFormatPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products!: Product[];

  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  
    this.searchService.searchTerms$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productService.getProducts().pipe(
        map(products => products.filter(product => product.name.includes(term)))
      ))
    ).subscribe(products => this.products = products);
}
}
