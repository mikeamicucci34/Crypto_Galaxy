# README

<p align="center">
  <img src="https://github.com/mikeamicucci34/Crypto_Galaxy/blob/main/frontend/src/assets/clogo.png" />
</p>

#### [Crypto Galaxy](https://cryptogalaxy.herokuapp.com/#/) is a social platform that allows NFT artist to showcase some of their upcoming work and receive feedback from their following.



<p align="center">
  <img src="https://github.com/mikeamicucci34/Crypto_Galaxy/blob/main/frontend/src/assets/production%20ReadME%20Gif/homepage2.gif" />
</p>


<p align="center">
  <img src="https://github.com/mikeamicucci34/Crypto_Galaxy/blob/main/frontend/src/assets/production%20ReadME%20Gif/index%20page.gif" />
</p>

## Installation instructions
 * Clone this repo `git clone https://github.com/mikeamicucci34`
 * Install NPM packages on the main directory  `npm install`
 * Install NPM packages inside the frontend directory  `npm install`
 * Run `npm run dev`

## Technologies used
 * NodeJs and express for the backend
 * MongoDB for database
 * AWS
 * Multer-s3 to connect our app to AWS
 * Axios
 * React-Redux for frontend
 * react-modern-calendar-datepicker
 * VantaJS
 * Framer Motion
 * Coingecko-api

## Features
 * Create a personal account 
 * Log in using our demo user 
 * Post an upcoming artwork
 * Leave a comment on artwork
 * Leave a like on artwork
 * See Art suggested price in dollars and ether

## Code Snippets
   #### Hot Value:
 
  If an artwork is liked, an artwork will have an associated hot value. This hot value is calculated upon rerender and takes into account how recent each like on     the artwork is relative to current time, as well as how many likes there are on the artwork. If an artwork has a large amount of likes or a number of likes that     are recent, an associated fire symbol will appear above the artwork. In our case, the hot value (the hot variable) must be above 1 for the the fire symbol to appear.
    
   ```javascript
    if(this.props.likes){
        for(let i=0;i<this.props.likes.length;i++){
          if (this.props.likes[i].artworkId === artworkId){
            if (this.props.likes[i].userId === this.props.userId){
                liked = 'liked';
            }
            let dateVal = new Date(this.props.likes[i].createdAt)
            let today = new Date();
            hot += (1/(today - dateVal))*1000000;
            count+=1;
          }
        }
    }
   ```

## found a 🐛 ?

 Feel free to file a new issue with a respective title and description on Crypto Galaxy's repository.

