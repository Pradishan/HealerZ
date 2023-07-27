import React,{useState} from 'react';
import Status from './algorithms/Status';
import MedRequestModal from './utilites/MedRequestModal';

export default function Notifiaction(props) {
    const { key,name, id, src, status } = props;
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div key={key} type ="button" className='icon-hover rounded p-2 d-flex align-items-center justify-content-between m-3 my-2' onClick={toggleModal}>
                <div className='d-flex align-items-center' >
                    {/* profile */}
                    <img src={src} alt='avatar' className='rounded' width='48px' height='48px' />
                    <div className='ms-2'>
                        <h5 className='mb-0'>{name}</h5>
                        <p className='text-muted m-0'>{id}</p>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                   {/* Status */}
                   <Status primary={'Waiting'} success={'Selected'} danger={'Rejected'} status={status} />
                </div>
            </div>
                <MedRequestModal show={showModal} onHide={toggleModal} data={props} />
            
        </>
    )
}
