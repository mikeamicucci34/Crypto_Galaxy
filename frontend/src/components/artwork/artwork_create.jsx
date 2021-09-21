import React, { Component } from 'react'
// import ArtBox from './artbox';

export default class ArtworkCreate extends Component {
    constructor(props) {
      super(props);

      this.state = {
          title: "",
          // description: "",
          // price: "",
          // newArtwork: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
  } 

  // componentDidUpdate(nextProps) {
      
  //     this.setState({newArtwork: nextProps.newArtwork.title,
  //   });
  // }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    let artwork = {
      title: this.state.title,
      // description: this.state.description,
      // price: this.state.price
    };

    this.props.createArtwork(artwork); 
    this.setState({
        title: "",
        // description: "",
        // price: ""

    })
  }

  update(field) { //double check
    return e => this.setState({
      [field]: e.currentTarget.value,
  })}

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text"
                        value={this.state.title}
                        onChange={this.update('title')}
                        placeholder="Write your Title..."
                    />
                    {/* <input type="textarea"
                        value={this.state.description}
                        onChange={this.update('description')}
                        placeholder="Write your Description..."
                    /> */}
                    {/* <input type="number"
                        value={this.state.price}
                        onChange={this.update('price')}
                        placeholder="Insert Price..."
                    /> */}
                    <input type="submit" value="Submit" />
                </div>
            </form>
            <br />
            {/* <ArtBox props={this.state.newArtwork}/> */}
        </div>
    )
  }
}
