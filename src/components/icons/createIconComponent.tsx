import { css } from "@emotion/react"
import styled from "@emotion/styled"

const baseIconStyles = css`
  height: 1em;
  width: 1em;
  color: inherit;
  display: inline-block;
  vertical-align: text-bottom;
`

// https://bl.ocks.org/jennyknuth/222825e315d45a738ed9d6e04c7a88d0
function encodeSvg(svg: string) {
  return svg.replace("<svg", (~svg.indexOf("xmlns") ? "<svg" : "<svg xmlns=\"http://www.w3.org/2000/svg\""))
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
}

// Credits to https://antfu.me/posts/icons-in-pure-css
export function createIconComponent(svg: string) {
  // if an SVG icon have the `currentColor` value,
  // it's very likely to be a monochrome icon
  const mode = svg.includes("currentColor")
    ? "mask"
    : "background-img"

  const uri = `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`

  if (mode === "mask") {
    return styled.div`
      mask: ${uri} no-repeat;
      mask-size: 100% 100%;
      background-color: currentColor;
      ${baseIconStyles};
    `
  } else {
    return styled.div`
      background: ${uri} no-repeat;
      background-size: 100% 100%;
      background-color: transparent;
      ${baseIconStyles};
    `
  }
}
