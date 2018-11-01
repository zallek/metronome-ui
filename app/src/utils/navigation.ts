import * as History from 'history'
import * as queryString from 'query-string'

function encodeUrl(focus: IEventFocus): string {
  return queryString.stringify({
    ...focus
  })
}

export function updateFocus(history: History.History, newFocus: IEventFocus): void {
  const url = '/?' + encodeUrl(newFocus)
  history.push(url)
}