const axios = require("axios");
require("dotenv").config();

const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Multas", () => {

  test("(POST) deve criar uma nova multa", async () => {
    const res = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: false,
      emprestimo_id: 1,
    });

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.valor).toBe("50.00");
    expect(res.data.pago).toBe(false);
    expect(res.data.emprestimo_id).toBe(1);
  });

  test("(POST) deve retornar 400 sem valor", async () => {
    try {
      await axios.post(`${api}/multas`, {
        pago: false,
        emprestimo_id: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 sem pago", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: 50,
        emprestimo_id: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 sem emprestimo_id", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: 50,
        pago: false,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 com emprestimo_id inexistente", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: 50,
        pago: false,
        emprestimo_id: 9999,
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
        emprestimo_id: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 com valor zero", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: 0,
        pago: false,
        emprestimo_id: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(POST) deve retornar 400 com pago não booleano", async () => {
    try {
      await axios.post(`${api}/multas`, {
        valor: 50,
        pago: "notaboolean",
        emprestimo_id: 1,
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("(GET) deve retornar uma lista de multas", async () => {
    const res = await axios.get(`${api}/multas`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("(GET/multa/:id) deve retornar multa por id", async () => {
    const res = await axios.get(`${api}/multas/1`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("id");
  });

  test("(GET/multa/:id) deve retornar 404 para id inexistente", async () => {
    try {
      await axios.get(`${api}/multas/9999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("(PUT/multa/:id) deve atualizar multa", async () => {
    const criado = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: false,
      emprestimo_id: 1,
    });

    const res = await axios.put(`${api}/multas/${criado.data.id}`, {
      pago: true,
    });

    expect(res.status).toBe(200);
    expect(res.data.pago).toBe(true);
  });

  test("(PUT/multa/:id) deve retornar 404 para id inexistente", async () => {
    try {
        await axios.put(`${api}/multas/9999`, {
        });
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

    test("(DELETE/multa/:id) deve deletar multa", async () => {
    const criado = await axios.post(`${api}/multas`, {
      valor: 50,
      pago: true,
      emprestimo_id: 1,
    }); 

    const res = await axios.delete(`${api}/multas/${criado.data.id}`);
    expect(res.status).toBe(204);
  });

  test("(DELETE/multa/:id) deve retornar 404 para id inexistente", async () => {
    try {
      await axios.delete(`${api}/multas/9999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  
});