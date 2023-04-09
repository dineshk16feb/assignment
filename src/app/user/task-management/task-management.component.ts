import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../task.service';
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'dueDate', 'actions'];
  dataSource: Task[] = [];
  new_Date: Date = new Date();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserTasks();
  }

  getUserTasks() {
    this.taskService.getAll().subscribe((ss: any) => {
      ss.docs.forEach((doc: any) => {
        this.dataSource.push(doc.data());
      });
    });
  }

  createNewTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask = {
          ...result,
          id: this.taskService.createUid(),
          dueDate: this.new_Date.toLocaleString(),
          status: false,
          uid: this.taskService.getUid()
        };

        this.taskService.create(newTask).then(() => {
          this.dataSource = [...[newTask], ...this.dataSource];
          this._snackBar.open('Created new item successfully!');
        });
      }
    });
  }
}
