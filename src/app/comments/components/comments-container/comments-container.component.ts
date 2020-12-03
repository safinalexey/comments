import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { Comment } from '../comment/comment.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-comments-container',
	templateUrl: './comments-container.component.html',
	styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {

	filteredComments: Comment[];
	allComments: Comment[];
	commentToEdit: Comment;
	tags = new Set<string>();
	selectedTags: string[] = [];

	constructor(private data: DataService,
				private dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.data.getComments().subscribe((comments: Comment[]) => {
			this.filteredComments = comments;
			this.allComments = comments;
			comments.forEach((comment: Comment) => {
				comment.tags.forEach(tag => this.tags.add(tag));
			});
		});
	}

	addComment({title, text, tags, id}: Comment): void {
		if (id !== null) {
			const index = this.allComments.findIndex((comment: Comment) => comment.id === id);
			this.allComments[index] = {title, text, tags, id};
			this.commentToEdit = null;
		} else {
			let id = this.filteredComments[this.filteredComments.length - 1].id;
			id++;
			this.filteredComments.push({title, text, tags, id});
		}

	}

	filterByTag(tag: string): void {
		if (this.selectedTags.includes(tag)) {
			const index = this.selectedTags.findIndex(_ => tag === _);
			this.selectedTags.splice(index, 1);
		} else {
			this.selectedTags.push(tag);
		}

		if (this.selectedTags.length) {
			this.filteredComments = this.allComments.filter(comment => {
				const intersection = comment.tags.filter((_: string) => this.selectedTags.includes(_));
				return intersection.length > 0;
			});
		} else {
			this.filteredComments = this.allComments;
		}
	}

	deleteComment(id: number): void {

		const index = this.allComments.findIndex((comment: Comment) => comment.id === id);

		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			width: '500px',
			data: {title: this.allComments[index].title}
		});

		dialogRef.afterClosed().pipe(filter(Boolean)).subscribe(result => {
			if (index >= 0) {
				this.allComments.splice(index, 1);
			}
		});

	}

	isTagSelected(tag): boolean {
		return this.selectedTags.includes(tag);
	}
}
