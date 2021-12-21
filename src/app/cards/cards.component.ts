import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit
{
  // cards!:Card[];

  // cardItem =
  // {
  //   title:'Full-stack developer',
  //   name: 'Mikayil',
  //   phone:'050-999-88-77',
  //   email:'mikayil@gmail.com',
  //   address:'Baku, St95'
  // };

  constructor
  (
    public dialog: MatDialog,
    public cardService : CardService
  )
  {

  }

  ngOnInit(): void
  {
    // this.getCards();//CardService-in icine bax !!!
    this.cardService.getCards();
  }

  openAddCardModal() : void
  {
      /*
      const dialog = this.dialog.open(CardModalComponent,
      {
        width:'400px'
      });

      /*
      dialog.afterClosed().subscribe(res=>
      {
        console.log(res);

        if(res)
        {
          this.getCards();
        }
      });
      */

      this.dialog.open(CardModalComponent,
      {
        width:'400px'
      });
  }

  //Look at CardService !!!
  /*
  getCards() : void
  {
      this.cardService.getCards()
      .subscribe((res:Card[])=>
      {
        //console.log(res);
        this.cards = res;
      });
  }
  */
}
