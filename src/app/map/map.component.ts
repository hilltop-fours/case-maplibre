// @ts-ignore

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Map } from 'maplibre-gl';
import { MapelibreService, roadobject, roadobjectmaintenancecondition } from '../mapelibre.service';


import { GeoJSON } from 'geojson';
import * as GeoParser from '../../../node_modules/geojson';
import { GeojsonService } from '../geojson.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {

  private mapContainer = viewChild<ElementRef>('mapContainer');
  private map?: Map = undefined;

  private roadobject: roadobject[] = [];
  private roadobjectasgeojson: GeoJSON
  private roadobjectmaintenancecondition: roadobjectmaintenancecondition[] = []

  constructor(
    private readonly maplibreservice: MapelibreService,
    private readonly geojseonservice: GeojsonService
  ) {
  }

  ngOnInit(): void {
    console.log('ngOnInit()')

    this.maplibreservice.getRoadObject().subscribe({
      next: (data) => { console.log('get data', this.roadobject = data) },
      error: (err: Error) => console.error(`Observer got an error: ${err}`),
      complete: () => {
        console.log('getRoadObject', this.roadobject)
        this.roadobjectasgeojson = GeoParser.parse(this.roadobject, { GeoJSON: 'geometry', include: ['objectId', 'name', 'roadNumber', 'hectometer', 'direction', 'constructionYear', 'comment'] });
      }
    });

    this.maplibreservice.getRoadObjectMaintenanceCondition().subscribe({
      next: (data) => this.roadobjectmaintenancecondition = data,
      error: (err: Error) => console.error(`Observer got an error: ${err}`),
      complete: () => console.log('getRoadObjectMaintenanceCondition', this.roadobjectmaintenancecondition)
    });
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit()')

    const initialState = { lng: 5.127684, lat: 52.0809856, zoom: 10 };
    const apiKey = "mEcMYH4LeHvlyd1FeMwK";
    const style = 'streets'

    this.map = new Map({
      container: this.mapContainer()?.nativeElement,
      style: `https://api.maptiler.com/maps/${style}/style.json?key=${apiKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    this.map.on('load', async () => {
      // Add an image to use as a custom marker
      const image = await this.map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/osgeo-logo.png');
      this.map.addImage('custom-marker', image.data);

      this.geojseonservice.roadobject(this.map, this.roadobjectasgeojson)

      // this.geojseonservice.nationalpark(this.map)
      // this.geojseonservice.conferences(this.map)
    });



    // 
    // oude code waarmee door alle hardcoded data werd geloopd, en een popup kwam.
    //

    // // TS2339: Property 'coordinates' does not exist on type 'Geometry'. Property 'coordinates' does not exist on type 'GeometryCollection<Geometry>'.
    // this.data.forEach(element => {
    //   const popup = new Popup({ offset: 25 }).setText(`name: ${element.name}`);


    //   const el = document.createElement('div');
    //   el.id = `marker-${element.objectId}`;

    //   new Marker()
    //     .setLngLat(element.geometry?.coordinates)
    //     .setPopup(popup) // sets a popup on this marker
    //     .addTo(this.map);
    // });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
