import React, { Component } from 'react'
import ArtBox from './artbox';
import { Link } from 'react-router-dom';
import './artwork_create.css'

export default class ArtworkCreate extends Component {
    constructor(props) {
      super(props);

      this.state = {
          title: "",
          description: "",
          price: "",
          newArtwork: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
  } 

  componentWillReceiveProps(nextProps) {
          this.setState({newArtwork: {
          title: nextProps.newArtwork.title,
          description: nextProps.newArtwork.description,
          price: nextProps.newArtwork.price
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let artwork = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    };

    this.props.createArtwork(artwork); 
    this.setState({
        title: "",
        description: "",
        price: ""
    })
  }

  update(field) { //double check
    return e => this.setState({
      [field]: e.currentTarget.value,
  })}

  render() {
  
    return (
      <>
      <div className="artwork__returnLink">
              <Link to='/'>
                Return back to user profile
              </Link>
      </div>
      <div className='artwork_component'>
            <div className="artwork__createComponent">
              <h2>Create a collectible</h2>
            </div>
        <div className="artwork__createComponentUploadOuterWrapper">
          <div className="artwork__createComponentUploadWrapper">
            <div className="artwork__createComponentUpload">
              <h3>Upload File</h3>
              <div className="artwork__createComponentUploadButton">
                <p> PNG, GIF, WEBP, MP4 or MP3. Max 100mb. </p>
                <button>Choose File</button>
              </div>
            </div>
              <form onSubmit={this.handleSubmit} >
                  <div className="artwork__createComponentSubmissionFields">
                    <div className="artwork__createComponentSubmissionTitle">
                      <p>Title</p>
                    </div>
                    <div className="artwork__createComponentSubmissionField">
                        <input type="text"
                            value={this.state.title}
                            onChange={this.update('title')}
                            placeholder="Write your Title..."
                        />
                      </div>
                      <div className="artwork__createComponentSubmissionDescription">
                        <p>Description</p>
                      </div>
                      <div className="artwork__createComponentSubmissionField">
                        <input type="textarea"
                            value={this.state.description}
                            onChange={this.update('description')}
                            placeholder="Write your Description..."
                        />
                      </div>
                      <div className="artwork__createComponentSubmissionPrice">
                        <p>Price</p>
                      </div>
                      <div className="artwork__createComponentSubmissionField">
                        <input type="number"
                            value={this.state.price}
                            onChange={this.update('price')}
                            placeholder="Insert Price..."
                        />
                      </div>
                      <div className="artwork__createComponentSubmissionButton">
                        <input type="submit" value="Create Item" />
                      </div>
                  </div>
              </form>
              <br />
            </div>
            <div className="artwork__previewComponent">
              <h3>Preview</h3>
              <div className="artwork__previewComponentText">
                <p>Upload file or preview your brand new NFT</p>
              </div>
            </div>
          </div>
        </div>
        <ArtBox artwork={ this.state.newArtwork }/>
      </>
    )
  }
}
