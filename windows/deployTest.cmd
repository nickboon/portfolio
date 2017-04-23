call .\windows\setEnvVar.cmd
call .\windows\predeploy.cmd && node deploy/deploy test %NICKBOONPORTFOLIOSRC% && start https://nickboon.neocities.org/test
