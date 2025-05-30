import React from 'react'

export const FormValidErr = ({ errmessage }) => {
  return (
    <p role='alert' className='text-sm text-red-600 font-medium' >{errmessage}</p>
  )
}
