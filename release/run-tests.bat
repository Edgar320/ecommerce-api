@echo off
echo Running tests in release environment...

echo Running unit tests...
call npm test

echo Running integration tests...
call npm run test:integration

echo All tests completed!
