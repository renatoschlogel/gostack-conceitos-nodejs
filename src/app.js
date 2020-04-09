const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const indexRepository = repositories.findIndex(repository => repository.id === id);
  if(indexRepository < 0) {
    return response.status(400).json({error: "Repository not found!"});
  }
 
  repositories[indexRepository].title = title;
  repositories[indexRepository].url = url;
  repositories[indexRepository].techs = techs;
 
  return response.json(repositories[indexRepository]);
});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);
  if(indexRepository < 0) {
    return response.status(400).json({error: "Repository not found!"});
  }

  repositories.splice(indexRepository, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);
  if(indexRepository < 0) {
    return response.status(400).json({error: "Repository not found!"});
  }

  repositories[indexRepository].likes++;

  response.json(repositories[indexRepository]);
});

module.exports = app;
