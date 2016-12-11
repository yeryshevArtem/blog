blog
===========

Every developer should have his own blog, at least a code for it.
And it's my first serious project.

Back-end: NodeJS (Express)

Front-end: React

Try it out
==========

* Clone the project and make `vagrant up --provision`
* Make `vagrant ssh`
* Go to `~$ cd /projects/blog/` path
* Run `npm install`
* After installed all packages go to `/projects/blog/modules` path
* Go to every module (admin, app, api) and for every run command `npm install`
* After return to `~/projects/blog/` path and run `node app.js`
* To look at the posts as a guest visit `http://192.168.33.11:8000/`
* To create/update/delete posts visit `/admin`
* To access it, use login `zippi` and password `12345678`

But why?
========

It can be an example of how to set up environment and make a simple
REST API.
