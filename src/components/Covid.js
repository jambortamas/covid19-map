import React from 'react'
import mapboxgl from 'mapbox-gl'

class Covid extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('https://corona.lmao.ninja/v2/jhucsse')
            .then(res => res.json())
            .then(datas => this.setState({data: datas}))

        mapboxgl.accessToken = 'pk.eyJ1IjoiamFtYm9ydGFtYXMiLCJhIjoiY2lobWY0ZTgwMDBnNXZrbTk4ZjRwYjA1YyJ9.HM0QHMBmEPzD9vc5KMd4IA'

        const map2 = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19, 47],
            zoom: 5
            });

        window.setTimeout(() => {
            this.state.data.length != 0 &&
                this.state.data.map(country => {

                    let cases = `${Math.log(country.stats.confirmed) * 10}px`
                    let recov = `${Math.log(country.stats.recovered) * 10}px`
                    let el = document.createElement('div')
                    let rec = el.appendChild(document.createElement('div'))
                    
                    rec.appendChild(document.createTextNode(`${country.stats.confirmed} | ${country.stats.recovered}`))
                    el.className = 'marker'
                    rec.className = 'submarker'
                    el.style.width = cases
                    el.style.height = cases
                    rec.style.width = recov
                    rec.style.height = recov

                    let marker = new mapboxgl.Marker(el)
                        .setLngLat([country.coordinates.longitude, country.coordinates.latitude])
                        .addTo(map2);

                })
        }, 1000)

    }

    render() {
        const {data} = this.state 

        return (
            <div>
                <div className="mapContainer" ref={el => this.mapContainer = el} style={{height: '100vh'}} />
            </div>
        )
    }
}

export default Covid