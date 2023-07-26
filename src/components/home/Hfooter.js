import React from'react';
import logo from '../../assets/logo.png';



export default function Hfooter(){
    return (
        <footer bgColor='light' className='text-center text-lg-left'>
          <div className='text-center p-3' style={{ backgroundColor: '#fff' }}>
          <a className='text-dark' href='https://HealerZ.com/'>
          <img src={logo} alt="HealerZ" height='30px' />
           </a>
            &copy; {new Date().getFullYear()} Copyright. All rights reserved.{' '}
            
          </div>
        </footer>
      )
}