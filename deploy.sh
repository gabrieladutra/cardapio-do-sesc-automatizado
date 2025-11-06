#!/bin/bash

zip -r -q puppeteer.zip index.js node_modules/
echo Uploading zip to lambda
aws lambda update-function-code --function-name getMenu --zip-file fileb://puppeteer.zip --profile gabriela --region eu-north-1 --no-cli-pager
rm puppeteer.zip