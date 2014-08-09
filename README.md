mean-stack-begin
============

## Getting started

`$ npm install && bower install`

In a separate terminal fire up MongoDB: `$ mongod`

Inject script tags into index.html using gulp: `$ gulp bower-install`

`$ node server`


## Notes

Mongoose middleware is not invoked on update() operations, so you must use a save()if you want to update user passwords