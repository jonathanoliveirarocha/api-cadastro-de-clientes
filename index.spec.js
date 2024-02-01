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
    expect(response.body).toEqual({
      message: "Customer successfully registered!",
    });
  });

  test("Should return 'Customer successfully registered!' message", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({ name: "João", cpf: "478.760.090-77", birthdate: "2023-03-01" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Customer successfully registered!",
    });
  });
});

describe("Testing route /customer/findonebycpf", () => {
  test("Should return empty data error message", async () => {
    const response = await request(app).post("/customer/findonebycpf");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Request missing data or they are empty!",
    });
  });

  test("Should return 'Invalid CPF!' message", async () => {
    const response = await request(app)
      .post("/customer/findonebycpf")
      .send({ cpf: "11111111111" });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      message: "Invalid CPF!",
    });
  });

  test("Should return 'Customer not yet registered!' message", async () => {
    const response = await request(app)
      .post("/customer/findonebycpf")
      .send({ cpf: "96402399094" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Customer not yet registered!",
    });
  });

  test("Should return status 200", async () => {
    const response = await request(app)
      .post("/customer/findonebycpf")
      .send({ cpf: "52413995005" });

    expect(response.status).toBe(200);
  });

  test("Should return status 200", async () => {
    const response = await request(app)
      .post("/customer/findonebycpf")
      .send({ cpf: "478.760.090-77" });

    expect(response.status).toBe(200);
  });
});

describe("Testing route /customer/findallinrange", () => {
  test("Should return status 200", async () => {
    const response = await request(app).post("/customer/findallinrange");

    expect(response.status).toBe(200);
  });

  test("Should return an array with 1 item", async () => {
    const response = await request(app).post("/customer/findallinrange?end=1");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Should return an array with 1 item", async () => {
    const response = await request(app).post(
      "/customer/findallinrange?start=1&end=2"
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
