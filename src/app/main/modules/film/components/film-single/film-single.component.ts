import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ActivatedRoute} from '@angular/router';
import {FilmResponseModel} from '../../../../../shared/models/film-response.model';
import {Observable} from 'rxjs';
import {FilmService} from '../../services/film.service';
import {Title} from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-film-single',
  templateUrl: './film-single.component.html',
  styleUrls: ['./film-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FilmSingleComponent implements OnInit {
  FilmDeatil = 'Film Deatils';
  filmItems: FilmResponseModel;
  singleFilmItems$!: Observable<FilmResponseModel>;
  categoryList = [
    {
      categoryName: 'characters',
      categoryItem: 'character'
    },
    {
      categoryName: 'Planets',
      categoryItem: 'Planet'
    },
    {
      categoryName: 'Species',
      categoryItem: 'Specie '
    },
  ];

  sliderItems = [
    {
      imgUrl: 'assets/images/slider_01.png'
    },
    {
      imgUrl: 'assets/images/slider_01.png',
    },
    {
      imgUrl: 'assets/images/slider_01.png',
    }
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private filmService: FilmService,
              private titleService: Title) {
    this.singleFilmItems$ = this.filmService.singleFilmItems$;
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        // this.filmItems = res.filmItems;
        this.filmService.setFilmDetail(res.filmItems);
        this.titleService.setTitle(`Filme | ${res.filmItems.title}`);
      });
  }
}
