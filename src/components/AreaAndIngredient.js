/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useParams } from 'react-router';

function AreaAndIngredient() {
  const { result } = useParams();
  return <div>{result}</div>;
}
export default AreaAndIngredient;
