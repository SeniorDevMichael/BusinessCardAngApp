import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable(
{
  providedIn: 'root'
})

export class CardService 
{ 
  // apiUrl: string = 'https://demo.limantech.com/cards/public/api';
  cards!: Card[];

  constructor
  (
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient
  ) 
  {

  }

  // getCards() : Observable<Card[]>
  // {
  //   return this.http.get<Card[]>(this.apiUrl + '/cards');
  // }

  getCards() : void
  {
     this.http.get<Card[]>(this.apiUrl + '/cards')
     .subscribe((res:Card[])=>
     {
        this.cards = res;
     });
  }

  addCard(card:Card) : Observable<any>
  {
      return this.http.post(this.apiUrl + '/cards', card);
  }

  updateCard(card:Card, cardId:number) : Observable<any>
  {
      return this.http.put(this.apiUrl + '/cards/' + cardId, card); 
  }

  deleteCard(cardId:number) : Observable<any>
  {
    return this.http.delete(this.apiUrl + '/cards/' + cardId);
  }
}