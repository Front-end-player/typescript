import { withRouter } from 'next/router';
import React from 'react'
import next from 'next'

function Temp(props: any) {
  return (
    <div>
      {props.router.query.id}
    </div>
  )
}

export default withRouter(Temp)