import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsContainerComponent } from './components/comments-container/comments-container.component';

const routes: Routes = [
	{
		path: '',
		component: CommentsContainerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CommentsRoutingModule {
}
