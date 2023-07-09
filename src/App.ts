import './App.css';

const App = () => {
  const arrImage = ['archer1.jpg', 'blade1.jpg', 'castle1.jpg', 'coco1.jpg', 'coco2.jpg', 'corpse1.jpg',
  'ferdi1.jpg', 'future1.jpg', 'howls1.jpg', 'inhum1.jpg', 'isle1.jpg', 'isle2.jpg', 'kill1.jpg', 'metro1.jpg',
  'minion1.jpg', 'naus1.jpg', 'spirit1.jpg', 'up1.jpg'];

  const root = document.getElementById('root') as HTMLDivElement;

  const wrapper = document.createElement('div');

  wrapper.classList.add('wrapper');

  root.appendChild(wrapper);

  const fragment = document.createDocumentFragment();
  for (let i = 0, n = arrImage.length;  i < n; i++) {
    const imgSrc =  require(`./static/images/${arrImage[i]}`);
    const image = document.createElement('img');
    image.src = imgSrc;
    image.alt = arrImage[i];
    fragment.appendChild(image);
  }

  wrapper.appendChild(fragment);
}

export default App;

