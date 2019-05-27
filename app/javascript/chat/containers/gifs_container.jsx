import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gif from '../components/gif';

const GifsContainer = ({ gifs }) => {
  return (
    <div className="gifs-container">
      {gifs.map(gif => <Gif key={gif.id} gif={gif} />)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
  };
};

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     { fetchMessages, appendMessage },
//     dispatch,
//   );
// }

export default connect(mapStateToProps)(GifsContainer);
