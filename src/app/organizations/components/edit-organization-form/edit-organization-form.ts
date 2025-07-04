import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Organization } from '../../model/organization-entity';
import { UpdateOrganizationResource } from '../../resources/update-organization-resource';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-organization-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './edit-organization-form.html',
  styleUrl: './edit-organization-form.css'
})
export class EditOrganizationForm implements OnInit {
  @Input() organization!: Organization;
  @Output() update = new EventEmitter<UpdateOrganizationResource>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      legalName: [
        this.organization.legalName,
        { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }
      ],
      commercialName: [
        this.organization.commercialName,
        { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }
      ]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { legalName, commercialName } = this.form.value;

    const updatePayload: UpdateOrganizationResource = {};
    if (legalName && legalName.trim()) {
      updatePayload.legalName = legalName.trim();
    }
    if (commercialName && commercialName.trim()) {
      updatePayload.commercialName = commercialName.trim();
    }

    if (Object.keys(updatePayload).length > 0) {
      this.update.emit(updatePayload);
    }
  }

}
