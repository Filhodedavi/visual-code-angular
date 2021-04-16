import { debounceTime, distinctUntilChanged, filter, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) { }

  ngOnInit(): any {
    this.results$ = this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      // tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          serch: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total),
      map(res => res.results)
    );
  }

  onSearch(): any {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {

      const params = {
        search: value,
        fields
      };

      let param = new HttpParams();
      param = param.set('search', value);
      param = param.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params }) // + '?fields=' + fields + '&search=' + value)
        .pipe(
          tap((res: any) => this.total = res.total),
          map(res => res.results)
        );
    }
  }
}
