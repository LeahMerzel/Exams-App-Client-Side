import React from 'react';

const DisplayImage = ({ imageUrl }) => {
  return (
    <div>
      				<img className="avatar_image m-3" draggable={false} width={'128px'} src={imageUrl} alt="Question"/>

    </div>
  );
};

export default DisplayImage;
