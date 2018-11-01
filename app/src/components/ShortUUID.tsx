import Tooltip from '@material-ui/core/Tooltip'
import * as React from 'react'

const ShortUUID = ({ uuid }: IShortUUIDProps) => {
  const splits = uuid.split('-')
  const shorten = uuid.length === 36 && splits.length === 5 ? splits[0] : null
  return (
    <Tooltip title={uuid}>
      <span>{shorten || '<invalid>'}</span>
    </Tooltip>
  )
}

interface IShortUUIDProps {
  uuid: string
}

export default ShortUUID
