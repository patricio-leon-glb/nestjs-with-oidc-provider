export interface Account {
  id: number;
  accountId: string;
  profile: {
    address: {
      country: string;
      formatted: string;
      locality: string;
      postal_code: string;
      region: string;
      street_address: string;
    };
    birthdate: Date;
    email: string;
    password: string;
    email_verified: false;
    family_name: string;
    gender: string;
    given_name: string;
    locale: string;
    middle_name: string;
    name: string;
    nickname: string;
    phone_number: string;
    phone_number_verified: false;
    picture: string;
    preferred_username: string;
    profile: string;
    updated_at: Date;
    website: string;
    zoneinfo: string;
  };
}

export const AccountList: Array<Account> = [
  {
    id: 1,
    accountId: '1',
    profile: {
      address: {
        country: '000',
        formatted: '000',
        locality: '000',
        postal_code: '000',
        region: '000',
        street_address: '000',
      },
      birthdate: new Date('1987-10-16'),
      email: 'patricio.leon@globant.com',
      password: '123456',
      email_verified: false,
      family_name: 'Doe',
      gender: 'male',
      given_name: 'John',
      locale: 'en-US',
      middle_name: 'Middle',
      name: 'John Doe',
      nickname: 'Johny',
      phone_number: '+49 000 000000',
      phone_number_verified: false,
      picture: 'http://lorempixel.com/400/200/',
      preferred_username: 'johnny',
      profile: 'https://johnswebsite.com',
      updated_at: new Date(),
      website: 'http://example.com',
      zoneinfo: 'Europe/Berlin',
    },
  },
  {
    id: 2,
    accountId: '2',
    profile: {
      address: {
        country: '000',
        formatted: '000',
        locality: '000',
        postal_code: '000',
        region: '000',
        street_address: '000',
      },
      birthdate: new Date('1987-10-16'),
      email: 'patricioleonm@gmail.com',
      password: '123456',
      email_verified: false,
      family_name: 'Doe',
      gender: 'male',
      given_name: 'John',
      locale: 'en-US',
      middle_name: 'Middle',
      name: 'John Doe',
      nickname: 'Johny',
      phone_number: '+49 000 000000',
      phone_number_verified: false,
      picture: 'http://lorempixel.com/400/200/',
      preferred_username: 'johnny',
      profile: 'https://johnswebsite.com',
      updated_at: new Date(),
      website: 'http://example.com',
      zoneinfo: 'Europe/Berlin',
    },
  },
];
