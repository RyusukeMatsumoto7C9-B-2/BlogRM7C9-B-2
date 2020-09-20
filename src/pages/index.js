import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default function Home() {
  return (
    <div style={{ color: `purple`}}>
      <Link to="/contact/">Contact</Link>
      <Header headerText="Hello Gatsby!"></Header>
      <p>What a world.</p>
      <img src="https://dic.nicovideo.jp/oekaki/861642.png" alt=""/>
    </div>)
}