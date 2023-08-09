import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { QuestionService } from 'src/app/services/question.service';
import { IQuestion } from 'src/app/models/question';
import { IAnswer, IUserForm } from 'src/app/models/user-form';
import { CommonModule, NgFor } from '@angular/common';
import { UserFormService } from 'src/app/services/user-form.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { UserToolbarComponent } from '../ui/user-toolbar/user-toolbar.component';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    UserToolbarComponent
  ],
})
export class UserFormComponent implements OnInit {

  userForm: IUserForm = {
    answers: [],
  };

  questions: IQuestion[] = [];

  selectedValue: string; // Property to hold the selected value

  constructor(
    private _formBuilder: FormBuilder,
    private _questionService: QuestionService,
    private _userFormService: UserFormService
  ) { }

  ngOnInit() {
    this.getAllQuestions();
  }


  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  getAllQuestions(): void {
    this._questionService.getAll()
      .subscribe(questionsResult => {
        this.questions = questionsResult;
      })
  }

  addSelectedAnswer(questionKey: string) {
    this.addAnswer(questionKey, this.selectedValue);
  }

  addAnswer(questionKey: string, answer: string) {
    const newAnswer: IAnswer = {
      questionKey,
      answer,
    };
    this.userForm.answers.push(newAnswer);
  }

  onSubmit() {
    console.log(this.userForm);

    this._userFormService.sendUserForm(this.userForm)
      .subscribe(res => console.log);
  }

}
