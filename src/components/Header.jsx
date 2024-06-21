import React from 'react';
import PropTypes from 'prop-types'; 

function Header({ highScore, currentScore }) {
  return (
    <div className="headerDiv">
      <div className="leftHeader">
        {/* ... */}
      </div>
      <div className="rightHeader">
        <p>High Score: {highScore}</p>
        <p>Current Score: {currentScore}</p>
      </div>
    </div>
  );
}

// Prop Type Validation
Header.propTypes = {
  highScore: PropTypes.number.isRequired,
  currentScore: PropTypes.number.isRequired,
};

export default Header;
