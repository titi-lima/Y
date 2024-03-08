import React, { useState } from 'react';

const CommentButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return isClicked ? (
    <input type="text" />
  ) : (
    <button onClick={handleClick}>Clique em mim</button>
  );
};

export default CommentButton;
