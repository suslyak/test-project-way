'use strict';
var ESC_KEY_CODE = 27;
var body = document.querySelector('body');
var header = document.querySelector('.page-header');
var navigation = header.querySelector('.page-header__navigation');
var menu = header.querySelector('.main-menu');
var sandwich = header.querySelector('.page-header__sandwich');
var toursSliderContainerElement = document.querySelector('.tours-taps__tours-list-container');
var toursSlider = toursSliderContainerElement.querySelector('.tours-taps__tours-list');
var toursSliderLinkElements = toursSlider.querySelectorAll('li > a');
var modalElement = document.querySelector('.buy-tour-popup');
var modalCloseElement = modalElement.querySelector('.buy-tour-popup__close');
var buttonToReturn;

header.classList.remove('page-header--no-js');
navigation.classList.remove('page-header__navigation--no-js');
menu.classList.remove('main-menu--no-js');

var showMobileMenu = function () {
  var menuLinksElements = menu.querySelectorAll('a[href]');

  sandwich.classList.add('page-header__sandwich--close');
  navigation.classList.add('page-header__navigation--show');
  body.classList.add('modal-open');

  menuLinksElements.forEach(function (link) {
    link.addEventListener('click', hideMobileMenu);
  });

  sandwich.removeEventListener('click', showMobileMenu);
  sandwich.addEventListener('click', hideMobileMenu);
};

var hideMobileMenu = function () {
  var menuLinksElements = menu.querySelectorAll('a[href]');

  sandwich.classList.remove('page-header__sandwich--close');
  navigation.classList.remove('page-header__navigation--show');
  body.classList.remove('modal-open');

  menuLinksElements.forEach(function (link) {
    link.removeEventListener('click', hideMobileMenu);
  });

  sandwich.removeEventListener('click', hideMobileMenu);
  sandwich.addEventListener('click', showMobileMenu);
};

sandwich.addEventListener('click', showMobileMenu);

var initModal = function () {
  if (modalElement) {
    modalElement.classList.add('buy-tour-popup--modal');

    var linksElements = document.querySelectorAll('a[href="#buy-tour"]');

    if (linksElements) {
      linksElements.forEach(function (link) {
        link.addEventListener('click', function (evt) {
          evt.preventDefault();
          buttonToReturn = evt.currentTarget;
          showPopup();
        });
      });
    }

    if (modalCloseElement) {
      modalCloseElement.addEventListener('click', closePopup);
    }
  }
};

var showPopup = function () {
  if (modalElement) {
    var firstFieldElement = modalElement.querySelectorAll('input')[0];

    modalElement.classList.add('buy-tour-popup--modal-show');
    body.classList.add('modal-open');

    window.addEventListener('keydown', escKeyHandler);

    if (firstFieldElement) {
      firstFieldElement.focus();
    }
  }
};

var closePopup = function () {
  modalElement.classList.remove('buy-tour-popup--modal-show');
  window.removeEventListener('keydown', escKeyHandler);
  body.classList.remove('modal-open');
  buttonToReturn.focus();
};

var keyHandler = function (event, key, action) {
  if (event.keyCode === key) {
    action();
  }
};

var escKeyHandler = function (event) {
  keyHandler(event, ESC_KEY_CODE, closeModalHandler);
};

var closeModalHandler = function () {
  closePopup();
};

var hideTours = function () {
  var toursElements = document.querySelectorAll('.tour');

  toursElements.forEach(function (tour) {
    tour.classList.remove('tour--show');
  });
};

var initTours = function () {
  var selectedLink = toursSlider.querySelector('.selected');

  if (selectedLink) {
    var tourId = selectedLink.getAttribute('href');

    hideTours();
    showTour(tourId);
  }
};

var showTour = function (objId) {
  var element = document.querySelector(objId);

  if (element) {
    hideTours();
    element.classList.add('tour--show');
  }
};

var switchTour = function (evt) {
  var obj = evt.currentTarget;
  var objId = obj.getAttribute('href');
  var selectedLinks = toursSlider.querySelectorAll('.selected');

  if (selectedLinks) {
    selectedLinks.forEach(function (link) {
      link.classList.remove('selected');
    });
  }

  obj.classList.add('selected');

  showTour(objId);
};

toursSliderLinkElements.forEach(function (element) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchTour(evt);
  });
});


initModal();
initTours();
