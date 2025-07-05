import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { Project } from '../../model/project-entity';
import { UpdateProjectResource } from '../../resources/update-project-resource';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStatus} from '../../model/project-status';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-edit-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    TranslatePipe,
    MatSelectModule
  ],
  templateUrl: './edit-project-form.html',
  styleUrl: './edit-project-form.css'
})
export class EditProjectForm implements OnInit {
  @Input() project!: Project;
  @Output() update = new EventEmitter<UpdateProjectResource>();

  form!: FormGroup;

  readonly statuses = Object.values(ProjectStatus);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.project.projectName, [Validators.minLength(2)]],
      description: [this.project.description, [Validators.minLength(5)]],
      status: [this.project.status],
      endingDate: [this.project.endDate]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, status, endingDate } = this.form.value;

    const updatePayload: UpdateProjectResource = {};
    if (name?.trim()) updatePayload.name = name.trim();
    if (description?.trim()) updatePayload.description = description.trim();
    if (status) updatePayload.status = status;
    if (endingDate) updatePayload.endingDate = endingDate;

    if (Object.keys(updatePayload).length > 0) {
      this.update.emit(updatePayload);
    }
  }
}
