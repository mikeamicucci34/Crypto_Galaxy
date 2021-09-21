import React from 'react'
import './artbox.css'
import { motion } from "framer-motion"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function Artbox(props) {
    
    return (
        <motion.div 
            className="art-card"
            whileHover={{ scale: 1.1 }}
            >
             <div className="nft"></div>
             <div>
             <h3>{props.title}</h3>
             </div>
             <h3>{props.description}</h3>
             <h3>{props.price}</h3>
        </motion.div>
    )
}




