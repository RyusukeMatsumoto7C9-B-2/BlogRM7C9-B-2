import React from "react"

export default function Header(props, colorCode) {
  return (
    <div style={{ color: colorCode }}>
      <h1>{props.headerText}</h1>
    </div>)
}