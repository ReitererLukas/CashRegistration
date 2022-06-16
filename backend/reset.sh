#!/bin/bash

npx prisma migrate reset --schema ./src/prisma/schema.prisma -f

# does not close the terminal window
# $SHELL