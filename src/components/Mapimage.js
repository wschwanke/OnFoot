import React from 'react'

const mapImage = ({link}) => {
  console.log('what is a link', link)

 return (<span><img src={`${link}`}/></span>)
}

export default mapImage