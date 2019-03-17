process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../server/models/user');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
	beforeEach((done) => { //Before each test we empty the database
		User.deleteMany({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET user route
  */
  describe('/GET user', () => {
	  it('it should GET all the users', (done) => {
			chai.request(server)
		    .get('/api/user')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
	});
	/*
  * Test the /POST user route
  */
	describe('/POST user', () => {
	  it('it should POST a user', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server)
		    .post('/api/register')
				.send(user)
		    .end((err, res) => {
			  	res.should.have.status(201);
			  	res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('name');
		      done();
		    });
	  });
	
	  it('it should not POST a user', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: ""
			}
			chai.request(server)
		    .post('/api/register')
				.send(user)
		    .end((err, res) => {
			  	res.should.have.status(422);
			  	res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Password is missing');
		      done();
		    });
	  });
	});
	/*
  * Test the /POST login route
  */
	describe('/POST login', () => {
	  it('it should POST a user and then LOGIN also', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server)
				.post('/api/register')
				.send(user)
				.end((err, res) => {
					chai.request(server)
						.post('/api/login')
						.send(user)
						.end((err, res) => {
							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('token');
							res.body.should.have.property('user');
							res.body.user.should.have.property('_id');
							done();
						})
				});
	  });
		
		it('it should not LOGIN with wrong password', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server) //registration
				.post('/api/register')
				.send(user)
				.end((err, res) => {
					var loginUser = {
						email: "testing@mail.com",
						password: "test12"
					}
					chai.request(server)
						.post('/api/login') //login
						.send(loginUser)
						.end((err, res) => {
							res.should.have.status(422);
							res.body.should.be.a('object');
							res.body.should.have.property('message').eql('Auth Failed');
							done();
						})
				});
	  });
	});
	/*
  * Test the /POST user/update route
  */
	describe('/POST user/update', () => {
	  it('it should UPDATE user details', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server) //registration
				.post('/api/register')
				.send(user)
				.end((err, res) => {
					
					chai.request(server) //login
						.post('/api/login')
						.send(user)
						.end((err, res) => {
							
							var userUpdate = {
								name: "Testing",
								bio: "Testing"
							}
							chai.request(server) //update
								.post('/api/user/update')
								.set('x-token', res.body.token)
								.send(userUpdate)
								.end((err, res) => {
									res.should.have.status(200);
									res.body.should.be.a('object');
									res.body.should.have.property('nModified').eql(1);
									done();
								});	
						});	
				});
	  });
	});
	/*
  * Test the /POST user/change_password route
  */
	describe('/POST user/change_password', () => {
	  it('it should UPDATE password', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server) //registration
				.post('/api/register')
				.send(user)
				.end((err, res) => {
					
					chai.request(server) //login
						.post('/api/login')
						.send(user)
						.end((err, res) => {
							
							var userUpdate = {
								oldPassword: "test123",
								newPassword: "abc567"
							}
							chai.request(server) //change password
								.post('/api/user/change_password')
								.set('x-token', res.body.token)
								.send(userUpdate)
								.end((err, res) => {
									res.should.have.status(200);
									res.body.should.be.a('object');
									res.body.should.have.property('nModified').eql(1);
									done();
								});	
						});	
				});
	  });
		it('it should not UPDATE password with wrong old password', (done) => {
			var user = {
				name: "Test",
				email: "testing@mail.com",
				bio: "",
				password: "test123"
			}
			chai.request(server) //registration
				.post('/api/register')
				.send(user)
				.end((err, res) => {
					
					chai.request(server) //login
						.post('/api/login')
						.send(user)
						.end((err, res) => {
							
							var userUpdate = {
								oldPassword: "test12",
								newPassword: "abc567"
							}
							chai.request(server) //change password
								.post('/api/user/change_password')
								.set('x-token', res.body.token)
								.send(userUpdate)
								.end((err, res) => {
									res.should.have.status(422);
									res.body.should.be.a('object');
									res.body.should.have.property('message').eql("User Not Found");
									done();
								});	
						});	
				});
	  });
	});
});