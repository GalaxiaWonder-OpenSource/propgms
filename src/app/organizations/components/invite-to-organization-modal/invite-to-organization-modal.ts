import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-invite-to-organization-modal',
  templateUrl: './invite-to-organization-modal.html',
  styleUrls: ['./invite-to-organization-modal.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class InviteToOrganizationModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<InviteToOrganizationModal>);

  inviteForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitForm() {
    if (this.inviteForm.valid) {
      this.dialogRef.close({ email: this.inviteForm.value.email });
    } else {
      this.inviteForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
