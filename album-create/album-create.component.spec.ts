import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlbumCreateComponent } from './album-create.component';
import { AlbumService } from '../services/album.service';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Album } from '../models/album.model';

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let albumService: AlbumService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumCreateComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AlbumService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: null } },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    albumService = TestBed.inject(AlbumService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.albumForm).toBeDefined();
    expect(component.albumForm.controls['name']).toBeDefined();
    expect(component.albumForm.controls['cover']).toBeDefined();
    expect(component.albumForm.controls['releaseDate']).toBeDefined();
    expect(component.albumForm.controls['description']).toBeDefined();
    expect(component.albumForm.controls['genre']).toBeDefined();
    expect(component.albumForm.controls['recordLabel']).toBeDefined();
  });

  it('should call createAlbum on submit when in create mode', () => {
    const mockAlbum: Album = {
      id: 1,
      name: 'Test Album',
      cover: 'http://example.com/cover.jpg',
      releaseDate: '2023-01-01',
      description: 'Test Description',
      genre: 'Rock',
      recordLabel: 'Sony Music',
      comments: [],
      tracks: [],
    };
    spyOn(albumService, 'createAlbum').and.returnValue(of(mockAlbum));
    component.albumForm.setValue({
      name: 'Test Album',
      cover: 'http://example.com/cover.jpg',
      releaseDate: '2023-01-01',
      description: 'Test Description',
      genre: 'Rock',
      recordLabel: 'Sony Music',
    });
    component.onSubmit();
    expect(albumService.createAlbum).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/albums']);
  });

  it('should call updateAlbum on submit when in edit mode', () => {
    const mockAlbum: Album = {
      id: 1,
      name: 'Test Album',
      cover: 'http://example.com/cover.jpg',
      releaseDate: '2023-01-01',
      description: 'Test Description',
      genre: 'Rock',
      recordLabel: 'Sony Music',
      comments: [],
      tracks: [],
    };
    spyOn(albumService, 'updateAlbum').and.returnValue(of(mockAlbum));
    component.isEditMode = true;
    component.albumId = 1;
    component.albumForm.setValue({
      name: 'Test Album',
      cover: 'http://example.com/cover.jpg',
      releaseDate: '2023-01-01',
      description: 'Test Description',
      genre: 'Rock',
      recordLabel: 'Sony Music',
    });
    component.onSubmit();
    expect(albumService.updateAlbum).toHaveBeenCalledWith(
      1,
      component.albumForm.value
    );
    expect(router.navigate).toHaveBeenCalledWith(['/albums']);
  });

  it('should update coverUrl on cover input', () => {
    const coverInput = component.albumForm.controls['cover'];
    coverInput.setValue('http://example.com/cover.jpg');
    component.onCoverInput();
    expect(component.coverUrl).toBe('http://example.com/cover.jpg');
  });
});
