.PHONY: app

APP=neuapp
PROFILE=netlify
STAGE?=dev

meta: local-app

local-app: js-deps
	cd $(APP); npm run dev

./neuapp/node_modules/gatsby/README.md:
	cd $(APP); npm install -g gatsby-cli; npm i

js-deps: ./neuapp/node_modules/gatsby/README.md

build: pull-static js-deps
	cd $(APP); gatsby build

#  this will only run on netlify during build
~/.aws/credentials:
	echo "making netlify aws creds"
	mkdir -p ~/.aws
	sh inject-aws-netlify.sh
	cp ~/.aws/credentials-netlify ~/.aws/credentials

pull-static: ~/.aws/credentials
	pip install -q awscli
	aws s3 sync s3://neuapp-$(STAGE)/neuapp/static neuapp/static --profile $(PROFILE)

push-static:
	aws s3 sync neuapp/static s3://neuapp-$(STAGE)/neuapp/static --profile $(PROFILE)

infra:
	export AWS_PROFILE=$(PROFILE); sls deploy -s $(STAGE)
