import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './artwork_create.css'

export default class ArtworkCreate extends Component {
    constructor(props) {
      super(props);

      this.state = this.props.artwork

      // this.state = {
      //   title: "",
      //   description: "",
      //   price: "",
      //   artworkImage: null,
      //   file: null
      // }

      this.handleSubmit = this.handleSubmit.bind(this);
      // this.handleImageUpload = this.handleImageUpload.bind(this)
  } 


  // componentWillReceiveProps(nextProps) {
  //         this.setState({newArtwork: {
  //         title: nextProps.newArtwork.title,
  //         description: nextProps.newArtwork.description,
  //         price: nextProps.newArtwork.price,
  //         artworkImage: nextProps.newArtwork.artworkImage
  //     }
  //   });
  // }

  handleSubmit(e) {
    e.preventDefault();
    
    // let artwork = {
    //   // title: this.state.title,
    //   // description: this.state.description,
    //   // price: this.state.price,
    //   // how to send image in post request, not a string
    //   // artworkImage: this.state.artworkImage
    // };

    

    
    let artwork = new FormData()
      artwork.append('title', this.state.title)
      artwork.append('description', this.state.description)
      artwork.append('price', this.state.price)
      artwork.append('user', this.state.user)
      artwork.append('artworkImage', this.state.artworkImage[0])
      this.props.submitArtwork(artwork).then(() => this.props.history.push(`/artworks`)); 
    
    // this.props.submitArtwork(artwork); 
    
    this.setState({
        title: "",
        description: "",
        price: "",
        user: this.props.userId,
        artworkImage: null,
        file: null
    })
  }

  update(field) { //double check
    return e => this.setState({
      [field]: e.currentTarget.value,
  })}

  // artworkChange(e) {
  //   if (e.target.files.length !== 0) {
  //     return (e) => this.setState({ artworkImage: e.target.files, file: URL.createObjectURL(e.target.files[0]) })
  //   }
  // }


  render() {

    return (
      <>
      <div className='artwork_component'>
            <div className="artwork__createComponent">
              <h2>{this.props.formType}</h2>
            </div>
        <div className="artwork__createComponentUploadOuterWrapper">
          <div className="artwork__createComponentUploadWrapper">
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <div className="artwork__createComponentUpload">
                  <h3>Upload File</h3>
                <div className="artwork__createComponentUploadButton">
                  <p> .image, .jpeg, .png, .gif Max 100mb. </p>
                  
                    <input type='file' name="artworkImage" 
                         onChange={(e) => this.setState({ artworkImage: e.target.files, file: URL.createObjectURL(e.target.files[0]) })} 
                        multiple={false}/> 
                </div>
              </div>
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
                        <input type="submit" value={this.props.formType} />
                      </div>
                  </div>
              </form>
              <br />
            </div>
            <div className="artwork__previewComponent">
              <h3>Artwork Preview</h3>
              <div className="artwork__previewComponentText">
                {(this.state.file) ? <img src={this.state.file} />
                  :
                 <p>Upload file to preview your artwork</p>
                }
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
}
