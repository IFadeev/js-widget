App.setText = (function (global) {
  var App = {};

  App.version = '0.1.0';

  App.ready = function (fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      fn();
    } else if (global.addEventListener) {
      global.addEventListener('load', fn, false);
    } else if (global.attachEvent) {
      global.attachEvent('onload', fn);
    } else {
      var old = global.onload;
      global.onload = function () {
        if (typeof old === 'function') {
          old();
        }
        fn();
      };
    }
  };

  App.log = function (msg) {
    if (global.console && console.log) {
      console.log('[App]', msg);
    }
  };

  App.setText = function (id, text) {
    var el = document.getElementById(id);
    if (el) {
      if (typeof el.textContent !== 'undefined') {
        el.textContent = text;
      } else {
        el.innerText = text;
      }
    }
  };

  global.App = App;
})(this);

App.ajaxGet = function (url, callback) {
  var xhr;

  if (global.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
      App.log('XHR not supported');
      return;
    }
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        App.log('Request failed: ' + xhr.status);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send(null);
};
