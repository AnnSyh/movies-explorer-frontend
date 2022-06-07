import React from 'react';
import './arrow-top.css';

function ArrowTop() {

  const arrowTop = document.querySelector('.arrow-top');

  function top(evt) {
    window.location.href = '#top';
  }

  // arrowTop.addEventListener('click', top);

  // window.addEventListener('scroll', function(evt) {

  //   if (window.scrollY > 200){
  //     arrowTop.classList.add('arrow-top__visible');
  //   } else {
  //     arrowTop.classList.remove('arrow-top__visible');
  //   }
  // });


  return (
    <>
      <a href='#top' className='arrow-top'></a>
    </>
  );
}

export default ArrowTop;