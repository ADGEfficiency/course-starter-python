.PHONY: app

APP=neuapp

meta: app

neuapp/package-lock.json:
	git clone https://github.com/ADGEfficiency/course-starter-python $(APP)
	cd $(APP); npm install -g gatsby-cli

app: neuapp/package-lock.json
	cd $(APP); npm run dev

pull-static:
	aws s3 sync s3://dss/neuapp/static neuapp/static

push-static:
	aws s3 sync neuapp/static s3://dss/neuapp/static 
