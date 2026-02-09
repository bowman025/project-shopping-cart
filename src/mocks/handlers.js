import { http, HttpResponse } from "msw";

export const handlers = [
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      { 
        id: 1, 
        title: 'Fake Keyboard', 
        price: 29.99, 
        image: 'kbd.jpg', 
      },
      { 
        id: 2, 
        title: 'Fake Mouse', 
        price: 9.99, 
        image: 'mouse.jpg', 
      },
    ]);
  }),
];