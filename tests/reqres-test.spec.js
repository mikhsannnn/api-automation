const { test, expect } = require('@playwright/test');
const { Ajv } = require("ajv");

const ajv = new Ajv(); 

test.describe('API Automation Tests', () => {
const baseURL = 'https://reqres.in/api'; 

  test('GET Request', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/2`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('GET Response:', responseBody);

    const valid = ajv.validate(require('./jsonschema/getschema.json'), responseBody)
    if (!valid){
        console.error("AJV Validation Errors : ", ajv.errorsText());
    }
    expect(valid).toBe(true);
  });

  test('POST Request', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'leader' };
    const response = await request.post(`${baseURL}/users`, { data: payload });
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('POST Response:', responseBody);
    const valid = ajv.validate(require('./jsonschema/postschema.json'), responseBody)
    if (!valid){
        console.error("AJV Validation Errors : ", ajv.errorsText());
    }
    expect(valid).toBe(true);
  });

  test('PUT Request', async ({ request }) => {
    const payload = { name: 'morpheus', job: 'zion resident' };
    const response = await request.put(`${baseURL}/users/2`, { data: payload });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('PUT Response:', responseBody);
    const valid = ajv.validate(require('./jsonschema/putschema.json'), responseBody)
    if (!valid){
        console.error("AJV Validation Errors : ", ajv.errorsText());
    }
    expect(valid).toBe(true);
  });

  test('DELETE Request', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`);
    expect(response.status()).toBe(204); // DELETE tidak ada content yang dihasilkan

    const mockResponse = { success: true };
    const valid = ajv.validate(require('./jsonschema/deleteschema.json'), mockResponse)
    if (!valid){
        console.error("AJV Validation Errors : ", ajv.errorsText());
    }
    expect(valid).toBe(true);
  });
});
