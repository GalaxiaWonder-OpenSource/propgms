import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ValidatorsService } from '../../../shared/services/validator-service';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project-modal.html',
  styleUrls: ['./create-project-modal.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule
  ]
})
export class CreateProjectModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateProjectModal>);
  private validator = inject(ValidatorsService);

  projectForm: FormGroup = this.fb.group({
    projectName: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    contractingEntityEmail: ['', [Validators.required, Validators.email]],
  });

  submitForm() {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.value);
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
