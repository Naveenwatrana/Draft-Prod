#!/bin/bash

# requires Heroku Dyno Metadata https://devcenter.heroku.com/articles/dyno-metadata
COMMIT_SHA=$(echo "$HEROKU_SLUG_DESCRIPTION" | sed -n 's/.*Deploy \([a-zA-Z0-9]*\).*/\1/p')

if [ "$CHECK_COMMIT_STATUS" != "true" ]; then
    echo "Checking commit status turned off"
    exit 0
fi

echo "Checking status of $COMMIT_SHA"

if [ "$COMMIT_SHA" == "" ]; then
    echo "No commit to check, skipping"
    exit 0
fi

GITHUB_RESPONSE=$(curl \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_STATUS_TOKEN" \
  https://api.github.com/repos/founderandlightning/"${CIRCLE_PROJECT_REPONAME}"/commits/"$COMMIT_SHA"/status)

COMMIT_STATUS=$(echo "$GITHUB_RESPONSE" | sed -n 's/  "state":[[:space:]]*"\([a-z]*\)",/\1/p' | head -1)


echo "GitHub commit status: \"$COMMIT_STATUS\""

if [ "$COMMIT_STATUS" != "success" ]; then
    echo "ERROR: Invalid status of last commit. Please make sure, that all tests passes."
    echo "Detailed GitHub response:"
    echo "$GITHUB_RESPONSE"
    exit 1
fi

exit 0;