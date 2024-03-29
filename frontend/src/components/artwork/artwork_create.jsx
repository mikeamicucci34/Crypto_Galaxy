import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import './artwork_create.css'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

export default class ArtworkCreate extends Component {
    constructor(props) {
      super(props);

      this.state = this.props.artwork
      this.error = null

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
  // jhdjwhjhejhje

  handleSubmit(e) {
    e.preventDefault();
    
    // let artwork = {
    //   // title: this.state.title,
    //   // description: this.state.description,
    //   // price: this.state.price,
    //   // how to send image in post request, not a string
    //   // artworkImage: this.state.artworkImage
    // };

    

    
  
    if (this.props.formType === 'Create Artwork'){
      let artwork = new FormData()
      artwork.append('title', this.state.title)
      artwork.append('description', this.state.description)
      artwork.append('price', this.state.price)
      artwork.append('user', this.state.user)
      if (this.state.artworkImage){
        artwork.append('artworkImage', this.state.artworkImage[0])
      } 
      artwork.append('date', this.state.date)
      this.props.submitArtwork(artwork).then(() => this.props.history.push(`/artworks`), err => {
        this.handleErrors()
      });

    }else{
      let artwork = {}
      artwork = {
          id: this.state._id,
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
          user: this.state.user,
          artworktImage: this.state.artworkImage,
          date: this.state.date
      }
      this.props.submitArtwork(artwork).then((res) => this.props.history.push(`/artworks`), err => {
        this.handleErrors()
      });

    }
        
    this.setState({
        title: "",
        description: "",
        price: "",
        user: this.props.userId,
        artworkImage: null,
        file: null
    })
  }

  handleErrors(){
    this.error = <p className="errors">Something went wrong, please make sure to fill all fields!</p>
    this.forceUpdate()
  }
  

  update(field) { //double check
    return e => {
      this.setState({
      [field]: e.target.value,
  })}}

  updateDate(e) {
    this.setState({
      date: `${e.year}-${e.month}-${e.day}`,
  })
  }


  render() {



    const renderCustomInput = ({ ref }) => (
      <input
        readOnly
        ref={ref} // necessary
        placeholder={this.state.date}
        style={{
          textAlign: 'center',
          padding: '10px',
          fontSize: '12px',
          border: '1px solid #9c88ff',
          borderRadius: '25px',
          color: 'rgb(35,21,60)',
          outline: 'none',
        }}
        className="my-custom-input-class" 
      />
    )

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
                    <div className="artwork__createComponentSubmissionField"
                          style={{
                            border: 'none'
                          }}
                    >
                      < DatePicker
                        onChange={(e)=>this.updateDate(e)}
                        placeholder="Insert Date..."
                        renderInput={renderCustomInput}
                        className="date-picker"
                      />
                    </div>
                      <div className="artwork__createComponentSubmissionButton">
                        <input type="submit" value={this.props.formType} />
                      </div>
                  </div>
              </form>
              <br />
              {this.error}
            </div>
            <div className="artwork__previewComponent">
              <h3>Artwork Preview</h3>
              <div className="artwork__previewComponentText">
                {(this.state.file) ? <img src={this.state.file} alt="" />
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
