
import { useState, useEffect } from 'react';

const BackgroundRotator = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const backgroundImages = [
    '/bg/182428240217.jpg',
    '/bg/5035365.jpg',
    '/bg/5590457.jpg',
    '/bg/6515645.jpg',
    '/bg/796169491973.jpg',
    '/bg/840843081452.jpg',
    '/bg/89787.jpg',
    '/bg/NEUMORPHIC_CIRCLES_BACKGROUND.jpg',
    '/bg/black-background-geometric-gradient-design.jpg',
    '/bg/flat-lay-workstation-with-copy-space-laptop.jpg',
    '/bg/top-view-agenda-glasses-pencil.jpg',
    '/bg/top-view-desk-dark-concept-with-copy-space.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
      
      {/* Very light overlay for text visibility only */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />
    </div>
  );
};

export default BackgroundRotator;
