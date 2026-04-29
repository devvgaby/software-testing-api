const axios = require("axios");
require("dotenv").config();
const api = `http://localhost:${process.env.PORT || 3000}`;

test("POST /emprestimos deve criar um novo empréstimo", async () => {
  const res = await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  expect(res.status).toBe(201);
  expect(res.data).toHaveProperty("id");
  expect(res.data.usuario_id).toBe(1);
  expect(res.data.livro_id).toBe(1);
});

test("POST /emprestimos deve retornar 400 sem usuario_id", async () => {
  try {
    await axios.post(`${api}/emprestimos`, {
      livro_id: 1,
      data_emprestimo: "2024-06-01",
      data_devolucao_prevista: "2024-06-15",
    });
  } catch (err) {
    expect(err.response.status).toBe(400);
  }
});

test("POST /emprestimos deve retornar 400 sem livro_id", async () => {
  try {
    await axios.post(`${api}/emprestimos`, {
      usuario_id: 1,
      data_emprestimo: "2024-06-01",
      data_devolucao_prevista: "2024-06-15",
    });
  } catch (err) {
    expect(err.response.status).toBe(400);
  }
});

test("POST /emprestimos deve retornar 400 sem data_emprestimo", async () => {
  try {
    await axios.post(`${api}/emprestimos`, {
      usuario_id: 1,
      livro_id: 1,
      data_devolucao_prevista: "2024-06-15",
    });
  } catch (err) {
    expect(err.response.status).toBe(400);
  }
});

test("POST /emprestimos deve retornar 400 sem data_devolucao_prevista", async () => {
  try {
    await axios.post(`${api}/emprestimos`, {
      usuario_id: 1,
      livro_id: 1,
      data_emprestimo: "2024-06-01",
    });
  } catch (err) {
    expect(err.response.status).toBe(400);
  }
});

test("GET /emprestimos deve retornar lista", async () => {
  const res = await axios.get(`${api}/emprestimos`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.data)).toBe(true);
});

test("GET /emprestimos/:id deve retornar um empréstimo", async () => {
  const criado = await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  const res = await axios.get(`${api}/emprestimos/${criado.data.id}`);

  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty("id");
});

test("GET /emprestimos/:id deve retornar 404 sem um empréstimo existente", async () => {
  try {
    await axios.get(`${api}/emprestimos/99999`);
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

test("PUT /emprestimos/:id deve atualizar um empréstimo", async () => {
  const criado = await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  const res = await axios.put(`${api}/emprestimos/${criado.data.id}`, {
    data_devolucao_real: "2024-06-20",
  });

  expect(res.status).toBe(200);
  expect(res.data.data_devolucao_real).toBeTruthy();
});

test("PUT /emprestimos/:id deve retornar 404 sem um empréstimo existente", async () => {
  try {
    await axios.put(`${api}/emprestimos/99999`, {});
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

test("DELETE /emprestimos/:id deve deletar um empréstimo", async () => {
  const criado = await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  const res = await axios.delete(`${api}/emprestimos/${criado.data.id}`);
  expect(res.status).toBe(204);
});

test("DELETE /emprestimos/:id deve retornar 404 sem um empréstimo existente", async () => {
  try {
    await axios.delete(`${api}/emprestimos/99999`);
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

test("GET /emprestimos/:id deve retornar um empréstimo específico", async () => {
  const criado = await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  const id = criado.data.id;

  const res = await axios.get(`${api}/emprestimos/${id}`);

  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty("id", id);
  expect(res.data.usuario_id).toBe(1);
});

test("POST /emprestimos deve retornar 400 para um livro já emprestado", async () => {
  await axios.post(`${api}/emprestimos`, {
    usuario_id: 1,
    livro_id: 1,
    data_emprestimo: "2024-06-01",
    data_devolucao_prevista: "2024-06-15",
  });

  try {
    await axios.post(`${api}/emprestimos`, {
      usuario_id: 2,
      livro_id: 1, 
      data_emprestimo: "2024-06-02",
      data_devolucao_prevista: "2024-06-16",
    });
  } catch (err) {
    expect(err.response.status).toBe(400);
    expect(err.response.data).toHaveProperty("message");
  }
});
