import {runCypher} from "./stores/neoStore"
import {parseProperties} from "./resultMapper"
import {centralityParams, getFetchCypher} from './queries'

export const executeAlgorithm = ({ streamQuery, storeQuery, label, relationshipType, direction, persist, writeProperty, weightProperty, defaultValue, concurrency, dampingFactor, iterations, maxDepth, probability, strategy, limit, normalization, requiredProperties }) => {
  const params = centralityParams(label, relationshipType, direction, writeProperty, weightProperty, defaultValue, concurrency, dampingFactor, iterations, maxDepth, probability, strategy, limit, normalization, requiredProperties)
  return runAlgorithm(streamQuery, storeQuery, getFetchCypher(params.label), params, persist)
}

export const getSuperNodes = () => {
  const query = `call algo.degree.stream() yield nodeId, score
with nodeId, score order by score desc limit 10
MATCH (n) where ID(n) = nodeId
return n as node, score`

  return runAlgorithm(query, false, false, {}, false)
}

const handleException = error => {
  console.error(error)
  throw new Error(error)
}

const runAlgorithm = (streamCypher, storeCypher, fetchCypher, parameters, persisted) => {
  if (!persisted) {
    return runCypher(streamCypher, parameters)
      .then(result => ({rows: parseResultStream(result), query: streamCypher, parameters: parameters}))
      .catch(handleException)
  } else {
    return new Promise((resolve, reject) => {
      runCypher(storeCypher, parameters)
        .then(() => {
          runCypher(fetchCypher, parameters)
            .then(result => resolve({rows: parseResultStream(result), query: storeCypher, parameters: parameters}))
            .catch(reject)
        })
        .catch(handleException)
    })
  }
}

const parseResultStream = result => {
  if (result.records) {
    return result.records.map(record => {
      const { properties, labels } = record.get('node')
      return {
        properties: parseProperties(properties),
        labels,
        score: record.get('score')
      }
    })
  } else {
    console.error(result.error)
    throw new Error(result.error)
  }
}