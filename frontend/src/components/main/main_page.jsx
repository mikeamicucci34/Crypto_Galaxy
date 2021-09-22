import React from 'react';
import './main_page.css'
import {Link} from 'react-router-dom'

class MainPage extends React.Component {

    render() {
        return (
            <div className="wholePage">
                    <div className="landing-page">
                    <h1>For Creators By Creators</h1>
                    <h2>A one stop shop for sharing upcoming NFT releases and connecting with your favorite artists</h2>
                    <Link className="all-art-link" to="/artworks">
                    <button className="all-art">
                        Viw all artowkrs
                        
                    </button>
                    </Link>
                    </div>
                    <div className="bottomRocks">
                    </div>
            </div>
        );
    }
}

export default MainPage;