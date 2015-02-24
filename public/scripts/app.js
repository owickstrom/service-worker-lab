'use strict';

function createElement(tag, classes, text) {
  var element = document.createElement(tag);
  if (typeof classes === 'string' && classes.length > 0) {
    classes.split(' ').forEach(function (c) {
      element.classList.add(c);
    });
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function shortTime(d) {
  function pad(n) {
    return (n > 9 ? '' : '0') + n;
  }
  return pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function renderTransfer(transfer, container) {
  var item = createElement('li', 'transfer', null);
  var heading = createElement('h2', null, null);

  var destination = createElement('span', 'destination', transfer.destination.replace(/,/g, ', '));
  heading.appendChild(destination);

  var departureTime = new Date(transfer.departure);
  var time = createElement('time', null, shortTime(departureTime));
  time.setAttribute('dateTime', departureTime);
  heading.appendChild(time);

  item.appendChild(heading);

  item.appendChild(createElement('p', 'type', transfer.type));
  item.appendChild(createElement('p', 'train', transfer.train));
  item.appendChild(createElement('p', 'track', 'Spår ' + transfer.track));

  container.appendChild(item);
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderTransfers(transfers, container) {
  removeChildren(container);

  var list = createElement('ul', 'transfers', null);
  transfers.forEach(function (transfer) {
    renderTransfer(transfer, list);
  });
  container.appendChild(list);
}

function renderSpinner(container) {
  removeChildren(container);
  var spinner = createElement('span', 'spinner', null);
  container.appendChild(spinner);
}

function renderError(e, container) {
  if (!container) {
    return;
  }
  removeChildren(container);
  container.appendChild(createElement('h1', null, 'Oops!'));
  container.appendChild(createElement('p', 'error', e.toString()));
}

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function(e) {
      reject(e);
    };

    // Make the request
    req.send();
  });
}

function getTransfers() {
  var main = document.querySelector('.main');
  renderSpinner(main);

  get('/departures').then(function (body) {
    var departures = JSON.parse(body);
    renderTransfers(departures.station.transfers.transfer, main);
  }).catch(function (e) {
    console.error(e.stack);
    renderError(e, main);
  });
}

getTransfers();

document.querySelector('.refresh').addEventListener('click', getTransfers);

