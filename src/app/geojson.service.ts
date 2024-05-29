import { Injectable } from "@angular/core";
import { GeoJSON } from 'geojson';
import { Map } from "maplibre-gl";
import { MapelibreService } from "./mapelibre.service";

@Injectable({
  providedIn: "root"
})
export class GeojsonService {

  constructor(private readonly maplibreservice: MapelibreService) { }

  roadobject(map: Map, geojson: GeoJSON) {
    map.addSource("roadobject", {
      "type": "geojson",
      "data": geojson
    });

    // Add a symbol layer
    map.addLayer({
      "id": "roadobject",
      "type": "symbol",
      "source": "roadobject",
      "layout": {
        "icon-image": "custom-marker",
        "text-field": ["get", "hectometer"],
        "text-font": [
          "Open Sans Semibold",
          "Arial Unicode MS Bold"
        ],
        "text-offset": [0, 1.25],
        "text-anchor": "top"
      }
    });
  }

  nationalpark(map: Map) {
    map.addSource('maine', {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98],
              [-70.11617, 43.68405],
              [-70.64573401557249, 43.090083319667144],
              [-70.75102474636725, 43.08003225358635],
              [-70.79761105007827, 43.21973948828747],
              [-70.98176001655037, 43.36789581966826],
              [-70.94416541205806, 43.46633942318431],
              [-71.08482, 45.3052400000002],
              [-70.6600225491012, 45.46022288673396],
              [-70.30495378282376, 45.914794623389355],
              [-70.00014034695016, 46.69317088478567],
              [-69.23708614772835, 47.44777598732787],
              [-68.90478084987546, 47.184794623394396],
              [-68.23430497910454, 47.35462921812177],
              [-67.79035274928509, 47.066248887716995],
              [-67.79141211614706, 45.702585354182816],
              [-67.13734351262877, 45.137451890638886]
            ]
          ]
        },
        "properties": {}
      }
    });

    map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': 'maine',
      'layout': {},
      'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    });
  }

  conferences(map: Map) {
    // Add a GeoJSON source with 15 points
    map.addSource("conferences", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [100.4933, 13.7551]
            },
            "properties": { "year": "2004" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [6.6523, 46.5535]
            },
            "properties": { "year": "2006" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-123.3596, 48.4268]
            },
            "properties": { "year": "2007" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [18.4264, -33.9224]
            },
            "properties": { "year": "2008" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [151.195, -33.8552]
            },
            "properties": { "year": "2009" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [2.1404, 41.3925]
            },
            "properties": { "year": "2010" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-104.8548, 39.7644]
            },
            "properties": { "year": "2011" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-1.1665, 52.9539]
            },
            "properties": { "year": "2013" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-122.6544, 45.5428]
            },
            "properties": { "year": "2014" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [126.974, 37.5651]
            },
            "properties": { "year": "2015" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [7.1112, 50.7255]
            },
            "properties": { "year": "2016" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-71.0314, 42.3539]
            },
            "properties": { "year": "2017" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [39.2794, -6.8173]
            },
            "properties": { "year": "2018" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [26.0961, 44.4379]
            },
            "properties": { "year": "2019" }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-114.0879, 51.0279]
            },
            "properties": { "year": "2020" }
          }
        ]
      }
    });

    // Add a symbol layer
    map.addLayer({
      "id": "conferences",
      "type": "symbol",
      "source": "conferences",
      "layout": {
        "icon-image": "custom-marker",
        // get the year from the source"s "year" property
        "text-field": ["get", "year"],
        "text-font": [
          "Open Sans Semibold",
          "Arial Unicode MS Bold"
        ],
        "text-offset": [0, 1.25],
        "text-anchor": "top"
      }
    });
  }
}
