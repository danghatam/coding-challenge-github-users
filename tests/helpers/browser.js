'use strict';

import jsdom from 'jsdom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const DEFAULT_HTML = '<html><body></body></html>';
const {JSDOM} = jsdom;

const dom = new JSDOM(DEFAULT_HTML);

global.window = dom.window;
global.document = window.document;

global.navigator = window.navigator;

function mockStorage() {
    var storage = {};
    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return storage[key];
        },
        removeItem: function(key) {
            delete storage[key];
        },
				setObject: function(key, value) {
			      this.setItem(key, JSON.stringify(value));
			  },
				getObject: function(key) {
			      var value = this.getItem(key);
			      return value && JSON.parse(value);
			  },
        get length () {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

global['localStorage'] = mockStorage();

for (const key in global.window) {
	if (global.window.hasOwnProperty(key) && !(key in global))		{ global[key] = global.window[key]; }
}

function doNothing() {
  return null;
};

global.window.React = React;


global.window.__ENV__ = {
	DOMAIN: 'http://localhost'
};

