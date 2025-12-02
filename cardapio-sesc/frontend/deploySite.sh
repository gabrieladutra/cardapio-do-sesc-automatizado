#!/bin/bash
BUCKET='menu.gabrieladutra.com'

aws s3 rm s3://$BUCKET --recursive
aws s3 cp --acl public-read dist s3://$BUCKET --recursive
aws cloudfront create-invalidation --distribution-id E2BUIQD7DFSEQ1 --paths '/*' --no-cli-pager
