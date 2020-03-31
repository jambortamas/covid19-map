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

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [19, 47],
            zoom: 5
            });

        window.setTimeout(() => {
            this.state.data.length != 0 &&
                this.state.data.map(country => {

                    const {deaths, confirmed, recovered} = country.stats
                    const activeCases = confirmed - deaths - recovered
                    const radius = `${Math.log(activeCases) * 10}px`
                    
                    let el = document.createElement('div')
                    
                    el.appendChild(document.createTextNode(activeCases))
                    
                    el.className = 'marker'
                    el.style.width = radius
                    el.style.height = radius

                    new mapboxgl.Marker(el)
                        .setLngLat([country.coordinates.longitude, country.coordinates.latitude])
                        .addTo(map);

                })
        }, 1000)

    }

    render() {
        const {data} = this.state 

        return (
            <div>
                <h1>SARS-Cov-2 active cases</h1>
                <div className="mapContainer" ref={el => this.mapContainer = el} style={{height: '100vh'}} />
            </div>
        )
    }
}

export default Covid