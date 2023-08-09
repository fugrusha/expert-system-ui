import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { IRule } from 'src/app/models/rule';
import { RuleService } from 'src/app/services/rule.service';

@Component({
  standalone: true,
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.css'],
  imports: [
    MatButtonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatRadioModule
  ]
})
export class RuleEditComponent {

  ruleForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<RuleEditComponent>,
    private _ruleService: RuleService,
    @Inject(MAT_DIALOG_DATA) private data: IRule
  ) {
    this.ruleForm = this._formBuilder.group({
      id: '',
      name: '',
      description: '',
      priority: 0,
      condition: '',
      action: ''
    })
  }


  ngOnInit(): void {
    this.ruleForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.ruleForm.valid) {
      if (this.data) {
        this.update(this.data.id, this.ruleForm);
      } else {
        this.create(this.ruleForm);
      }
    }
  }

  create(form: FormGroup) {
    this._ruleService.createRule(form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true)
      },
      error: (err: any) => console.error(err)
    })
  }

  update(id: string, form: FormGroup) {
    this._ruleService.patchRule(id, form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true)
      },
      error: (err: any) => console.error(err)
    })
  }
}
