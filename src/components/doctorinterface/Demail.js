import React, { useState } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import { toast } from 'react-toastify';

export default function Demail() {
  const [formData, setFormData] = useState({
    receptionists: '',
    Subject: '',
    emailMessage: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlemail = (e) => {
    e.preventDefault();

    if (formData.receptionists === '' || formData.Subject === '' || formData.emailMessage === '') {
      toast.error("Please fill in all the fields.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    axios
      .post('http://localhost/HealerZ/PHP/doctor/sendmail.php', formData)
      .then((response) => {
        console.log('Data sent successfully!', response.data);
        console.log(formData);
        setFormData({
          receptionists: '',
          Subject: '',
          emailMessage: '',
        });
        setIsLoading(false); // Set loading state to false on success
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(formData);
        console.error('Error adding data:', error);
        toast.error('Error');
        setIsLoading(false); // Set loading state to false on error
      });
  };

  return (
    <>
      <form onSubmit={handlemail}>
        <div className='p-2'>
          <div className='d-flex align-items-center mb-2'>
            <h5 className='ms-0 m-2'>Email</h5>
            <div className='d-flex align-items-center'>
              <div className='input-group-text bg-gray border-0 rounded-pill'>
                <input
                  type='text'
                  className='form-control rounded-pill border-0 bg-gray'
                  placeholder='Receptionists'
                  id='receptionists'
                  name='receptionists'
                  value={formData.receptionists}
                  onChange={handleChange}
                />
                <FeatherIcon icon='at-sign' className='mx-2 text-muted icon-btn' />
              </div>
            </div>
          </div>
          <div className='p-2 border rounded'>
            <input
              type='text'
              className='form-control no-focus-style border-0'
              placeholder='Subject'
              id='subject'
              name='Subject'
              value={formData.Subject}
              onChange={handleChange}
            />
            <hr className='my-1' />
            <div className='form-floating'>
              <textarea
                className='form-control border-0'
                placeholder='Leave a comment here'
                id='emailMessage'
                name='emailMessage'
                style={{ height: '100px' }}
                value={formData.emailMessage}
                onChange={handleChange}
              ></textarea>
              <label htmlFor='floatingTextarea2'>Type your message...</label>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center m-2'>
          <p className='m-0'>DR.V.K.Pradishan MBBS</p>
          <button className='btn w-25 text-white shadow btn-gr' type='submit' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'} {/* Show loading message or 'Send' */}
          </button>
        </div>
      </form>
    </>
  );
}
