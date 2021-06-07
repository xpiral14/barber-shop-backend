import React from 'react'
import { jsPanel} from 'jspanel4/es6module/jspanel'
import options from '../Config/jsPanelDefaultOptions'
export default function Index() {

  const onClick = () => {
    jsPanel.create(options as any)
  }
  
  return (
    <div>
      <button onClick={onClick}>Clica em mim</button>
    </div>
  )
}
