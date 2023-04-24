import { start } from '../src/server';
let server;
let MOCK_USER_ID;

const MOCK_USER_CREATE = {
  firstName: "Create",
  lastName: "User",
  email: "a@a.com",
	document: "12345678911",
	driverLicense: "1234abc57d",
	password: "a"
};

const MOCK_USER_VEHICLE = {
  id: 1,
  name: "Bentley Continental",
  year: "2019",
  plate: "ABC1234",
  brand: "Bentley",
  chassis: "622776020191",
  userId: MOCK_USER_ID
};

const MOCK_USER_PR = {
  id: 1,
  customerDocument: "12345678911",
  customerVehiculePlate: "ABC1234",
  policeReport: "ASVC1234567VVVD365",
  user_id: MOCK_USER_ID,
  vehiclesInvolved: [
    {
        name: "City",
        year: "1995",
        brand: "Honda",
        plate: "abc51de",
        chassis: "555555"
    }
  ]
};

const MOCK_USER_GET = {
  id: MOCK_USER_ID,
  firstName: "Create",
  lastName: "User",
  email: "a@a.com",
  document: "12345678911",
  driverLicense: "1234abc57d",
  vehicles: MOCK_USER_VEHICLE,
  police_report: MOCK_USER_PR
};

const MOCK_USER_UPDATE = {
  firstName: "Change",
  lastName: "User",
};


describe('Client test suit.', () => {
  beforeAll(async () => {
    server = await start();
  }, 30000);
  afterAll(async () => {
    await server.stop();
  });
  
  it('Creates a user client with the document', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/register',
      payload: { ...MOCK_USER_CREATE }
    });
    
    const payload = JSON.parse(result.payload);
    MOCK_USER_ID = payload.id;
    expect(result.statusCode).toStrictEqual(200);
  });
  
    
  it('Updates the user client', async () => {
    const result = await server.inject({
      method: 'PATCH',
      url: `/users/${MOCK_USER_ID}`,
      payload: MOCK_USER_UPDATE
    })
    
    expect(result.statusCode).toStrictEqual(200);
    expect(result.result.affected).toBe(1);
  });
  
  it('Get user client with vehicle and police report', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/account',
      payload: { ...MOCK_USER_GET }
    });
        
    expect(result.statusCode).toStrictEqual(200);
  });
});