import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ValidatorsService } from '../../../shared/services/validator-service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization-modal.html',
  styleUrls: ['./create-organization-modal.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class CreateOrganizationModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateOrganizationModal>);
  private validator = inject(ValidatorsService);

  orgForm: FormGroup = this.fb.group({
    legalName: ['', [Validators.required, Validators.minLength(2)]],
    commercialName: ['', [Validators.required, Validators.minLength(2)]],
    ruc: ['', [Validators.required, this.validator.rucFormat()]],
  });

  submitForm() {
    if (this.orgForm.valid) {
      const createdBy = Number(localStorage.getItem('personId'));

      const organization = {
        legalName: this.orgForm.value.legalName,
        commercialName: this.orgForm.value.commercialName,
        ruc: this.orgForm.value.ruc,
        createdBy,
      };

      this.dialogRef.close(organization);
    } else {
      this.orgForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
