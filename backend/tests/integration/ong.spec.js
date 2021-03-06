const req = require('supertest');
const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const res = await req(app)
      .post('/ongs')
      //.set('Authorization', '')
      .send({
        name: "APAD",
        email: "contato@apad.com.br",
        whatsapp: "13982184280",
        city: "Rio do Sul",
        region: "SC"
      });
    
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);
  });
});