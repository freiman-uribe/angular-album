import { Routes } from '@angular/router';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
  { path: 'create-album', component: AlbumCreateComponent },
  { path: 'albums', component: AlbumListComponent },
  { path: 'album/:id/comment', component: AddCommentComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'edit-album/:id', component: AlbumCreateComponent },
];
