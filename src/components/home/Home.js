import React from 'react';
import Hnav from './Hnav';
import Hfooter from './Hfooter';

export default function Home() {
  return (
    <div>
       <div className='navigationH'>
         <Hnav/>
        </div>

        

        <div  className="Hfooter bottom">
        <Hfooter/>
        </div>
    </div>
  )
}
