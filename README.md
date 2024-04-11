# [ARCHIVED] in favor of [go-oscal](github.com/defenseunicorns/go-oscal) `go-oscal doctor` cmd 

## Why?
The json schemas provided by OSCAL are not correctly formatted JSON Draft-07 schemas. Specifically they make use of the `$ref` and `$id` fields within the same definitions. When `$ref` and `$id` both exist in Draft-07 everything but the `$ref` is ignored causing problems with any other types that reference the ignored `$id`. This script replaces the `$ref` key in objects that contain both `$ref` and `$id` with the type that `$ref` references. Allowing the json to be properly parsed by JSON schema validators such as [https://github.com/santhosh-tekuri](https://github.com/santhosh-tekuri). 

### References
- [https://github.com/usnistgov/OSCAL/issues/1908](https://github.com/usnistgov/OSCAL/issues/1908) 
- [https://github.com/santhosh-tekuri/jsonschema/issues/129](https://github.com/santhosh-tekuri/jsonschema/issues/129)

## Limitations
- Currently only works when the `$ref` points to a definition within the `definitions` field. ie (`#/definitions/some-definition`)


## Example Result
```json
// This
{
    "json-schema-directive" : 
        { 
            "title" : "Schema Directive",
            "description" : "A JSON Schema directive to bind a specific schema to its document instance.",
            "$id" : "#json-schema-directive",
            "$ref" : "#/definitions/URIReferenceDatatype" 
        },
}
// Gets replaced with
{
    "json-schema-directive" : 
        { 
            "title" : "Schema Directive",
            "$id" : "#json-schema-directive",
            "description" : "A URI Reference, either a URI or a relative-reference, formatted according to section 4.1 of RFC3986.",
            "type" : "string",
            "format" : "uri-reference"
        },
}
```

## Example
```bash
# Takes the input file and output file from the command line args and processes the JSON
# Replaces original if no output file is specified
node index.js input.json output.json
```


### Authors
- Michael (Cole) Winberry