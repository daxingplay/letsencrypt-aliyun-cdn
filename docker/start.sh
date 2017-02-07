#!/bin/bash

/usr/bin/node /srv/index.js

crond -l 6 -f $1