// console.log("js has been loaded");

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
// "event name", callback function
menuBtn.addEventListener('click', () => {
  //   console.log("clicked!");
  mobileMenu.classList.add('active');
});

// eslint-disable-next-line no-undef
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});
// variables
// const roomName = 'Luxury King Room';
// const roomPrice = 300;
// const roomGuests = 2;
// const roomDescription =
//   'A beautiful room with a king size bed, a private bathroom,
// and a balcony with a view of the ocean';

// const room = [
//     name: 'Luxury King Room',
//     price: 300,
//     guests: 2,
//     description:  'A beautiful room with a king size bed, a private bathroom,
// and a balcony with a view of the ocean';
// ]

// array of objects

// roomsArr.forEach((room) => {
//     console.log(room.title);
//     const roomTitleEl = document.createElement('h3');
//     roomTitleEl.classList.add('room-title');
//     roomTitleEl.textContent
// });
// const rooms = [
//   {
//     name: 'Luxury King Room',
//     price: 300,
//     guests: 2,
//     description:
//       'A beautiful room with a king size bed, a private bathroom,
// and a balcony with a view of the ocean',
//   },
//   {
//     name: 'Luxury King Room',
//     price: 300,
//     guests: 2,
//     description:
//       'A beautiful room with a king size bed, a private bathroom,
// and a balcony with a view of the ocean',
//   },
//   {
//     name: 'Luxury King Room',
//     price: 300,
//     guests: 2,
//     description:
//       'A beautiful room with a king size bed, a private bathroom,
// and a balcony with a view of the ocean',
//   },
// ]; // end of rooms

// eslint-disable-next-line no-unused-vars
function renderProperties(properties) {
  properties.forEach((room) => {
    const roomArticle = document.createElement('article');
    roomArticle.classList.add('room');

    const roomNameElement = document.createElement('h3');
    roomNameElement.classList.add('room--name');
    roomNameElement.textContent = room.name;

    const roomDescriptionElement = document.createElement('p');
    roomDescriptionElement.classList.add('room--description');
    roomDescriptionElement.textContent = room.description;

    const roomPriceElement = document.createElement('p');
    roomPriceElement.textContent = `Price: ${room.price}`;

    const roomGuestsElement = document.createElement('p');
    roomGuestsElement.textContent = `Guests: ${room.guests}`;

    roomArticle.appendChild(roomNameElement);
    roomArticle.appendChild(roomDescriptionElement);
    roomArticle.appendChild(roomPriceElement);
    roomArticle.appendChild(roomGuestsElement);

    document.body.appendChild(roomArticle);
  }); // end of for each
} // end of render properties

// fetch('./js/properties.json')
//   .then((response) => response.json())
//   .then((data) => {
//     renderProperties(data);
//   });
const displayCategory = (category, properties) => {
  // console.log('displaying category');
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('category');

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = category.label.plural;

  sectionElement.appendChild(sectionTitle);
  // 1. filter properties
  // console.log(category.label.singular);
  // eslint-disable-next-line max-len
  const filteredProperties = properties.filter(
    (property) => property.type === category.label.singular
  );

  filteredProperties.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // eslint-disable-next-line no-console
  // console.log({ filteredProperties });
  filteredProperties.forEach((property) => {
    const articleElement = document.createElement('article');
    articleElement.classList.add('property');

    const propertyHTML = `
      <h3 class = 'property--title'>${property.name}</h3>
      <p class = 'property--description'>${property.description}</p>
      <p class = 'property--price'>${property.price}</p>
    `;

    articleElement.innerHTML = propertyHTML;

    sectionElement.appendChild(articleElement);
  }); // end of for each

  // 2. loop and render properties

  document.body.appendChild(sectionElement);
}; // end of display category

Promise.all([
  // fetch 1
  fetch('js/properties.json').then((response) => response.json()),
  // fetch 2
  fetch('js/categories.json').then((response) => response.json()),
])
  .then(([properties, categories]) => {
    //   console.log({ properties });
    //   console.log({ categories });
    // })
    categories.forEach((category) => {
      // eslint-disable-next-line no-use-before-define
      displayCategory(category, properties);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('There was a problem fetching the data:', error);
  });

// eslint-disable-next-line no-unused-vars
