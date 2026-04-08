const axios = require("axios");
require("dotenv").config();

const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Multas", () => {

  test("(POST) deve criar uma nova multa", async () => {
    const res = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: false,
      emprestimo_id: 6,
    });

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.valor).toBe("50.00");
    expect(res.data.pago).toBe(false);
    expect(res.data.emprestimo_id).toBe(6);
  });

  test("(POST) deve retornar 400 sem o atributo valor", async () => {
    try {
      await axios.post(`${api}/multas`, {
        pago: false,
        emprestimo_id: 6,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 com valor negativo", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: -10,
        pago: false,
        emprestimo_id: 6,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(GET) deve retornar lista", async () => {
    const res = await axios.get(`${api}/multas`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("(GET:id) deve retornar multa por id", async () => {
    const criado = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: false,
      emprestimo_id: 6,
    });

    const res = await axios.get(`${api}/multas/${criado.data.id}`);
    expect(res.status).toBe(200);
  });

  test("(PUT:id) deve atualizar por id", async () => {
    const criado = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: false,
      emprestimo_id: 6,
    });

    const res = await axios.put(`${api}/multas/${criado.data.id}`, {
      pago: true,
    });

    expect(res.status).toBe(200);
    expect(res.data.pago).toBe(true);
  });

  test("(DELETE:id) deve deletar por id", async () => {
    const criado = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: true,
      emprestimo_id: 6,
    });

    const res = await axios.delete(`${api}/multas/${criado.data.id}`);
    expect(res.status).toBe(204);
  });

});