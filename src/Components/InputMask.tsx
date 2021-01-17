import React from 'react'
import ReactInputMask from 'react-input-mask'
import { TextField, TextFieldProps } from '@material-ui/core'

type InputMaskProps = TextFieldProps & {
  mask: string | Array<(string | RegExp)>
}

const InputMask: React.FC<InputMaskProps> = (props) => (
  <ReactInputMask mask={props.mask} value={props.value as any} onChange={props.onChange} maskPlaceholder={null}>
    {(inputProps: any) => (
      <TextField {...inputProps} type='tel'/>
    )}
  </ReactInputMask>
)

export default InputMask
