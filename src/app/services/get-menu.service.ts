import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetMenuService {
  private pizzasSalgadasUrl = 'assets/pizzasSalgadas.json';
  private pizzasDocesUrl = 'assets/pizzasDoces.json';
  private BebidasUrl = 'assets/bebidas.json';
  
  constructor(private httpClient: HttpClient) {}
  
  public getPizzasSalgadas(): any {
    return this.httpClient.get<any>(this.pizzasSalgadasUrl);
  };

  public getPizzasDoces(): any {
    return this.httpClient.get<any>(this.pizzasDocesUrl);
  };
  
  public getBebidas(): any {
    return this.httpClient.get<any>(this.BebidasUrl);
  }

}
