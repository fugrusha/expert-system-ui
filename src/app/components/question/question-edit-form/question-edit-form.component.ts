import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionService } from 'src/app/services/question.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IQuestion } from 'src/app/models/question';
import { CommonModule } from '@angular/common';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';



@Component({
  standalone: true,
  selector: 'app-question-edit-form',
  templateUrl: './question-edit-form.component.html',
  styleUrls: ['./question-edit-form.component.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,

  ]
})
export class QuestionEditFormComponent implements OnInit {

  questionForm: FormGroup;
  chosenQuestionType: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<QuestionEditFormComponent>,
    private _questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) private data: IQuestion
  ) {
    this.questionForm = this._formBuilder.group({
      key: '',
      questionType: '',
      question: '',
      comment: '',
      order: '',
      answers: []
    })
  }

  ngOnInit(): void {
    this.questionForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.questionForm.valid) {
      if (this.data) {
        this.updateQuestion(this.data.id, this.questionForm);
      } else {
        this.createQuestion(this.questionForm);
      }
    }
  }

  createQuestion(form: FormGroup) {
    console.log(form.value);
    this._questionService.createQuestion(form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true);
        console.log(val);
      },
      error: (err: any) => console.error(err)
    })
  }

  updateQuestion(id: string, form: FormGroup) {
    console.log(form.value);
    this._questionService.patchQuestion(id, form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true)
      },
      error: (err: any) => console.error(err)
    })
  }


  answers: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addAnswer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add value if not empty
    if ((value || '').trim()) {
      this.answers.push(value.trim());

      // Update the answers form control value
      const answersControl = this.questionForm.get('answers');
      if (answersControl) {
        answersControl.setValue(this.answers);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAnswer(answer: string): void {
    const index = this.answers.indexOf(answer);

    if (index >= 0) {
      this.answers.splice(index, 1);
    }
  }
}
