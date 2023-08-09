import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { QuestionEditFormComponent } from '../question-edit-form/question-edit-form.component';
import { MatButtonModule } from '@angular/material/button';
import { QuestionService } from 'src/app/services/question.service';
import { IQuestion } from 'src/app/models/question';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EngineerToolbarComponent } from '../../ui/engineer-toolbar/engineer-toolbar.component';




@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatIconModule, EngineerToolbarComponent],
})
export class QuestionListComponent implements OnInit {

  displayedTableColumns: string[] = ['key', 'question', 'questionType', 'order', 'action'];
  dataSource: IQuestion[];

  constructor(
    public _dialog: MatDialog,
    private _questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.getAllQuestions()
  }

  openCreateQuestionDialog() {
    const dialagRef = this._dialog.open(QuestionEditFormComponent);
    this.updateListAfterDialogClosed(dialagRef)
  }

  openEditQuestionDialog(question: IQuestion) {
    const dialagRef =  this._dialog.open(QuestionEditFormComponent, {data: question});
    this.updateListAfterDialogClosed(dialagRef)
  }

  updateListAfterDialogClosed(dialogRef: MatDialogRef<QuestionEditFormComponent, any>) {
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this.getAllQuestions();
        }
      }
    })
  }

  getAllQuestions(): void {
    this._questionService.getAll()
      .subscribe(questionsResult => this.dataSource = questionsResult)
  }

  deleteQuestion(id: string) {
    this._questionService.deleteQuestion(id).subscribe({
      next: (res) => {
        this.getAllQuestions();
      },
      error: console.error,
    })
  }
}
