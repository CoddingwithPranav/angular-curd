import { Component } from '@angular/core';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  constructor(private searchService: SearchService) {}

  search(term:any): void {
    this.searchService.search(term.target.value);
  }
}
