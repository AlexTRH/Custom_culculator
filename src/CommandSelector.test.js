/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import { CALCULATOR } from './contains';
import {
	AddCommand,
	SubstractCommand,
	MultiplyCommand,
	DivideCommand,
	PowCommand,
	FactorialCommand,
	InversionCommand,
	PercentageCommand,
} from './CommandSelector';

test('AddCommand test: 10 + 20 = 30', () => {
	CALCULATOR.resetValue(10);
	CALCULATOR.executeCommand(new AddCommand(20));
	expect(CALCULATOR.value).toBe(30);
});

test('SubstractCommand test: 22 - 2 = 20', () => {
	CALCULATOR.resetValue(22);
	CALCULATOR.executeCommand(new SubstractCommand(2));
	expect(CALCULATOR.value).toBe(20);
});

test('MultiplyCommand test: 20 * 3 = 60', () => {
	CALCULATOR.resetValue(20);
	CALCULATOR.executeCommand(new MultiplyCommand(3));
	expect(CALCULATOR.value).toBe(60);
});

test('DivideCommand test: 50 / 2 = 25', () => {
	CALCULATOR.resetValue(50);
	CALCULATOR.executeCommand(new DivideCommand(2));
	expect(CALCULATOR.value).toBe(25);
});

test('PowCommand test: 4 ^ 2 = 16', () => {
	CALCULATOR.resetValue(4);
	CALCULATOR.executeCommand(new PowCommand(2));
	expect(CALCULATOR.value).toBe(16);
});

test('PowCommand test: 2 ^ 3 = 8', () => {
	CALCULATOR.resetValue(2);
	CALCULATOR.executeCommand(new PowCommand(3));
	expect(CALCULATOR.value).toBe(8);
});

test('PowCommand test: 10 ^ 3 = 1000000', () => {
	CALCULATOR.resetValue(100);
	CALCULATOR.executeCommand(new PowCommand(3));
	expect(CALCULATOR.value).toBe(1000000);
});

test('PowCommand test: 4 ^ 1/2 = 2', () => {
	CALCULATOR.resetValue(4);
	CALCULATOR.executeCommand(new PowCommand(1 / 2));
	expect(CALCULATOR.value).toBe(2);
});

test('FactorialCommand test: 5! = 120', () => {
	CALCULATOR.resetValue(5);
	CALCULATOR.executeCommand(new FactorialCommand());
	expect(CALCULATOR.value).toBe(120);
});

test('FactorialCommand test: -5! = -120', () => {
	CALCULATOR.resetValue(-5);
	CALCULATOR.executeCommand(new FactorialCommand());
	expect(CALCULATOR.value).toBe(-120);
});

test('FactorialCommand test: 0! = 1', () => {
	CALCULATOR.resetValue(0);
	CALCULATOR.executeCommand(new FactorialCommand());
	expect(CALCULATOR.value).toBe(1);
});

test('FactorialCommand test: 1! = 1', () => {
	CALCULATOR.resetValue(1);
	CALCULATOR.executeCommand(new FactorialCommand());
	expect(CALCULATOR.value).toBe(1);
});

test('InversionCommand test: 4 = -4', () => {
	CALCULATOR.resetValue(4);
	CALCULATOR.executeCommand(new InversionCommand());
	expect(CALCULATOR.value).toBe(-4);
});

test('PercentageCommand test: 32 = 0.32', () => {
	CALCULATOR.resetValue(32);
	CALCULATOR.executeCommand(new PercentageCommand());
	expect(CALCULATOR.value).toBe(0.32);
});
