import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../shared/services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  public form: FormGroup;

  public submitted: boolean = false;

  constructor(
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    })
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date(),
    }

    this.productServ.create(product)
      .subscribe((res) => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['/']);
      })
  }
}
