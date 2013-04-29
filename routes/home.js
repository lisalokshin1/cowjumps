module.exports = function home(req, res){
	console.log("The HOMEPAGE has been requested");
	res.render('home.html');
};

