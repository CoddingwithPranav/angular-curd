import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { SearchService } from '../../../shared/services/search.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { HighlightDirectiveDirective } from '../../../shared/directives/highlight.directive.directive';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    TableModule,
    CurrencyFormatPipe,
    HighlightDirectiveDirective,
    ProductSearchComponent,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    TooltipModule,
    RouterLink

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [MessageService, ConfirmationService] 
})
export class ProductListComponent {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.searchService.searchTerms$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          this.productService
            .getProducts()
            .pipe(
              map((products) =>
                products.filter((product) => product?.name.toLowerCase().includes(term.toLowerCase()) || product?.description.toLowerCase().includes(term.toLowerCase()))
              )
            )
        )
      )
      .subscribe((products) => (this.products = products));

  }

  deleteProduct(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter((product) => product.id!== id);
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Record deleted' });
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }
  editProduct(id: number) {
    this.router.navigate(['products',id, 'edit']);
  }
  addnew(){
    this.router.navigate(['products', 'edit']);
  }
}
