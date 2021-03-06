import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';

import {MatSelectModule} from '@angular/material/select';
import { AssignmentsComponent } from './assignments/assignments.component';
import { assignementsDialogue } from './assignments/dialogue/assignementsdialogue.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { UserComponent } from './user/user.component';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" ?? la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component:AssignmentsComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent
  },
  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },  
  // {
  //   path:"assignment/:id",
  //   component:AssignmentDetailComponent
  // },
  {
    path:"login",
    component:UserComponent
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    UserComponent,
    assignementsDialogue,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes), HttpClientModule, ScrollingModule,MatSelectModule,
    MatGridListModule,
    DragDropModule,
    MatDialogModule, 
    JwtModule,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
