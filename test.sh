if [ "$1" == "debug" ]; then
  echo "Debugging!"
  node debug ./node_modules/jasmine-node/lib/jasmine-node/cli.js spec --captureExceptions --verbose --coffee --forceexit
else
  ./node_modules/jasmine-node/bin/jasmine-node spec/ --captureExceptions --coffee --forceexit --verbose
fi
