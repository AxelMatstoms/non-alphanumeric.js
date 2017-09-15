# non-alphanumeric.js
Javascript but without all the pesky alphanumerical characters.

### Example: quicksort
```javascript
(($_$$,$$$_,$___$)=>($_,$$__=($$_,$__$)=>$$_-$__$)=>(($__)=>($__=($)=>(($_$_)=>$_$_>+!![]+!![]?
(([$$$$,...$$])=>(($____)=>(($___)=>($___=(_,$_$,$$$)=>_<$____?$$__($$[_],$$$$)<+![]?
$___(_+!![],$$$_($_$,$$[_]),$$$):$___(_+!![],$_$,$$$_($$$,$$[_])):[...$__($_$),$$$$,
...$__($$$)])(+![],[],[]))())($_$$($$)))($):$_$_==+!![]+!![]?$$__(...$)>+![]?$___$($):
$:$)($_$$($)))($_))())(($_)=>(($$_$)=>($$_$=(_)=>$_[_]!=[][[]]?$$_$(_+!![]):_)(+![]))(),
($_,$__$_)=>[...$_,$__$_],([$$_,$__$])=>[$__$,$$_])
```

### How to write code for transpiler
The transpiler will replace everything that looks like an identifier with a series of $ and \_. That means the code has to be free from keywords like `if`, `var` and `for`. "Value keywords" such as `true`, `false` and `undefined` are automatically replaced with non-alphanumeric renditions of the same value. `null` is not supported at the moment. Numbers are also replaced. After all the replacing, whitespace is stripped to reduce size.

The transpiler will often produce code that is shorter than the original, due to shorter booleans and identifiers. If the code is heavy in numbers, especially number with high digits, the transpiler might produce code larger than the original.

Below is the code for the quicksort before it went through the transpiler.
```javascript
((LEN, PUSH, SWAP) => (list, comparator = (a, b) => a - b) => ((quicksort) => (quicksort = (items) => ((length) => length > 2 ? (([pivot, ...rest]) => ((length_rest) => ((iterator) => (iterator = (index, left, right) => index < length_rest ? comparator(rest[index], pivot) < 0 ? iterator(index + 1, PUSH(left, rest[index]), right) : iterator(index + 1, left, PUSH(right, rest[index])) : [...quicksort(left), pivot, ...quicksort(right)])(0, [], []))())(LEN(rest)))(items) : length == 2 ? comparator(...items) > 0 ? SWAP(items) : items : items)(LEN(items)))(list))())((list) => ((counter) => (counter = (index) => list[index] != undefined ? counter(index + 1) : index)(0))(), (list, item) => [...list, item], ([a, b]) => [b, a])
```

`LEN`, `PUSH` and `SWAP` are library functions included in lib.js to make writing code easier.
