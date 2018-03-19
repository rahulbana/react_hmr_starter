#!/bin/bash
export NODE_ENV=development
export PORT=1388

if [ $NODE_ENV = "development" ]
then
npm run dev
else
npm start
fi
