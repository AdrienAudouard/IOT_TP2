#!/bin/bash

git subtree push --prefix server heroku master
heroku logs --tail
