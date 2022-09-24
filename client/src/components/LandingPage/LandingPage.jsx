import React from 'react';
import {Link} from 'react-router-dom';
import landing_video from '../video/landing_video.mp4'
import { cleanFilter } from '../../redux/actions';
import Styles from './LandingPage.module.css'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';

export default function LandingPage(){
    
    const dispatch = useDispatch()

    // function homeButtom(){
    //     dispatch(cleanFilter())
    // }
    
    useEffect( () =>{
        return () =>{
          dispatch(cleanFilter())  
        }
    })

    return(
        <div className={Styles.bgImage}> 
            <div className='container'>
                
                <Link to='/home'>
                    
                {/* onClick={ () => homeButtom()} */}
                        <video  loop autoPlay muted className={Styles.video} >
                        
                        <source src={landing_video} type='video/mp4'/>
                        </video>

                   

                    
                </Link>
                
            
            </div> 

                    {/* <h1>Welcome to my Web</h1> 
                    <button>Home</button> */}

            

        </div>
    )
}
