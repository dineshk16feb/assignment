import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { TaskManagementComponent } from './task-management/task-management.component';



@NgModule({
    declarations: [
        TaskManagementComponent,
        CreateTaskComponent,
        DeleteDialogComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class UserModule { }
