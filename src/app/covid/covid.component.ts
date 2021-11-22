import { Component, OnInit } from '@angular/core';
import { LngLat, LngLatBounds,LngLatBoundsLike, Map, Marker } from 'mapbox-gl';
import { MapService } from 'ngx-mapbox-gl';
import { Continent } from '../interfaces/continent';
import { Country } from '../interfaces/country';
import { CountryInfo } from '../interfaces/country-info';
import { LatLng } from '../interfaces/lat-lng';
import { SeriesMap } from '../interfaces/series-map';
import { ChartPlugComponent } from '../plugins/chart-plug/chart-plug.component';
import { ApiService } from '../services/api.service';

declare var require: any;

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css'],
  providers: [
    ChartPlugComponent,
  ],
  
})
export class CovidComponent implements OnInit {

  fitBound: LngLatBoundsLike = new LngLatBounds;
  baseMap!: Map;
  map = {
    center : new LngLat(-74.5, 40),
    fitBound: <LngLatBoundsLike>new LngLatBounds,
    markers: <Marker[]>[],
  };
  continents: Continent[] = [];
  countries: Country[] = [];
  continent!: Continent;
  form = {
    field: {
      selection_continent: "",
      selection_type: "active",
    },
    options: {
      selection_continent: <String[]>[],
      selection_type: <any[]>[
        {value: "active",text: "Active"},
        {value: "cases",text: "Cases"},
        {value: "critical",text: "Critical"},
        {value: "deaths",text: "Deaths"},
        {value: "recovered",text: "Recovered"},
        {value: "tests",text: "Tests"},
        {value: "todayCases",text: "Today Cases"},
        {value: "todayDeaths",text: "Today Deaths"},
        {value: "todayRecovered",text: "Today Recovered"},
      ]
    }
  };
  chart = {
    general: <SeriesMap[]>[],
    list: <SeriesMap[]>[],
  }

  

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    
  }

  callDataContinents() {
    let obsCountries = this.apiService.getDataCountries();
    let obs = this.apiService.getDataContinets();

    obsCountries.subscribe({ next:  (data) => {
      // console.log("data",data);
        this.countries = data;
      },
      error:(err) => console.error('Observer got an error: ' + err),
      complete:() => {
        obs.subscribe({ next:  (data) => {
          // console.log("data",data);
            this.continents = data;
          },
          error:(err) => console.error('Observer got an error: ' + err),
          complete:() => {
            this.form.options.selection_continent = this.continents.map((continent)=>continent.continent);
            this.form.field.selection_continent = this.continents[0].continent;
            this.continent = this.continents[0]!;

            this.focusMap();
          }
        });
      }
    });

    
    //   x => console.log('Observer got a next value: ' + x),
    //   err => console.error('Observer got an error: ' + err),
    //   () => console.log('Observer got a complete notification')
    // )
    
  }

  focusMap(){
    // var geoViewport = require('@mapbox/geo-viewport');
    let lngLatBounds = new LngLatBounds();
    
    this.countries.filter((country)=>this.continent.countries.findIndex((countryy)=>countryy==country.country)>=0)
      .map((country)=>new LngLat(country.countryInfo.long,country.countryInfo.lat))
      .forEach((element: LngLat) => {
        lngLatBounds.extend(element);
      });
    
      this.baseMap.fitBounds(lngLatBounds,{padding: {left:100,right:300,top:100,bottom:300}});
      
    ;
    
    this.setDataGeneral();
      }

  findTypeInfo(object: Object){
    // console.log("lalalalal",Object.keys(object),this.form.field.selection_type);
    let key = Object.keys(object).findIndex((key)=>key.toLowerCase()==this.form.field.selection_type.toLowerCase());
    return Object.values(object)[key];
  }

  setDataGeneral(){
    this.map.markers.forEach((marker)=>marker.remove());

    // let la = new SeriesMap;
    // return [];
    let countries_copy = this.countries;
    
    let data = countries_copy.filter((country)=>this.continent.countries.findIndex((countryy)=>countryy==country.country)>=0)
    .filter((country)=>this.findTypeInfo(country)>0)
    .sort((a,b)=>{
      return this.findTypeInfo(a)<this.findTypeInfo(b) ? 1 : -1;
    });
    // console.info("aaa",data);
    let dataGeneral = data.splice(0,10);
    this.chart.general = dataGeneral.map((country)=>{
      return {x: country.country,y: this.findTypeInfo(country)};
    });
    this.chart.list = data.map((country)=>{
      return {x: country.country,y: this.findTypeInfo(country)};
    });

    dataGeneral.forEach((country)=>{
      const marker = new Marker({color: "red"})
      .setLngLat(new LngLat(country.countryInfo.long,country.countryInfo.lat))
      .addTo(this.baseMap);
      this.map.markers.push(marker);
    })

    data.forEach((country)=>{
      const marker = new Marker({color: "blue"})
      .setLngLat(new LngLat(country.countryInfo.long,country.countryInfo.lat))
      .addTo(this.baseMap);
      this.map.markers.push(marker);
    })

    

    // const marker = new Marker({color: "red"})
    // .setLngLat([30.5, 50.5])
    // .addTo(this.baseMap);
  }

  chooseContinent(){
    this.continent = this.continents.find((continent)=>continent.continent==this.form.field.selection_continent)!;
    
    this.focusMap();
  }

  chooseCountry(country: String){

  }

  loadMap(event: Map){
    this.baseMap = event;
    this.callDataContinents();
  }

  getLatLng(countryName: String){
    let country = this.countries.find((country)=>country.country==countryName);

    return new LngLat(country!.countryInfo.long,country!.countryInfo.lat);
  }

}
