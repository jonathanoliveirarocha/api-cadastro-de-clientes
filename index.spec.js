const request = require("supertest");
const app = require("./app");

describe("Testing route /customer/create", () => {
  test("Should return empty data error message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Request missing data or they are empty!",
    });
  });

  test("Should return 'Invalid CPF!' message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "11111111111", birthdate: "2024-02-01" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      message: "Invalid CPF!",
    });
  });

  test("Should return 'Invalid date!' message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "11144477735", birthdate: "202340301" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Invalid date!",
    });
  });

  test("Should return birthdate cannot be in the future message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "11144477735", birthdate: "2024-03-01" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      message: "Invalid birthdate. It cannot be in the future.",
    });
  });

  test("Should return 'CPF already registered!' message", async () => {
    await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "11144477735", birthdate: "2023-03-01" });
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "11144477735", birthdate: "2023-03-01" });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ mensage: "CPF already registered!" });
  });

  test("Should return 'Customer successfully registered!' message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "52413995005", birthdate: "2023-03-01" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Customer successfully registered!" });
  });

  test("Should return 'Customer successfully registered!' message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "478.760.090-77", birthdate: "2023-03-01" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Customer successfully registered!" });
  });
});
