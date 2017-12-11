

module.exports = (app) => {
  app.get('/api/v1/login', async (req, res) => {
    res.status(200).json({
      test: 'login'
    });
  });
}