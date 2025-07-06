import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTaskResource } from '../../resources/create-task-resource';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { Specialty } from '../../../public/model/specialty';
import {MatSelectModule} from '@angular/material/select';
import {Milestone} from '../../model/milestone-entity';


@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.html',
  styleUrls: ['./create-task-modal.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatOptionModule,
    MatSelectModule
  ]
})
export class CreateTaskModal {
  taskForm: FormGroup;
  specialtyValues = Object.values(Specialty);

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModal>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { milestones: Milestone[] }
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      specialty: ['', Validators.required],
      milestoneId: [null, Validators.required]
    });
  }

  submit(): void {
    if (this.taskForm.valid) {
      const value: CreateTaskResource = {
        ...this.taskForm.value,
        status: 'DRAFT',
        personId: null
      };
      this.dialogRef.close(value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
