# Environment
PROJECT = movieapp-cae2d
APP_ID = 1:643650469494:web:11e46acc3d64ad90d86957
FIREBASE_TOKEN_FILE = firebase_token.asc
FIREBASE_CONFIG_JS = src/utils/firebase-config.js
TMP_FIREBASE_CONFIG_FILE = tmp_config.js

.ALL: app

# App management
.PHONY: app-instal app-build app-deploy app-serve

app: app-instal app-config app-build app-deploy

app-instal:
	npm install

app-config:
	@echo "Retrieve config for "$(PROJECT)""
ifndef PROJECT_ID
	@firebase use $(PROJECT)
	@firebase apps:sdkconfig WEB $(APP_ID) > $(TMP_FIREBASE_CONFIG_FILE)
else
	@firebase use $(PROJECT) --token $(shell cat $(FIREBASE_TOKEN_FILE))
	@firebase apps:sdkconfig WEB $(APP_ID) --token $(shell cat $(FIREBASE_TOKEN_FILE)) > $(TMP_FIREBASE_CONFIG_FILE)
endif
	@bash -c 'cat <(echo "import * as firebase from \"firebase/app\";") tmp_config.js > $(FIREBASE_CONFIG_JS)'
	@rm -f $(TMP_FIREBASE_CONFIG_FILE)

app-build:
	rm -rf build
	yarn build:$(PROJECT)
app-deploy:
ifndef PROJECT_ID
	@echo "Deploy with local token"
	@firebase deploy --only hosting
else
	@echo "Deploy with token"
	@firebase deploy --only hosting --token $(shell cat $(FIREBASE_TOKEN_FILE))
endif

# For local development
app-serve: app-build
	firebase use $(PROJECT)
	firebase serve --only hosting
