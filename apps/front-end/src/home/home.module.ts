import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatchCardsComponent } from './match-cards/match-cards.component';
import { Top3PredictorsComponent } from './top-3-predictors/top-3-predictors.component';

@NgModule({
  declarations: [HomeComponent, MatchCardsComponent, Top3PredictorsComponent],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
