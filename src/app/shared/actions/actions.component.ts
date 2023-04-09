import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task.model';
import { DeleteDialogComponent } from 'src/app/user/delete-dialog/delete-dialog.component';
import { TaskService } from 'src/app/user/task.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  @Input() task!: Task;
  @Input() dataSource: Task[] = [];

  @Output() updateTaskEvent = new EventEmitter<Task[]>();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(task.id);
        this.updateTaskEvent.emit(this.dataSource.filter(data => (task.id !== data.id) && data));
        this._snackBar.open('Item deleted successfully!');
      }
    });
  }

  markAsCompleted(task: Task) {
    if (!task.status) {
      this.taskService.update(task.id);
      this.updateTaskEvent.emit(this.dataSource.map(data => (task.id === data.id) ? { ...data, status: true } : data));
      this._snackBar.open('Task completed successfully!');
    }
  }
}
