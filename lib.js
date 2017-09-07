//Lists

const LEN = (list) => ((counter) => (counter = (index) => list[index] != undefined ? counter(index + 1) : index)(0))()

const CLONE = (list) => [...list]

const CONCAT = (list, other) => [...list, ...other]

const INCLUDES = (list, item) => ((iterator) => ((length) => (iterator = (index) => index < length ? list[index] == item ? true : iterator(index + 1) : false)(0))(LEN(list)))() //Depends on: LEN

const PUSH = (list, item) => [...list, item]

const UNSHIFT = (list, item) => [item, ...list]

const MAP = (list, transform) => ((iterator) => ((length) => (iterator = (index, target) => index < length ? iterator(index + 1, PUSH(target, transform(list[index], index))) : target)(0, []))(LEN(list)))() //Depends on: LEN, PUSH

const FILTER = (list, predicate) => ((iterator) => ((length) => (iterator = (index, target) => index < length ? iterator(index + 1, predicate(list[index], index) ? PUSH(target, list[index]) : target) : target)(0, []))(LEN(list)))() //Depends on: LEN, PUSH

const REDUCE = (list, operation, start) => ((iterator) => ((length) => (iterator = (index, accumulator) => index < length ? iterator(index + 1, operation(accumulator, list[index], index)) : accumulator)(0, start))(LEN(list)))() //Depends on: LEN

const ANY = (list, predicate) => ((iterator) => ((length) => (iterator = (index) => index < length ? predicate(list[index], index) ? true : iterator(index + 1) : false)(0))(LEN(list)))() //Depends on: LEN

const ALL = (list, predicate) => ((iterator) => ((length) => (iterator = (index) => index < length ? predicate(list[index], index) ? iterator(index + 1) : false : true)(0))(LEN(list)))() //Depends on: LEN

const COUNT = (list, predicate = (item, index) => true) => ((iterator) => ((length) => (iterator = (index, count) => index < length ? iterator(index + 1, count + predicate(list[index], index)) : count)(0, 0))(LEN(list)))()

const REVERSE = (list) => ((iterator) => ((length) => (iterator = (index, target) => index >= 0 ? iterator(index - 1, PUSH(target, list[index])) : target)(length - 1, []))(LEN(list)))() //Depends on: LEN, PUSH

const EACH = (list, consumer) => ((iterator) => ((length) => (iterator = (index) => index < length ? (() => iterator(index + 1))(consumer(list[index], index)) : true)(0))(LEN(list)))() //Depends on: LEN

const SLICE = (list, start = 0, end = -1, step = 1) => ((length) => ((start_, end_) => ((iterator) => (iterator = (index, target) => step < 0 ? (index > end_) ? iterator(index + step, PUSH(target, list[index])) : target : (index < end_) ? iterator(index + step, PUSH(target, list[index])) : target)(start_, []))())(start < 0 ? length + start + 1: start, end < 0 ? length + end + 1: end))(LEN(list)) //Depends on: LEN

const RANGE = (start, end, step = 1) => ((iterator) => (iterator = (num, target) => step < 0 ? num > end ? iterator(num + step, PUSH(target, num)) : target : num < end ? iterator(num + step, PUSH(target, num)) : target)(start, []))()

const SWAP = ([a, b]) => [b, a]

const SORT = (list, comparator = (a, b) => a - b) => ((quicksort) => (quicksort = (items) => ((length) => length > 2 ? (([pivot, ...rest]) => ((length_rest) => ((iterator) => (iterator = (index, left, right) => index < length_rest ? comparator(rest[index], pivot) < 0 ? iterator(index + 1, PUSH(left, rest[index]), right) : iterator(index + 1, left, PUSH(right, rest[index])) : [...quicksort(left), pivot, ...quicksort(right)])(0, [], []))())(LEN(rest)))(items) : length == 2 ? comparator(...items) > 0 ? SWAP(items) : items : items)(LEN(items)))(list))()

//Types

const TOSTRING = (obj) => obj + []

const ISSTRING = (obj) => obj + [] === obj

const ISINT = (obj) =>  +obj === obj

Object.assign(exports, {LEN, CLONE, CONCAT, INCLUDES, PUSH, MAP, FILTER, REDUCE, ANY, ALL, COUNT, REVERSE, EACH, SLICE, RANGE, SWAP, SORT, TOSTRING, ISSTRING, ISINT})
