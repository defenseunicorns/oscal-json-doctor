# OSCAL JSON Schema Doctor

## Why?
The json schemas provided by OSCAL are not correctly formatted JSON Draft-07 schemas. Specifically they make use of the `$ref` and `$id` fields within the same definitions. When `$ref` and `$id` both exist in Draft-07 everything but the `$ref` is ignored causing problems with any other types that reference the ignored `$id`. This script replaces the `$ref` key in objects that contain both `$ref` and `$id` with the type that `$ref` references. Allowing the json to be properly parsed by JSON schema validators such as [https://github.com/santhosh-tekuri](https://github.com/santhosh-tekuri). 

### References
- [https://github.com/usnistgov/OSCAL/issues/1908](https://github.com/usnistgov/OSCAL/issues/1908) 
- [https://github.com/santhosh-tekuri/jsonschema/issues/129](https://github.com/santhosh-tekuri/jsonschema/issues/129)

## Limitations
- Currently only works when the `$ref` points to a definition within the `definitions` field. ie (`#/definitions/some-definition`)


### Authors
- Michael (Cole) Winberry