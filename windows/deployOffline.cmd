call .\windows\setEnvVar.cmd

call :predeployoffline && node deploy/deploy offline %NICKBOONPORTFOLIOSRC% && npm start
EXIT /B %ERRORLEVEL%

:predeployoffline
call mocha && npm run deploy:clean && call :buildoffline && npm run beautify
EXIT /B 0

:buildoffline
call node build/buildJson ../json/offline/src.json .\json\built\index.json && npm run build:html:offline
EXIT /B 0
