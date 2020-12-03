import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

export interface Comment {
	id: number;
	title: string;
	text: string;
	tags: string[];
}

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

	editMode = false;

	@ViewChild('editorContainer', {read: ViewContainerRef}) editorContainer: ViewContainerRef;

	@Input() comment: Comment;
	@Input() allTags; // bad pattern
	@Output() delete: EventEmitter<number> = new EventEmitter<number>();
	@Output() edit: EventEmitter<Comment> = new EventEmitter<Comment>();

	constructor(private cfr: ComponentFactoryResolver) {
	}

	ngOnInit(): void {
	}

	onDelete(id: number): void {
		this.delete.emit(id);
	}

	onEdit(comment: Comment): void {
		this.editMode = true;
		this.editorContainer.clear();
		const editorComponentFactory = this.cfr.resolveComponentFactory(EditorComponent);
		const editorComponent = this.editorContainer.createComponent<EditorComponent>(editorComponentFactory);
		editorComponent.instance.commentToEdit = {...comment};
		editorComponent.instance.allTags = this.allTags;
		editorComponent.instance.setValues();
		const saved$ = editorComponent.instance.saved.subscribe((editedComment: Comment | null) => {
			if (editedComment) {
				this.edit.emit(editedComment);
				this.editMode = false;
			} else {
				this.editMode = false;
			}
			editorComponent.destroy();
			saved$.unsubscribe();
		});
	}
}
