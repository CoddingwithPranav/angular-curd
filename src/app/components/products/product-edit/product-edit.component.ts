import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
  providers: [MessageService]
})
export class ProductEditComponent {
  productForm!: FormGroup;
  messageService = inject(MessageService);
  product!: Product;
  id!: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.productService.getProduct(this.id).subscribe((product) => {
          this.product = product;
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      price: [this.product?.price || '', Validators.required],
    });
  }
  get fs() {
    return this.productForm.controls;
  }
  onSubmit(): void {
    if (this.productForm.invalid == true) {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'})
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.productForm.valid) {
      if (this.product) {
        const updatedProduct = { ...this.product, ...this.productForm.value };
        this.productService
          .updateProduct(updatedProduct, this.id)
          .subscribe(() => {
            this.router.navigate(['/products']);
            this
          });
      } else {
        this.productService
          .addProduct(this.productForm.value)
          .subscribe(() => this.router.navigate(['/products']));
      }
    }
  }
}
