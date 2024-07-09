import { useLocation, useNavigate } from 'react-router-dom';

import Button from "react-bootstrap/Button";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="main-footer">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <Button
            className="btn btn-light text-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <h4 className='text-light'>
        Copyrights of Fred Kamm
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
