// console.log("js has been loaded");

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contentDiv = document.getElementById('content');

// "event name", callback function
menuBtn.addEventListener('click', () => {
  //   console.log("clicked!");
  mobileMenu.classList.add('active');
});

// eslint-disable-next-line no-undef
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});
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

  contentDiv.appendChild(sectionElement);
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
      displayCategory(category, properties);
    });
  })
  .catch((error) => {
    console.error('There was a problem fetching the data:', error);
  });
