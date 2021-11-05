import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { Button } from 'react-bootstrap';

function Category() {
  const { categoryName } = useParams();
  return (
    <div>
      <h1>Hello</h1>
      {categoryName}
    </div>
  );
}

export default Category;
