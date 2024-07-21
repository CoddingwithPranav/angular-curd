import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, NgClass, RouterLink],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
  providers: [MessageService]
})
export class ProductEditComponent {
  public  productForm!: FormGroup;
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private product!: Product;
  public id!: string;
 

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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Complete Form' });
  
      this.productForm.markAllAsTouched();
      return;
    }
    if (this.productForm.valid) {
      if (this.product) {
        const updatedProduct = { ...this.product, ...this.productForm.value };
        this.productService
          .updateProduct(updatedProduct, this.id)
          .subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Updated' });
            this.router.navigate(['/products']);
          });
      } else {
        this.productService
          .addProduct(this.productForm.value)
          .subscribe(() => {

            this.messageService.add({ severity:'success', summary: 'Success', detail: 'Successfully Added' });
            this.router.navigate(['/products'])
          });
      }
    }
  }
}
