const MongoClient = require('mongodb').MongoClient
ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('zapatos');

    // Iniciar servidor
    app.listen(5000);
    console.log("Server Connect")
});

app.get('/', (req, res) => {

    var prod = db.collection('zapatos')
        .find();

    if (req.query.color)
        prod.filter({
            color: req.query.color
        });

    if (req.query.categoria)
        prod.filter({
            categoria: req.query.categoria
    });

    if (req.query.marca)
    prod.filter({
        marca: req.query.marca
});

    
    prod.toArray((err, result) => {
        res.render('index', {
            zapatos: result
        });
    })
});

//Cambio de pagina
app.get('/home', (req, res) => {
    res.render('home', {});
})

app.get('/checkout', (req, res) => {
    res.render('checking', {
        tittle: "Checkout"
    });
});

//Cambio de pagina a producto individual
app.get('/producto/:modelo', (req, res) => {
    db.collection('zapatos').find({
        modelo: req.params.modelo
    }).toArray((err, result) => res.render('producto', {
        modelos: result[0]
    }))

});

//envia el arreglo a la pagina de checkout
app.get('/productosPorIds', (req, res) => {
    var arreglo = req.query.id.split(',');
    arreglo = arreglo.map(function(id) {
        return new ObjectID(id);
    });
    var prod = db.collection('zapatos')
        .find({ _id: { $in: arreglo } })
        .toArray((err, result) => {
            res.send(result);
        });
});