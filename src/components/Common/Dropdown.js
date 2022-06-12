import React from "react"
import styles from "./Dropdown.module.css"

export default function Dropdown(props) {
  const setValue = (e) => {
    props.setValue(e.target.innerText)
  }

  if (!props.isOpen) return null

  return (
    <div className={styles.dropdownItems}>
      <p onClick={e => setValue(e)}>Text A</p>
      <p onClick={e => setValue(e)}>Text B</p>
      <p onClick={e => setValue(e)}>Text C</p>
      <p onClick={e => setValue(e)}>Text D</p>
      <p onClick={e => setValue(e)}>Text E</p>
    </div>
  )
}