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

export function getFocus(location: History.Location): IEventFocus {
  const qs = queryString.parse(location.search)
  if (qs.focusedNode) { return { focusedNode: qs.focusedNode as string } }
  if (qs.focusedEdge) { return { focusedEdge: qs.focusedEdge as string } }
  return null
}
