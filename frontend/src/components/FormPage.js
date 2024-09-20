
import React from 'react';
import { useParams,  } from 'react-router-dom';
import Form from './Form'; 


const FormPage = () => {
  const { fileName } = useParams(); 




 

  return (
    <div className="form-page">
      
      <Form fileName={fileName} />
      
    </div>
  );
};

export default FormPage;
