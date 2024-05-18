import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagtreinoPageRoutingModule } from './pagtreino-routing.module';

import { PagtreinoPage } from './pagtreino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagtreinoPageRoutingModule
  ],
  declarations: [PagtreinoPage]
})
export class PagtreinoPageModule {}
