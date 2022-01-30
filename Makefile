.PHONY: app

APP=neuapp

meta: local-app

setup:
	git clone https://github.com/ADGEfficiency/course-starter-python $(APP)
	cd $(APP); npm install -g gatsby-cli; npm i

local-app:
	cd $(APP); npm run dev

build: pull-static
	cd $(APP); gatsby build

#  this will only run on netlify during build
~/.aws/credentials:
	echo "making netlify aws creds"
	mkdir -p ~/.aws
	sh inject-aws-netlify.sh
	cp ~/.aws/credentials-netlify ~/.aws/credentials

pull-static: ~/.aws/credentials
	pip install -q awscli
	aws s3 sync s3://neuapp-$(STAGE)/neuapp/static neuapp/static --profile adg

push-static:
	aws s3 sync neuapp/static s3://neuapp-$(STAGE)/neuapp/static --profile adg

infra:
	export AWS_PROFILE=adg; sls deploy -s $(STAGE)
