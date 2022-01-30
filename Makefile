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

pull-static:
	mkdir -p ~/.aws
	sh inject-aws-netlify.sh
	cp ~/.aws/credentials{-netlify,}
	pip install -q awscli
	aws s3 sync s3://neuapp-prod/neuapp/static neuapp/static

push-static:
	aws s3 sync neuapp/static s3://neuapp-prod/neuapp/static
