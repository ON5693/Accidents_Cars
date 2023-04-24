import { start } from '../src/server';
let server;
let MOCK_USER_ID;

const MOCK_VEHICLE_CREATE = {
    name: "Bentley Continental",
    year: "2019",
    plate: "ABC1234",
    brand: "Bentley",
    chassis: "622776020191",
};

const MOCK_VEHICLE_INVOLVED = {
    name: "City",
    year: "1995",
    brand: "Honda",
    plate: "abc51de",
    chassis: "555555"
};

const MOCK_ACCIDENT_CREATE = {
    customerDocument: "77253635051",
    customerVehiculePlate: "ABC1234",
    policeReport: "ASVC1234567VVVD365",
    user_id: 1,
};

describe('Accident test suit', () => {
  beforeAll(async () => {
    server = await start();
    
    const user = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        firstName: "Mock",
        lastName: "User",
        email: "a@a.com",
        document: "12345678911",
        driverLicense: "1234abc57d",
        password: "a"
      }
    });
    
    const userPayload = JSON.parse(user.payload);
    MOCK_USER_ID = userPayload.id
  }, 30000);
  
  afterAll(async () => {
    await server.stop();
  });
  
  it('Creates a vehicle with the document for user', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/vehicles',
      payload: {
        ...MOCK_VEHICLE_CREATE,
        userId: MOCK_USER_ID,
      }
    });
    
    expect(result.statusCode).toStrictEqual(200);
  });
  
  it('Create an accident with vehicle and document and users', async () => {
    const result = await server.inject({
      method: 'POST',
      url: '/accident',
      payload: {
        ...MOCK_ACCIDENT_CREATE,
        third: MOCK_USER_ID,
        vehiculesInvolved: MOCK_VEHICLE_INVOLVED,
      }
    });
    
    expect(result.statusCode).toStrictEqual(200);
  });
})