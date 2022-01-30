cat > ~/.aws/credentials-netlify <<EOL
[default netlify]
region = ap-southeast-2
aws_secret_access_key = $NETLIFY_AWS_ACCESS_KEY_ID
aws_access_key_id = $NETLIFY_AWS_SECRET_ACCESS_KEY
EOL
