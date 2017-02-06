#!/bin/bash

/usr/bin/node /srv/index.js

crond -l 2 -f $1