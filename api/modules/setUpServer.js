const setupServer = (app, port) => {
  app.listen(port, () => {
    console.log(`Servidor de la API corriendo en http://localhost:${port}`);
  });
};

export default setupServer;
