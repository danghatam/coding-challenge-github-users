"use strict";

var React = require('react');
var originalCreateElement = React.createElement;
var DivFactory = React.createFactory('div');

module.exports = function(sandbox) {
  return {
    stubChildren: function(stubbedComponents) {
      sandbox.stub(React, 'createElement', function(component, props) {
        if (stubbedComponents.indexOf(component) === -1) {
          return originalCreateElement.apply(React, arguments);
        } else {
          var componentFactory = React.createFactory(component);
          var displayName = componentFactory().type.displayName;

          if (displayName) {
            if (props.className) {
              props.className = props.className + " " + displayName;
            } else {
              props.className = displayName;
            }
          }

          return DivFactory(props);
        }
      });
    }
  };
};
