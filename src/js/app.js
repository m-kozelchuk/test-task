// some code
import Swiper from 'swiper';

require('intersection-observer');


const header = document.querySelector('.js-header');
window.onscroll = function() {
  (window.pageYOffset > 25) ? header.classList.add('fixed') : header.classList.remove('fixed');
};

document.addEventListener("DOMContentLoaded", function() {
  new Swiper('.swiper-banner', {
    loop: true,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: false
    },
    autoplay: {
      delay: 5000
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
      }
    },
  });
  new Swiper('.swiper-portfolio', {
    loop: true,
    speed: 800,
    spaceBetween: 100,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + '</span>';
      }
    }
  });

  const target = document.querySelectorAll('.js-block-animate');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-animate');
      }
    });
  }, {
    threshold: 0.5
  });

  [...target].forEach(el => {
    observer.observe(el);
  });
});


function select() {
  let select = document.querySelectorAll('.js-select');
  Array.prototype.forEach.call(select, function(el){

    let tmp = document.createElement("div");
    tmp.classList.add('select');

    let placeholder = el.getAttribute('placeholder');
    let template = '<span class="select-trigger">' + placeholder + '</span>';
    template += '<div class="options">';
    let option = document.querySelectorAll('option');
    Array.prototype.forEach.call(option, function(el){
      template += '<span class="option ' + el.getAttribute('class') + '" data-value="' + el.getAttribute('value') + '">' + el.innerHTML + '</span>';
    });
    template += '</div>';

    let wrap = document.createElement('div');
    wrap.classList.add('select-wrap');
    el.before(wrap);
    wrap.appendChild(el);
    el.style.display = 'none';

    tmp.innerHTML = template;
    el.after(tmp);

    let trigger = el.closest('.select-wrap').querySelector('.select-trigger');
    trigger.addEventListener('click', function(event) {
      this.closest('.select').classList.toggle('opened');
      event.stopPropagation();
    });

    let options = document.querySelectorAll('.option');
    [...options].forEach(function(opt){
      opt.addEventListener('click', function() {
        let select  = this.closest('.select-wrap'),
          val = this.getAttribute('data-value');

        let selects = select.querySelector('select');
        [...selects].forEach(function(sl){
          sl;
        });

        let opts = select.querySelectorAll('option');
        [...opts].forEach(function(o){
          o.removeAttribute('selected');
        });
        select.querySelector(`option[value="${val}"]`).setAttribute('selected', 'selected');

        this.closest('.select').classList.remove('opened');
        this.closest('.select').classList.add('selected');
        this.closest('.select').querySelector('.select-trigger').textContent = this.textContent;

      });
    });

  });

  document.documentElement.addEventListener('click', function() {
    const selectNodes = document.querySelectorAll('.select');
    [...selectNodes].forEach(function(node){
      node.classList.remove('opened');
    });
  });

}
select();


function scroll(block, link) {

  function handleClick() {
    block.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  link.addEventListener('click', function(e) {
    e.preventDefault();
    handleClick();
  });

}
let main = document.getElementById("main");
let next = document.querySelector('.link_next');
scroll(main, next);


let contacts = document.getElementById("contacts");
let start = document.querySelector('.btn_start');
scroll(contacts, start);


function bgTextParallax() {

  let bgText = document.querySelectorAll('.bg-text');
  [...bgText].forEach(function(el){
    let yPos = window.pageYOffset / el.dataset.speed;
    let coords = yPos + '%';
    el.style.top = coords;
  });

}

window.addEventListener("scroll", function(){
  bgTextParallax();
});


function mobMenuBtn() {

  let menuBtn = document.querySelector('.js-menu-btn');
  menuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.toggle('is-open');
    header.querySelector('.menu').classList.toggle('is-open');
    event.stopPropagation();
  });

  document.documentElement.addEventListener('click', function() {
    menuBtn.classList.remove('is-open');
    header.querySelector('.menu').classList.remove('is-open');
  });

}
mobMenuBtn();




