import React from 'react';

const DisplayImage = ({ imageUrl }) => {
  return (
    <div>
      				<img width={'128px'} src={imageUrl} alt="Question"/>

    </div>
  );
};

export default DisplayImage;
