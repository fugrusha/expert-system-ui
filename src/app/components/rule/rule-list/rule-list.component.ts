import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { IRule } from 'src/app/models/rule';
import { RuleService } from 'src/app/services/rule.service';
import { RuleEditComponent } from '../rule-edit/rule-edit.component';
import { EngineerToolbarComponent } from '../../ui/engineer-toolbar/engineer-toolbar.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatIconModule, EngineerToolbarComponent],
})
export class RuleListComponent {
  displayedTableColumns: string[] = ['name', 'description', 'priority',
   'condition', 'ruleAction', 'action'];
  dataSource: IRule[];

  constructor(
    public _dialog: MatDialog,
    private _ruleService: RuleService 
  ) { }

  ngOnInit(): void {
    this.getAllRules()
  }

  openCreateRuleDialog() {
    const dialagRef = this._dialog.open(RuleEditComponent);
    this.updateListAfterDialogClosed(dialagRef)
  }

  openEditRuleDialog(rule: IRule) {
    const dialagRef =  this._dialog.open(RuleEditComponent, {data: rule});
    this.updateListAfterDialogClosed(dialagRef)
  }

  updateListAfterDialogClosed(dialogRef: MatDialogRef<RuleEditComponent, any>) {
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this.getAllRules();
        }
      }
    })
  }

  getAllRules(): void {
    this._ruleService.getAll()
      .subscribe(result => this.dataSource = result)
  }

  deleteRule(id: string) {
    this._ruleService.deleteRule(id).subscribe({
      next: (res) => {
        this.getAllRules();
      },
      error: console.error,
    })
  }
}
