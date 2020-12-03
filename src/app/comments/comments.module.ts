import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsContainerComponent } from './components/comments-container/comments-container.component';
import { CommentComponent } from './components/comment/comment.component';
import { EditorComponent } from './components/editor/editor.component';
import { CommentsRoutingModule } from './comments-routing.module';
import { DataService } from '../data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [
		CommentsContainerComponent,
		CommentComponent,
		EditorComponent,
		DeleteDialogComponent
	],
	imports: [
		CommonModule,
		CommentsRoutingModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatDialogModule
	],
	providers: [
		DataService
	]
})
export class CommentsModule {
}
