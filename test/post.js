process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Post = require('../server/models/post');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Blogs', () => {
	beforeEach((done) => { //Before each test we empty the database
		Post.deleteMany({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET blog route
  */
  describe('/GET blog', () => {
	  it('it should GET all the blog', (done) => {
			chai.request(server)
		    .get('/api/blog')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
	});
});