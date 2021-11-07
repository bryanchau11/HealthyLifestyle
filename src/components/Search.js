/* eslint-disable no-loop-func */
import { React, useStat } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import { Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

function Search() {
  const { searchMeal } = useParams();
  return <div>Hello {searchMeal}</div>;
}

export default Search;
