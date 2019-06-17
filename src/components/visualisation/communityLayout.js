import * as tsnejs from 'tsne'

const noOfIterations = 1000

export const layoutDr = nodes => {
  const opt = {
    epsilon: 10,
    perplexity: 30,
    dim: 2
  }

  const tsne = new tsnejs.tSNE(opt)

  const dists = nodes.map(node => node.vector)
  tsne.initDataRaw(dists);

  for (let i = 0; i < noOfIterations; i++) {
    tsne.step()
  }

  const yArray = tsne.getSolution()

  const distort = value => value + ((Math.random() > 0.5 ? 1 : -1) * Math.random() * 30)

  yArray.forEach((xy, index) => {
    const node = nodes[index]
    node.x =  distort(xy[0] * 50)
    node.y =  distort(xy[1] * 50)

    node['title'] += "<strong>x</strong>" + " " + node.x + "<br>"
    node['title'] += "<strong>y</strong>" + " " + node.y + "<br>"
  })

}