new Splide('#splide1', {
      type: 'slide',
      perPage: 7,
      perMove: 1,
      pagination: false,

      breakpoints: {
        2200: {
          perPage: 6,
        },
        1700: {
          perPage: 5,
        },
        1400: {
          perPage: 5,
        },
        1200: {
          perPage: 4,
        },
        700: {
          perPage: 3,
        },
        450: {
          perPage: 2,
        },
      },
    }).mount();


    new Splide('#splide2', {
      type: 'slide',
      perPage: 7,
      perMove: 1,
      pagination: false,

      breakpoints: {
        2200: {
          perPage: 6,
        },
        1700: {
          perPage: 5,
        },
        1400: {
          perPage: 5,
        },
        1200: {
          perPage: 4,
        },
        700: {
          perPage: 3,
        },
        450: {
          perPage: 2,
        },
      },
    }).mount();