.PHONY: app

APP=neuapp

meta: app

setup:
	git clone https://github.com/ADGEfficiency/course-starter-python $(APP)
	cd $(APP); npm install -g gatsby-cli; npm i

app:
	cd $(APP); npm run dev

build: pull-static
	cd $(APP); gatsby build

~/.aws/credentials:
	echo "making netlify aws creds"
	mkdir -p ~/.aws
	sh inject-aws-netlify.sh
	cp ~/.aws/credentials-netlify ~/.aws/credentials
	export AWS_ACCESS_KEY_ID=$(NETLIFY_AWS_ACCESS_KEY_ID)
	export AWS_SECRET_ACCESS_KEY=$(NETLIFY_AWS_SECRET_ACCESS_KEY)

pull-static: ~/.aws/credentials
	pip install -q awscli
	aws s3 sync s3://neuapp-prod/neuapp/static neuapp/static

push-static:
	aws s3 sync neuapp/static s3://neuapp-prod/neuapp/static
