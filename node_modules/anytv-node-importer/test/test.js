'use strict';

const should = require('chai').should();
const importer = require(process.cwd() + '/index');


describe('Overall test', () => {

    it ('importer.dirloadSync should load all files in a folder', (done) => {

        const files = importer.dirloadSync(process.cwd() + '/test/sample');

        files.a.should.exist;
        files.b.should.exist;

        files.a.should.be.a('function');
        files.b.should.be.equal(2);

        done();
    });

});
