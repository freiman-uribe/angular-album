import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
})
export class AlbumDetailComponent implements OnInit {
  album: Album | undefined;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.albumService.getAlbumById(id).subscribe((data: Album) => {
      this.album = data;
    });
  }

  getHearts(rating: number): string[] {
    return Array(rating).fill('❤️');
  }
}
