var configAuth = require('./auth');
var FacebookStrategy=require('passport-facebook').Strategy;
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports=function(passport){


    passport.serializeUser(function(user,done){

        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    });


    //aici defindesc cum sunt fieldurile, la mine eu ii trimit email. defaul ii username si password
    passport.use('local-singup',new localStrategy({
        usernameField:'email',
        passwordField:'password'
    },
        function(email,password,done){

            process.nextTick(function(){
                User.findOne({'local.email':email},function(err,user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        return done(null,false,'That email already exists');
                    }else{
                        var newUser = new User();
                        newUser.local.email=email;
                        newUser.local.password=newUser.generateHash(password);
                        newUser.save(function(err){
                            if(err)
                                return done(err);
                        });
                        return done(null,newUser);
                    }

                })
            })
        }
    ));
    //
    passport.use('local-login',new localStrategy({
        usernameField:'email',
        passwordField:'password'
        //passReqToCallback:true
    },function(email,password,done){

            process.nextTick(function(){
                User.findOne({'local.email':email},function(err,user){
                    if(err){
                        return done(err);
                    }
                    if(!user){
                        return done(null,false,'There isan\'t any user with that email');
                    }
                    if(!user.validPassword(password)){
                        return done(null,false,'Incorect password');
                    }else{
                        return done(null,user);
                    }
                })
            })
        }
    ));
    //
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'email','friendlists']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'facebook.id':profile.id},function(err,user){
                    if(err){
                       return done(err);
                    }
                    if(user){
                        return done(null,user);
                    }else{
                        newUser = new User();
                        newUser.facebook.id=profile.id;
                        newUser.facebook.token=accessToken;
                        newUser.facebook.email=profile.emails[0].value;
                        newUser.save(function(err){
                            if(err){
                                return done(err);
                            }
                            return done(null,newUser)
                        })
                    }
                })
            })

        }
    ));
};

