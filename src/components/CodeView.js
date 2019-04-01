import React from 'react'
import { Button, Segment } from "semantic-ui-react"
import { RenderParams } from "./renderParams"
import { v4 as generateId } from 'uuid'

const generateGuidesUrl = 'https://3uvkamww2b.execute-api.us-east-1.amazonaws.com/dev/generateBrowserGuide'

const generateGuide = (parameters, query) => {
  const guid = generateId()
  const payload = constructPayload(parameters, query, guid)

  return fetch(generateGuidesUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      return guid
    })
    .catch(err => {
      console.log('GENERATE GUIDE CALL ERROR', err)
      throw (err)
    })
}

const constructPayload = (parameters, query, guid) => ({
  uuid: guid,
  params: Object.keys(parameters).map(key => `:param ${key} => ${stringfyParam(parameters[key])};`).join('\n'),
  query: query[0]
})

const stringfyParam = value => {
  if (!value) {
    return 'null'
  }

  if (typeof value === 'object') {
    return '{' + Object.keys(value).map(key => `${key}: ${JSON.stringify(value[key])}`).join(', ') + '}'
  } else {
    return JSON.stringify(value)
  }
}

const openBrowser = ({ parameters, query }) => {
  generateGuide(parameters, query)
    .then(guideId => {
      window.open(`neo4j://graphapps/neo4j-browser?cmd=play&arg=neuler/${guideId}.html`, '_self')
    })
}

export default ({ task }) => (
  <div style={{
    height: '85vh',
    overflowY: 'auto',
    overflowX: 'hidden'
  }}>
    {
      task.parameters
        ? <Segment>
          <RenderParams parameters={task.parameters}/>
        </Segment>
        : null
    }


      {task.query.map(query => {
        return <Segment><pre>{query && query.replace('\n  ', '\n')}</pre></Segment>
      })}


    <Segment>
      <Button basic color='green' icon='play' content='Send to Neo4j Browser' onClick={() => openBrowser(task)}/>
    </Segment>
  </div>
)