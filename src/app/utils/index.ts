export const media = {
  "992px": (cssInjection: string) =>
    `@media(max-width: 992px) {${cssInjection}};`,
};

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
