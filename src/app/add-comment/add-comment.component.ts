import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class AddCommentComponent {
  commentForm: FormGroup;
  albumId: number;
  ratings = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {
    this.commentForm = this.fb.group({
      description: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    });

    this.albumId = this.route.snapshot.params['id'];
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const comment = {
        description: this.commentForm.value.description,
        rating: this.commentForm.value.rating,
        collector: { id: 1 }, // Id del coleccionista quemado
      };

      this.albumService
        .addComment(this.albumId, comment)
        .subscribe((response) => {
          console.log('Comentario agregado:', response);
          this.router.navigate(['/albums']);
        });
    }
  }
}
