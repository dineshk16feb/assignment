import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActionsComponent } from './actions/actions.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ActionsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        MaterialModule,
        ActionsComponent,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SharedModule {
}