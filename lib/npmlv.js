var fs = require('fs');

var program = require('commander');

program
	.version(JSON.parse(require('fs').readFileSync(require.main.filename.match(/^(.+)\/.+$/)[1] + '/../package.json')).version)
	.usage('\List module versions in your project in format easy to copy and paste to your package.json.\nUsage: $0')
	.option('-a, --any', 'User any version specifier "*", instead of exact version.')
	.option('-n, --newer', 'User equal or newer version specifier ">=", instead of exact version.')
	.option('-t, --tilde', 'Use tilde "~" for floating patch versions.')
	.option('-k, --keeprepos', 'Keep repository paths defined as they are in your package.json.')
	.parse(process.argv);

var pkg;
var res = {};
var base = process.cwd() + '/node_modules';
var dirs = fs.readdirSync(base)
    .filter(function (dir) { return !/^\./.test(dir) });

if (program.keeprepos) {
    try { 
        pkg = require(process.cwd() + '/package.json');
    } catch(e) {
        console.log('Error: The "-k" option requires a package.json in the current directory');
        process.exit(1);
    }
}

for(var i = 0; i < dirs.length; i++) {
	var module = dirs[i];
	var bdir = base + '/' + module;
	var cfg = bdir + '/package.json';
	var ok;
	try { ok = fs.lstatSync(cfg).isFile(); } catch(e) {}
	if(!ok) {
		console.log('skipping: ' + bdir);
		continue;
	}
	try {
		var config = JSON.parse(fs.readFileSync(cfg));
        if(pkg && config.name && /^git|http/.test(pkg.dependencies[config.name])) {
            res[module] = pkg.dependencies[config.name];
            continue;
        }
		if(config.version) {
            res[module] = (program.any ? "*" :
                program.newer ? ">=" :
                program.tilde ? "~" :
                ""
            ) + config.version;
        } else {
            console.log('No version information for module ' + module);
        }
	}
	catch(e) {
		console.log('error during parsing: ' + cfg, e.stack);
		process.exit(1);
	}
}
console.log(JSON.stringify(res, null, '    '));
