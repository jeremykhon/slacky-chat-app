import React from 'react';

const Gif = ({ gif }) => {
  return (
    <div className="gif">
      <img src={`https://media2.giphy.com/media/${gif.id}/200.gif`} alt={gif.slug} />
    </div>
  );
};

export default Gif;
