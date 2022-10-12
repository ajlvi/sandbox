import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CardQueryData } from '../shared/query-data.interface'

@Component({
  selector: 'app-card-results',
  templateUrl: './card-results.component.html',
  styleUrls: ['./card-results.component.css']
})

export class CardResultsComponent implements OnInit {
/* 22.10.12 ajlvi
  for testing, this component will draw the sample data itself, though in the future
  this will need to be reworked so a service can provide the result of the query */

  queryResult: {[name: string]: CardQueryData}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{[name: string]: CardQueryData}>('../assets/sample_data.json').subscribe(
      (res) => {
        this.queryResult = res;
      }
    )
  }

}
