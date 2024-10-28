export const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

export const mockInitialState = {
  bun: null,
  ingredients: []
};

export const notEmptyState = {
  bun: {
    id: '643d69a5c3f7b9001cfa093c',
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },

  ingredients: [
    {
      id: '643d69a5c3f7b9001cfa0941',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      id: '643d69a5c3f7b9001cfa093e',
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ]
};

export const mockFeed = {
  success: true,
  orders: [
    {
      _id: '6715ac3fd829be001c77760f',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-21T01:19:59.686Z',
      updatedAt: '2024-10-21T01:20:00.608Z',
      number: 57043
    },
    {
      _id: '67158230d829be001c7775ea',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0940'],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-10-20T22:20:32.084Z',
      updatedAt: '2024-10-20T22:20:32.919Z',
      number: 57042
    }
  ],
  total: 56669,
  totalToday: 104
};

export const mockOrder = {
  success: true,
  orders: [
    {
      _id: '6715ac3fd829be001c77760f',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      owner: '658b0f2887899c001b8259e2',
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-21T01:19:59.686Z',
      updatedAt: '2024-10-21T01:20:00.608Z',
      number: 57043,
      __v: 0
    }
  ]
};

export const ordersMockData = [
  {
    _id: '6715ac3fd829be001c77760f',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
    owner: '658b0f2887899c001b8259e2',
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-10-21T01:19:59.686Z',
    updatedAt: '2024-10-21T01:20:00.608Z',
    number: 57043,
    __v: 0
  }
];

export const userMockData = {
  email: 'one@two.com',
  name: 'Sam sam'
};

export const registerMockData = {
  email: 'one@two.com',
  name: 'Sam sam',
  password: '123456'
};

export const loginMockData = {
  email: 'one@two.com',
  password: '123456'
};
