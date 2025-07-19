// backend/data.js

const listings = [
  {
    id: "1",
    title: "Beach Front Penthouse",
    location: "Cape Town",
    type: "Entire apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Swimming Pool"],
    rating: 5,
    reviews: 50,
    price: 2000,
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/129880751.jpg?k=222c12edfb8bd7834c03bdee12d47f3e0992f8bc0c8ae84476d35ca5a624583d&o=",
  },
  {
    id: "2",
    title: "Sandton SunCatcher",
    location: "Johannesburg",
    type: "Loft",
    guests: 2,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Wifi", "Swimming Pool"],
    rating: 4.8,
    reviews: 35,
    price: 1500,
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/513141495.jpg?k=795fa9993f6e9a4a2f02a1ed9a9ed48499bf50a7eddbfbb9f19aad0416563bbc&o=",
  },
 
];

module.exports = listings;
