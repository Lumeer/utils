/*
 * Lumeer: Modern Data Definition and Processing Platform
 *
 * Copyright (C) since 2017 Lumeer.io, s.r.o. and/or its affiliates.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import unorm from 'unorm';

export function compareStrings(a: string, b: string): number {
    return (a || '').localeCompare(b || '', undefined, {sensitivity: 'base'});
}

export function completeStringWithCharacter(value: string, num: number, character: string): string {
    let text = value || '';
    while (text.length < num) {
        text = character + text;
    }
    return text;
}

export function removeTrailingZeroesFromString(value: string): string {
    if (!value) {
        return value;
    }

    const [integerPart, fractionalPart] = String(value).split('.');
    if (!fractionalPart) {
        return integerPart;
    }

    const fractionalDigits = fractionalPart
        .split('')
        .reverse()
        .reduce((reversedPart, digit) => (digit === '0' && !reversedPart ? '' : reversedPart + digit), '')
        .split('')
        .reverse()
        .join('');

    return fractionalDigits ? `${integerPart}.${fractionalDigits}` : integerPart;
}


export function removeAccentFromString(value: string, lowerCase = true): string {
    return unorm.nfd(lowerCase ? (value || '').toString().toLowerCase() : value || '').replace(/[\u0300-\u036f]/g, '');
}

export function escapeStringForRegex(text: string): string {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function setCharAt(value: string, position: number, char: string): string {
    return value.substring(0, position) + char + value.substring(position + 1, value.length);
}

export function replaceNbspFromString(value: string): string {
    return (value || '').replace(/&nbsp;/g, ' ');
}
