'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Calculator = {
//     render(){
//         return (
//             <div>
//                 <h1>Test</h1>
//             </div>
//         )
//     }
// };
var calculator = _react2.default.createElement(
  'h1',
  null,
  'Hello'
);

_reactDom2.default.render(calculator, document.getElementById('app'));
