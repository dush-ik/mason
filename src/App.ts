import './App.css';

const App = () => {
  const arrImage = ['archer1.jpg', 'blade1.jpg', 'castle1.jpg', 'coco1.jpg', 'coco2.jpg', 'corpse1.jpg',
  'ferdi1.jpg', 'future1.jpg', 'howls1.jpg', 'inhum1.jpg', 'isle1.jpg', 'isle2.jpg', 'kill1.jpg', 'metro1.jpg',
  'minion1.jpg', 'naus1.jpg', 'spirit1.jpg', 'up1.jpg'];

  let root = document.getElementById('root') as HTMLDivElement;

  const addImages = () => {
    // add wrapper class to root div.
    root.classList.add('wrapper');
    
    // Create fragment and append the images to it.
    const fragment = document.createDocumentFragment();
    for (let i = 0, n = arrImage.length;  i < n; i++) {
      const imgSrc =  require(`./static/images/${arrImage[i]}`);
      const image = document.createElement('img');
      image.src = imgSrc;
      image.alt = arrImage[i];
      fragment.appendChild(image);
    }

    root.appendChild(fragment);
  }

  const resizeLayout = (noOfCols: number, gap:number) => {
    let images = [...root.children];
    images.slice(noOfCols).forEach((current, index) => {
      const prevImageBottom = images[index].getBoundingClientRect().bottom;
      const currentImageTop = current.getBoundingClientRect().top;
      //@ts-ignore
      current.style.marginTop = `${prevImageBottom + gap - currentImageTop}px`
    })
  }

  const addFallBackForMasonary = () => {
    const computedStyles = getComputedStyle(root);
    const noOfCols = computedStyles.gridTemplateColumns.split(' ').length;
    if(computedStyles.gridTemplateRows !== 'masonry' && noOfCols > 1) {
      const gap = parseInt(computedStyles.gap);
      resizeLayout(noOfCols, gap);
    }
  }

  const initialize = () => {
    addImages();
    addEventListener('load', e => {		
      addFallBackForMasonary(); /* initial load */
      addEventListener('resize', addFallBackForMasonary, false)
    }, false);
  }

  return {
    initialize
  }
}

export default App;

