import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class AlbumListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'cover',
    'releaseDate',
    'description',
    'genre',
    'recordLabel',
    'actions',
  ];
  dataSource = new MatTableDataSource<Album>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private albumService: AlbumService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewAlbum(id: number): void {
    this.router.navigate(['/album', id]);
  }

  addComment(id: number): void {
    this.router.navigate(['/album', id, 'comment']);
  }

  addAlbum(): void {
    this.router.navigate(['/create-album']);
  }

  editAlbum(id: number): void {
    this.router.navigate(['/edit-album', id]);
  }

  deleteAlbum(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
      this.albumService.deleteAlbum(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (album) => album.id !== id
        );
      });
    }
  }
}
