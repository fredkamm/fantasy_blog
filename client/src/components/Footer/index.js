import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-primary p-4" style={{borderTop: '1px solid #ffff'}}>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-light text-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className='text-light'>
        Copyrights of Fred Kamm
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
