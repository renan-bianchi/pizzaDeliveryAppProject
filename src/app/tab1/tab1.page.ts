// import { TesteServiceService } from './../teste-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // appText: string;

public frutas : Array<string> = ["banana", "mamão", "maçã", "pera"];

  constructor() {}
  // INSERT IN CONSTRUCTOR => private TesteServiceService
  // ionViewWillEnter() {
  //   this.getText();
  // }

  // getText() {
  //   this.TesteServiceService.getText().subscribe(
  //     (response) => {
  //       this.appText = response.text;
  //     },
  //     (error) => {
  //       console.log('Erro ao obter o texto:', error);
  //     }
  //   );
  // }

  // updateText(newText:string) {
  //   this.TesteServiceService.updateText(newText).subscribe(
  //     (response) => {
  //       console.log(response.message);
  //     };
  //     (error) => {
  //       console.log('Erro ao atualizar o texto:', error);
  //     }
  //   );
  // }
}
