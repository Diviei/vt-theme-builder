import { hexToRGB } from "./colors-utils";

export function generateScriptCode(
  prefix: string,
  themeName: string,
  themeType: "light" | "dark",
  colors: { name: string; value: string }[]
) {
  return `
  // ==UserScript==
  // @name          ${themeName}
  // @namespace     https://www.virustotal.com/gui/
  // @description   ${themeName}
  // @include       *
  // ==/UserScript==

const css = \`
  [data-bs-theme='${themeType}'] {
    color-scheme: ${themeType};

    ${colors
      .map(
        (color) =>
          `${prefix}${color.name}: ${color.value};\n    ${prefix}${
            color.name
          }-rgb: ${hexToRGB(color.value)};`
      )
      .join("\n    ")}
\`;

function replaceRootLoaderContent() {
    const rootLoader = document.querySelector('vtstrap-root-loader');
    if (rootLoader) {
        rootLoader.querySelector('style').appendChild(document.createTextNode(css));
    } else {
        setTimeout(replaceRootLoaderContent, 100);
    }
}
replaceRootLoaderContent();
  `;
}

// /**/
// --bs-body-color: #adafae;
// --bs-body-color-rgb: 173, 175, 174;
// --bs-body-bg: #0f0e0e;
// --bs-body-bg-rgb: 15, 14, 14;
// /**/
// --bs-secondary-color: #a5a7a6;
// --bs-secondary-color-rgb: 165, 167, 166;
// --bs-secondary-bg: #171616;
// --bs-secondary-bg-rgb: 23, 22, 22;
// /**/
// --bs-tertiary-color: #9d9f9e;
// --bs-tertiary-color-rgb: 157, 159, 158;
// --bs-tertiary-bg: #1f1e1e;
// --bs-tertiary-bg-rgb: 31, 30, 30;
// /**/
// --bs-disabled-color: #5e5f5e;
// --bs-border-color: #868786;
// /* primary */
// --bs-primary: #2a9fd6;
// --bs-primary-rgb: 42, 159, 214;
// --bs-primary-bg: #1d5772;
// --bs-primary-color: #6ca7c2;
// /* danger */
// --bs-danger: #c00;
// --bs-danger-rgb: 204, 0, 0;
// --bs-danger-bg: #6e0707;
// --bs-danger-color: #bd5857;
// /* warning */
// --bs-warning: #f80;
// --bs-warning-rgb: 255, 136, 0;
// --bs-warning-bg: #874b07;
// --bs-warning-color: #d69c57;
// /* success */
// --bs-success: #77b300;
// --bs-success-rgb: 119, 179, 0;
// --bs-success-bg: #436107;
// --bs-success-color: #92b157;
// /* info */
// --bs-info: #93c;
// --bs-info-rgb: 153, 51, 204;
// --bs-info-bg: #54216d;
// --bs-info-color: #a371bd;
// /* Background icons */
// ----bs-form-feedback-icon-valid: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='#77b300' viewBox='0 0 8 8'%3e%3cpath d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
// ----bs-form-feedback-icon-invalid: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='#c00' viewBox='0 0 8 8'%3e%3cpath d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
// ----bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#adafae'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
// ----bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#adafae'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
// ----bs-form-check-input-checked-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='#0f0e0e' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
// ----bs-form-check-radio-checked-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='#0f0e0e'/%3e%3c/svg%3e");
// ----bs-form-check-input-indeterminate-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='#0f0e0e' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
// }
