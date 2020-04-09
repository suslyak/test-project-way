var body = document.querySelector("body");
var header=document.querySelector(".page-header");
var navigation = header.querySelector(".page-header__navigation");
var menu=header.querySelector(".main-menu");
var sandwich=header.querySelector(".page-header__sandwich");

header.classList.remove('page-header--no-js');
navigation.classList.remove('page-header__navigation--no-js');
menu.classList.remove('main-menu--no-js');

//sandwich.classList.remove('page-header__sandwich--no-js');

sandwich.addEventListener("click", function(evt) {
  sandwich.classList.toggle('page-header__sandwich--close');
  navigation.classList.toggle('page-header__navigation--show');
  body.classList.toggle('modal-open');
});


