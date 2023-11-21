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

export function shadeColor(color: string, percent: number): string {
  if (color) {
    const f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }
  return '';
}

export function stripedBackground(color: string, stripeColor: string): string {
  return `linear-gradient(-45deg, ${color} 25%, ${stripeColor} 25%, ${stripeColor} 50%, ${color} 50%, ${color} 75%, ${stripeColor} 75%, ${stripeColor})`;
}

export function hex2rgba(hex: string, opacity: number): string {
  hex = (hex || '').replace('#', '');
  const r = parseInt(hex.substring(0, hex.length / 3), 16);
  const g = parseInt(hex.substring(hex.length / 3, (2 * hex.length) / 3), 16);
  const b = parseInt(hex.substring((2 * hex.length) / 3, (3 * hex.length) / 3), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

export function clickedInsideElement(event: Event, tagName: string): boolean {
  const paths = getEventPath(event) || [];
  for (const element of paths) {
    if (element?.tagName?.toUpperCase() === (tagName || '').toUpperCase()) {
      return true;
    }
  }
  return false;
}

function getEventPath(event: Event): HTMLElement[] {
  if ((<any>event).path) {
    return (<any>event).path as HTMLElement[];
  } else {
    const path = [];
    let currentElem = event.target as HTMLElement;
    while (currentElem) {
      path.push(currentElem);
      currentElem = currentElem.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
    if (path.indexOf(window) === -1) path.push(window);
    return path;
  }
}

export function isElementActive(element: Element): boolean {
  return element && document.activeElement === element;
}

export function convertRemToPixels(value: number) {
  return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
