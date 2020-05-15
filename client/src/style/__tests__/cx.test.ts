// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { cx } from '../utils';

test('cx: list of strings', () => {
  expect(cx('a', 'b', 'c', 'd e  f')).toEqual('a b c d e f');
});

test('cx: array of strings', () => {
  expect(cx(['a', 'b', 'c', 'd'])).toEqual('a b c d');
});

test('cx: one object', () => {
  expect(cx({ a: true, b: true, c: true, d: true })).toEqual('a b c d');

  expect(cx({ a: true, b: true, c: false, d: true })).toEqual('a b d');

  expect(cx({ a: false, b: true, c: true, d: false })).toEqual('b c');

  expect(cx({ a: false, b: false, c: false, d: false })).toEqual('');
});

test('cx: two object', () => {
  expect(cx({ a: true, b: true }, { c: true, d: true })).toEqual('a b c d');

  expect(cx({ a: true, b: true }, { c: false, d: true })).toEqual('a b d');

  expect(cx({ a: false, b: true }, { c: true, d: false })).toEqual('b c');

  expect(cx({ a: false, b: false }, { c: false, d: false })).toEqual('');
});

test('cx: overrides', () => {
  expect(cx('a', { a: false, b: true }, { c: true, d: true })).toEqual('b c d');

  expect(cx({ a: false, b: true }, { c: false, d: true }, 'a')).toEqual(
    'a b d'
  );

  expect(cx({ a: false, b: true }, { c: true, d: false }, ['a', 'd'])).toEqual(
    'a b c d'
  );

  expect(cx(['a', 'd'], { a: false, b: true }, { c: true, d: false })).toEqual(
    'b c'
  );

  expect(cx('a e', { a: false, b: false, c: false, d: false })).toEqual('e');

  expect(
    cx('a e', { a: true, b: false, c: false, d: true, e: false }, 'c', ['b'], {
      a: false,
    })
  ).toEqual('b c d');
});
