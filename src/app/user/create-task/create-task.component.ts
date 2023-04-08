import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  createTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.createTaskForm.controls[control].hasError(error);
  }
}
