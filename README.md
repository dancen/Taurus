Taurus
========================

The Taurus angular.js application allows to manage
a universal common interface for tipical bank transfers.

How it works
-------------

Secret Code:
Users obtain a secret code (tipically 6 digits code) from their Bank. This code will be a sort of password that
together with the user's email will be the credentials to obtain an authorization code in order to begin the process payment.
Taurus application send the authorization code as a SMS or similar phone message to the user's smartphone or mobile phone. 

Transactions:
Transactions are executed under a secure protocol and all operations are executed thanks to the two factor authentication.

Commit:
All operations are syncronized with the user's bank system. The operation can be cancelled within eight hours.
The user's bank executes the order the next day only after checking the validity of the operation.

Installation
------------

Install as a common angular.js application

License
-------

This bundle is under the MIT license. 

About
-----

Daniele Centamore
Symfony2 , angular.js, Bootstrap 
daniele.centamore@gmail.com