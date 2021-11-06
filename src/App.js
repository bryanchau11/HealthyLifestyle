import logo from './logo.svg';
import './App.css';

import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useScroll } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

function App() {
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
  const [style, set] = useSpring(() => ({
    transform: 'perspective(300px) rotateY(0deg)',
  }));

  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${event.scrolling ? event.delta[0] : 0}deg)`,
    });
  });

  return (
    <>
      <div id="randomMeal">
        <h1>Pick your category</h1>
        <div className="container" {...bind()}>
          {list.map((item) => (
            <Nav.Link as={Link} to={`/recipe/${item.food}`}>
              <animated.div
                key={item.food}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {item.food}
              </animated.div>
            </Nav.Link>
          ))}
        </div>
      </div>
      <div id="randomMeal">
        <h1>10 Random Meals</h1>
        <div className="container" {...bind()}>
          {list.map((item) => (
            <Nav.Link as={Link} to={`/recipe/${item.food}`}>
              <animated.div
                key={item.food}
                className="card"
                style={{
                  ...style,
                  backgroundImage: `url(${item.image})`,
                }}
              >
                {item.food}
              </animated.div>
            </Nav.Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
