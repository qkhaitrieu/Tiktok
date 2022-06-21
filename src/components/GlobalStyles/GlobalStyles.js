import './GlobalStyles.scss';
import PropTypes from 'prop-types';

function GlobalStyles({children}) {
    return children;
}
GlobalStyles.prototypes = {
    children :PropTypes.node.isRequired, // isRequired là luôn được truỳen
}
export default GlobalStyles;
