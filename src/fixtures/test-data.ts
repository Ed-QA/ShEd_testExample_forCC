export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  dob: string;
};

export function uniqueUser(prefix = 'shed.qa'): TestUser {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstName: 'ShEd',
    lastName: 'QA',
    email: `${prefix}.${id}@example.com`,
    password: 'QaStrong!2026',
    address: 'Sarona Street',
    houseNumber: '1',
    city: 'Tel Aviv',
    state: 'Tel Aviv',
    country: 'Israel',
    postcode: '6100001',
    phone: '0501234567',
    dob: '1990-01-01'
  };
}

export const invalidUser = {
  email: 'not-an-email',
  password: '123'
};

export const paymentData = {
  creditCard: {
    cardNumber: '4111111111111111',
    expirationDate: '12/2030',
    cvv: '123',
    cardHolder: 'ShEd QA'
  },
  bankTransfer: {
    accountName: 'ShEd QA',
    accountNumber: '1234567890',
    bankName: 'QA Bank'
  },
  giftCard: {
    number: '1234567890123456',
    code: '1A2B'
  }
};
