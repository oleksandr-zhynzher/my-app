import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ComplaintsListComponent } from './components/complaints-list/complaints-list.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { MainComponent } from './pages/main/main.component';
import {
  MapMarkersClusterService,
  MapService,
  ConfigService,
} from './services';
import { RegisterComplainComponent } from './pages/register-complain/register-complain.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { ComplainsService } from './services/complains/complains.service';
import { CityFinderComponent } from './components/city-finder/city-finder.component';
import { PlacesService } from './services/palces/places.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    StatisticComponent,
    ComplaintsListComponent,
    ComplaintComponent,
    MainComponent,
    RegisterComplainComponent,
    CityFinderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [
    MapService,
    MapMarkersClusterService,
    ConfigService,
    ComplainsService,
    PlacesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
