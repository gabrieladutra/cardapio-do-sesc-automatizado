#!/bin/bash

zip -r -q puppeteer.zip index.js sms.js lanchonete.js dailyMenu.js node_modules/ package.json
echo Uploading zip to lambda
aws lambda update-function-code --function-name getMenu --zip-file fileb://puppeteer.zip --profile gabriela --region sa-east-1 --no-cli-pager
aws lambda update-function-code --function-name getMenuLanchonete --zip-file fileb://puppeteer.zip --profile gabriela --region sa-east-1 --no-cli-pager
aws lambda update-function-code --function-name sendSMS --zip-file fileb://puppeteer.zip --profile gabriela --region sa-east-1 --no-cli-pager
aws lambda update-function-code --function-name getDailyMenu --zip-file fileb://puppeteer.zip --profile gabriela --region sa-east-1 --no-cli-pager
rm puppeteer.zip