# npmlv: npm "list versions" command equivalent

## Description

List module versions in your project in format easy to copy and paste to your package.json.

## Install

	[sudo] npm install npmlv -g
	
## Usage

	cd your_module_root_dir
	
To print dependencies on exact versions (treading safe):

	npmlv

Prints:

```js
{
    "async-mini": "0.1.0",
    "laeh2": "0.2.0",
    "mongodb": "0.9.7",
    "underscore": "1.1.7"
}
```

To print dependencies on exact and higher versions (optimistic):

	npmlv -n

Prints:

```js
{
    "async-mini": ">=0.1.0",
    "laeh2": ">=0.2.0",
    "mongodb": ">=0.9.7",
    "underscore": ">=1.1.7"
}
```
	
To print dependencies on any version (should be same as optimistic really, but feels more [Lemonade Joe](http://www.imdb.com/title/tt0058275/)):

	npmlv -a

Prints:

```js
{
    "async-mini": "*",
    "laeh2": "*",
    "mongodb": "*",
    "underscore": "*"
}
```
