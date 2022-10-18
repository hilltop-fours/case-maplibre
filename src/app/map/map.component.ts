import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapContainer')
  private mapContainer: ElementRef | undefined;
  private map: Map | null = null;

  public ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapContainer?.nativeElement,
      zoom: 10,
      center: [5.127684, 52.0809856],
      style: 'https://api.maptiler.com/maps/streets/style.json?key=mEcMYH4LeHvlyd1FeMwK'
    });
  }

}
