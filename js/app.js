// you can configure loading modules from the lib directory
requirejs.config ({
    "baseUrl": "js/lib",
    
    "paths": {
       "app": "../app",
       //loading jquery from CDN
       "jquery": "//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
    }
 });
