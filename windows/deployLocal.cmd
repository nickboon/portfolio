call .\windows\setEnvVar.cmd
call .\windows\predeploy.cmd && node deploy/deploy local %NICKBOONPORTFOLIOSRC% && npm start
