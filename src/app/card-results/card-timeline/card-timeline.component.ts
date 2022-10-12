import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CardQueryData } from 'src/app/shared/query-data.interface';

@Component({
  selector: 'app-card-timeline',
  templateUrl: './card-timeline.component.html',
  styleUrls: ['./card-timeline.component.css']
})
export class CardTimelineComponent implements OnInit {
  @Input() data: CardQueryData
  @Input() cardName: string;

  sets_in_order: string[] = []
  publications_by_set: {[set: string]: string[]}

  appearance_dict = {}

/* for my initial test, EACH INSTANCE of this component reaches out to the .json file.
   it must be better to only load the json data once and have a service coordinate it here. */

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("../../assets/common_data.json").subscribe(
      (json) => {
        //determine which sets are relevant for this card
        let startIndex = 0; //default value if we don't move it forward
        if (json["sets_in_order"].includes(this.data.sets[0])) {
          startIndex = json["sets_in_order"].indexOf(this.data.sets[0])
        }
        this.sets_in_order = json["sets_in_order"].slice(startIndex).reverse();

        //store which publications occured with each season
        this.publications_by_set = json["publications_by_set"];

        this.tabulateAppearances()
      }
    )
  }

  tabulateAppearances() {
    // python equivalent : deck_pub_dates = set(list([deck[0] for deck in data.decks]))
    let deck_pub_dates = []
    let currentDate = ''; //assumes data is in order, but that's OK
    for (let deck of this.data.decks) {
      if (deck[0] != currentDate) { deck_pub_dates.push(deck[0]); currentDate = deck[0] }
    }

    for (let i=0; i < this.sets_in_order.length; i++) {
      const currentSet = this.sets_in_order[i]
      let season_pubs = this.publications_by_set[currentSet]
      let season_pubs_with_card = deck_pub_dates
        .slice()
        .filter(deck => deck >= season_pubs[0])
        .filter(deck => deck <= season_pubs[season_pubs.length-1])
      this.appearance_dict[currentSet] = [season_pubs_with_card.length, season_pubs.length]
    }
  }

  appearanceCount(set: string) {
    return this.appearance_dict[set]
  }

}
