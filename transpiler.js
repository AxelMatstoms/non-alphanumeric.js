const fs = require("fs");

function transpile(code) {
    const replaced = code.replace(/(true|false)/g, (match) => bool(match))
	  .replace(/(\+|-|\*|\/|%)?\s*([0-9]+)/g, (match, sign, num) => number(+num, sign))
	  .replace(/undefined/g, undef())
	  .replace(/""/g, empty_str());
    const idReplaced = replaceIdentifiers(replaced)
    return idReplaced.replace(/\s/g, "");
}

function number(n, sign) {
    if (n < 10) {
	if (sign) {
	    return `${sign}(${digit(n)})`;
	}else {
	    return digit(n)
	}
    } else {
	if (sign) {
	    return `${sign ? sign : "+"}(+[${[...n.toString()].map(d => `[${digit(+d)}]`).join("+")}])`;
	} else {
	    return `+[${[...n.toString()].map(d => `[${digit(+d)}]`).join("+")}]`;
	}
    }
}

function digit(n) {
    return (n == 0) ? "+![]" : "+!![]".repeat(n);
}

function bool(b) {
    if (b == "true") {
	return "!![]";
    } else if (b == "false") {
	return"![]";
    }
}

function undef() {
    return "[][[]]";
}

function empty_str() {
    return "[]+[]";
}

/**
 * Replaces identifiers with non-alphanumeric identifiers.
 * Original input string is not modified, a String with all identifiers replaced is returned.
 * Identifiers commonly occuring are given priority to short identifiers to reduce final size of output code.
 */
function replaceIdentifiers(code) {
    const ids = ordered_uids(code)
    let rcode = code;
    const mapping = associate(Object.keys(ids).sort((a, b) => ids[b] - ids[a]), (c, i) => ({key: c, value: noalnumid(i)}));
    const orderedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);
    orderedKeys.forEach((id) => rcode = rcode.replace(RegExp(id, "g"), () => mapping[id]));
    return rcode;
}

function ordered_uids(code) {
    const re = /[A-Za-z$_][A-Za-z0-9$_]*/g;
    let m;
    const words = {};
    while (m = re.exec(code)) {
	if (!words.hasOwnProperty(m[0])) {
	    words[m[0]] = 0;
	}
	words[m[0]]++;
    }
    return words;
}

function debug(tag, value, ...additional) {
    console.log(tag, value, ...additional);
    return value;
}

function noalnumid(n) {
    return n.toString(2).replace(/0/g, "_").replace(/1/g, "$");
}

/**
 * Converts a list to a map where the key and value is returned as an object by transform callback.
 */
function associate(list, transform) {
    const obj = {};
    list.map(transform).forEach((pair) => obj[pair.key] = pair.value);
    return obj;
}

if (process.argv.length > 2) {
    const [node, transpiler, ...args] = process.argv;
    console.log(args);
    args.forEach((arg) => {
	fs.readFile(arg, "utf8", (err, data) => {
	    if (err) {
		console.error(err);
		return;
	    }
	    console.log(`${arg}:`);
	    console.log(transpile(data));
	});
    });
}
