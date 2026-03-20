const request = require("supertest");
const api = `http://localhost:${process.env.PORT || 3000}`;

test("POST /livros criar um livro", async () => {
  const res = await request(api)
    .post("/livros")
    .send({ titulo: "Clean Code", autor: "Martin Code" });
  expect(res.status).toBe(201);
  expect(res.body.titulo).toBe("Clean Code");
  expect(res.body.autor).toBe("Martin Code");
});

test("GET /livros/:id retorna livro", async () => {
  const res = await request(api).get("/livros/1");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("id");
  expect(res.body).toHaveProperty("titulo");
});

test("PUT /livros/id atualizar livro", async () => {
  const res = await request(api)
    .put("/livros/1")
    .send({ titulo: "Pair Programming", autor: "Martin Code" });

  expect(res.status).toBe(200);
  expect(res.body.titulo).toBe("Pair Programming");
  expect(res.body.autor).toBe("Martin Code");
});

