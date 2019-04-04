import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

import { MapContainer, MapHeader } from './mapStyles.js';
import map from "./map.json";


class MapChart extends Component {
  state = {
    cities: [],
    cityScale: {}
  }
  
  componentDidMount(){
    this.getCityData();
  }

  getCityData = () => {
    if(this.props.data.length){
      this.setState({
        cities: this.props.data.map(city => {
          return {
            name: city.city,
            coordinates: [Number(city.longitude), Number(city.latitude)],
            population: city.num 
          }
        }),
        cityScale: scaleLinear()
            .domain([0,this.props.range])
            .range([1,25])
      })
    }else{
      setTimeout(() => this.getCityData(), 1000)
    }
  }

  render() {
    return (
      <MapContainer>
        <MapHeader bottomBorder>
          <div>
            <h2>Locations</h2>
            <h3>based on clicks and impressions per city</h3>
          </div>
          <div>
            <h2 className="percentage">+50%<i className="fas fa-arrow-circle-up"/></h2>
          </div>
        </MapHeader>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography={map}>
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: ".2s"
                        },
                        hover: {
                          fill: "#0A88DC",
                          stroke: "#0B6FB2",
                          strokeWidth: 1.55,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#097AC6",
                          stroke: "#0A88DC",
                          strokeWidth: 0.75,
                          outline: "none",
                        }
                      }}
                    />
              ))}
            </Geographies>
            <Markers>
              {
                this.state.cities.map((city, i) => (
                  <Marker key={i} marker={city}>
                    <circle
                      cx={0}
                      cy={0}
                      r={this.state.cityScale(city.population)}
                      fill="rgba(255,87,34,0.8)"
                      stroke="#607D8B"
                      strokeWidth="2"
                    />
                  </Marker>
                ))
              }
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </MapContainer>
    )
  }
}

export default MapChart
