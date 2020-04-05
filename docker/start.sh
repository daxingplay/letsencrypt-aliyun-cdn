#!/bin/sh

node /srv/index.js

crond -l 6 -f $1