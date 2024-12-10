import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css'],
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
export class AlbumCreateComponent implements OnInit {
  albumForm: FormGroup;
  albumId: number | null = null;
  isEditMode = false;
  coverUrl: string | null = null;

  genres = ['Classical', 'Salsa', 'Rock', 'Folk'];
  recordLabels = ['Sony Music', 'Discos Fuentes', 'Elektra', 'Fania Records'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ) {
    this.albumForm = this.fb.group({
      name: ['', Validators.required],
      cover: ['', Validators.required],
      releaseDate: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      recordLabel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.albumId = this.route.snapshot.params['id'];
    if (this.albumId) {
      this.isEditMode = true;
      this.albumService.getAlbumById(this.albumId).subscribe((album: Album) => {
        const formattedDate = new Date(album.releaseDate)
          .toISOString()
          .split('T')[0];
        this.albumForm.patchValue({ ...album, releaseDate: formattedDate });
        this.coverUrl = album.cover;
      });
    }
  }

  onCoverInput() {
    this.coverUrl = this.albumForm.get('cover')?.value;
  }

  onSubmit() {
    if (this.albumForm.valid) {
      if (this.isEditMode) {
        this.albumService
          .updateAlbum(this.albumId!, this.albumForm.value)
          .subscribe((response) => {
            console.log('Álbum actualizado:', response);
            this.router.navigate(['/albums']);
          });
      } else {
        this.albumService
          .createAlbum(this.albumForm.value)
          .subscribe((response) => {
            console.log('Álbum creado:', response);
            this.router.navigate(['/albums']);
          });
      }
    }
  }
}
