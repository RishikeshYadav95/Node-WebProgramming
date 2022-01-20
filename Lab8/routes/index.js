const characterRoutes = require('./characters');

const constructorMethod = (app) => {
    app.use('/characters', characterRoutes);
    app.use('/search', characterRoutes);
    app.use('/', characterRoutes);

    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });
  }
  
  module.exports = constructorMethod;