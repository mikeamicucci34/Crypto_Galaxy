import React from 'react';
import './main_page.css'
import {Link} from 'react-router-dom'
import GLOBE from 'vanta/dist/vanta.globe.min'
import NavBar from '../nav/navbar_container'


class MainPage extends React.Component {

    constructor(){
        super()
        this.vantaRef = React.createRef()
    }

    componentDidMount() {
        this.vantaEffect = GLOBE({
          el: this.vantaRef.current
        })
      }

      componentWillUnmount() {
        if (this.vantaEffect) this.vantaEffect.destroy()
      }

    render() {
        return (
            <div className='animation' ref={this.vantaRef}>
            < NavBar />
            <div className="wholePage">
                    <div className="landing-page">
                    <h1>For Creators By Creators</h1>
                    <h2>A one stop shop for sharing upcoming NFT releases and connecting with your favorite artists</h2>
                    <Link className="all-art-link" to="/artworks">
                    <button className="all-art">
                        View all artworks
                    </button>
                    </Link>
                    </div>
                    
            </div>
            </div>
        );
    }
}

export default MainPage;