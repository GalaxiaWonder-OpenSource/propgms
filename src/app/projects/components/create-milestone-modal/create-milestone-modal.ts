import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateMilestoneResource } from '../../resources/create-milestone-resource';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-create-milestone-modal',
  templateUrl: './create-milestone-modal.html',
  styleUrls: ['./create-milestone-modal.css'],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    TranslatePipe,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ]
})
export class CreateMilestoneModal {
  milestoneForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMilestoneModal>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  ) {
    this.milestoneForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required]
    });
  }

  submit(): void {
    if (this.milestoneForm.valid) {
      const value: CreateMilestoneResource = {
        ...this.milestoneForm.value,
        projectId: this.data.projectId
      };
      this.dialogRef.close(value);
    }
  }


  cancel(): void {
    this.dialogRef.close();
  }
}
