var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    autoplay:{
        delay: 4000,
        disableOnInteraction: false
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });