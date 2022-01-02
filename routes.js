module.exports = (app) => {
    app.use('/API', require('./routes/login'));
    app.use('/API', require('./routes/changepwd'));
    app.use('/API', require('./routes/signup'));
    app.use('/API', require('./routes/sendotp'));
    app.use('/API', require('./routes/menu'));
    app.use('/API', require('./routes/promo'));
    app.use('/API', require('./routes/finduser'));
    app.use('/API', require('./routes/findshop'));
    app.use('/API', require('./routes/shop'));
    app.use('/API', require('./routes/updateuser'));
};