import React from 'react';
import FeatherIcon from 'feather-icons-react';
import logo from '../logo/logo.png';


export default function Dnav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow">
        <div className="container-fluid d-flex align-items-center">
          <a href='/' className='text-decoration-none color-gradident text-dark fs-4 nav-hover ms-5'>
            Home
          </a>
          <div className='d-flex align-items-center justify-content-center'>
            {/* logo */}
            <img src={logo} alt="HealerZ" height='48px' />
          </div>
          {/* right */}
          <div className='d-flex align-items-center me-3'>
            {/* notification */}
            <div className='position-relative me-2' type="button" data-bs-toggle="offcanvas" data-bs-target="#medicalNotification" aria-controls="offcanvasExample"><FeatherIcon icon="bell" className='icon-hover p-2 fs-1' height='38px' width='38px' />

              <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                99+
                <span class="visually-hidden">unread messages</span>
              </span>

            </div>
            {/* profile */}
            <div class="dropdown me-5">
              <div className='d-flex align-items-center icon-hover rounded p-2' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src='https://source.unsplash.com/random/1' alt="avatar" height='38px' width='38px' className='rounded-circle me-2' />
                <p className='mb-0 fs-5'>Pradishan</p>
              </div>

              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">
                  <div className='d-flex'>
                    <FeatherIcon icon="log-out" className='me-2' />
                    <p className='mb-0'>Logout</p>
                  </div>
                </a></li>
                <li><a class="dropdown-item" href="#">
                  <div className='d-flex'>
                    <FeatherIcon icon="settings" className='me-2' />
                    <p className='mb-0'>Settings</p>
                  </div>
                </a></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>

      {/* notificaton body */}

      <div class="offcanvas offcanvas-end" tabindex="-1" id="medicalNotification" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>

    </>
  );
}
