import PropTypes from 'prop-types';

const Card = ({ cardData, onCardClick }) => {

  return (
    <div onClick={() => onCardClick(cardData.code)}>
      {cardData && (
        <>
          <img
            src={cardData.image}
            alt={cardData.value + ' of ' + cardData.suit}
          />
          <p>{cardData.value} of {cardData.suit}</p>
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  cardData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
};


export default Card;