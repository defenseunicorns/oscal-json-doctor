const fs = require('fs');


// Recursively replaces all $ref keys with the referenced object when an object has both $id and $ref keys defined to support JSON Schema draft 7
function processJson(obj, parentObj, parentKey) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                if ('$id' in obj[key] && '$ref' in obj[key]) {
                    const refParts = obj[key]['$ref'].split('/').slice(1);
                    // Ensure the $ref is to definitions
                    // TODO: expand to support other $ref types if needed. 
                    if (refParts[0] === "definitions") {
                        delete obj[key]['$ref'];
                        let replaceValue = parentObj;
                        for (const refPart of refParts) {
                            replaceValue = replaceValue[refPart];
                        }
                        obj[key] = {...obj[key], ...replaceValue};
                    }
                    else {
                        console.log(`$ref ${obj[key]['$ref']} not supported. Only $ref to definitions supported.`)
                    }
                }
                processJson(obj[key], obj, key);
            }
        }
    }
}

// Takes the input file and output file from the command line args and processes the JSON
// Replaces original if no output file is specified
// Example: node index.js input.json output.json
function processJsonFile() {
    argv = process.argv;
    const inputFile = argv[2];
    let outputFile = argv[3];
    if(!inputFile) {
        console.log('No input file specified');
        return;
    }
    if(!outputFile) {
        outputFile = inputFile;
    }
    const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    processJson(jsonData, null, null);

    // Write the modified JSON to the output file
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    console.log(`Processed JSON written to ${outputFile}`);
}

processJsonFile();