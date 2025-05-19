import React from 'react';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import girl from '../../../assets/girl.jpeg';

const AuthLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row p-0" style={{ height: '100vh' }}>
      
      {/* Sidebar / Image section */}
      <div className="w-100 w-md-50 h-100">
        <img
          src={girl}
          alt="Sidebar visual"
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Main content area */}
      <main className="w-100 w-md-50 d-flex align-items-center justify-content-center p-4 bg-light">
        <div className="w-100" style={{ maxWidth: '100%' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
