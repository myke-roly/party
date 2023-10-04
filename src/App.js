import React, { useRef, useState } from 'react';
import './App.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Main } from './pages/Main';
import { FaMusic } from 'react-icons/fa'
import { Info } from './pages/Info';
import { Detail } from './pages/Detail';
import YouTube from 'react-youtube';
import { Notes } from './pages/Notes';

function App() {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'E4w_5bY0tBY'; // Reemplaza con el ID del video de YouTube
  const playerRef = useRef(null);

  const opts = {
    playerVars: {
      autoplay: 1, // Desactiva la autoreproducción
      controls: 0, // Sin controles del reproductor de video
      loop: 1, // Repetición del video
      playlist: videoId, // Reproducir una sola vez el video
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <button onClick={togglePlay} className='absolute top-10 left-5 lg:left-10 p-5 z-10 bg-[#81938A88] rounded-full'>
        <FaMusic className={isPlaying ? 'animate-spin' : ''} size={18} color='#ffffff' />
      </button>
      <YouTube className='hidden' videoId={videoId} opts={opts} onReady={onReady} />
      <Carousel
        className="fullscreen-carousel bg-[#F9F7F2]"
        useKeyboardArrows
        verticalSwipe="natural"
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        showIndicators
        autoPlay
        transitionTime={800}
      >
        <Main />
        <Info />
        <Detail />
        <Notes />
      </Carousel>
    </div>
  );
}

export default App;
