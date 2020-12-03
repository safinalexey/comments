import {
	Component, ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output, ViewChild
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Comment } from '../comment/comment.component';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

	commentForm = this.fb.group({
		title: new FormControl(''),
		text: new FormControl(''),
		tags: new FormControl([]),
		id: new FormControl(null),
	});

	tagsCtrl = new FormControl();
	addedTags = [];
	separatorKeysCodes = [ENTER, COMMA];
	editMode = false;
	title = 'New';
	buttonTitle = 'Submit';

	saved = new Subject();

	@Input() allTags;
	@Input() commentToEdit: Comment;
	@Output() formSubmit: EventEmitter<Comment> = new EventEmitter();
	@ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit(): void {
	}

	setValues(): void {
		this.editMode = true;
		this.title = 'Update';
		this.buttonTitle = 'Save';
		this.commentForm.patchValue({...this.commentToEdit});
		this.addedTags = [...this.commentToEdit.tags];
	}

	onSubmit(): void {
		if (!this.editMode) {
			this.formSubmit.emit(this.commentForm.value);
			this.commentForm.reset();
			this.commentForm.controls.tags.setValue([]);
			this.addedTags = [];
		} else {
			this.saved.next(this.commentForm.value);
		}
	}

	removeTag(tag): void {
		const index = this.addedTags.indexOf(tag);

		if (index >= 0) {
			this.addedTags.splice(index, 1);
		}
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		if ((value || '').trim()) {
			this.addedTags.push(value.trim());
			this.commentForm.value.tags.push(value.trim());
		}

		if (input) {
			input.value = '';
		}

		this.tagsCtrl.setValue(null);
	}

	tagSelected(tag): void {
		this.addedTags.push(tag);
		this.commentForm.controls.tags.value.push(tag.trim());
		this.tagInput.nativeElement.value = '';
		this.tagsCtrl.setValue(null);
	}

	cancel(): void {
		this.saved.next(null);
	}

}
