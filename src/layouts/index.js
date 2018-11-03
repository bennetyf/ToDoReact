import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className="container-fluid">
      <div className='row' style={{marginTop: '10rem'}}>
        <div className="col-8" style={{margin: `auto`}}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
