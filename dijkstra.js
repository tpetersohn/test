// Graph representation using Map
const createGraph = () => new Map()

// Add edge to graph
const addEdge = (graph, start, end, weight) =>
  graph.set(start, [...(graph.get(start) || []), { node: end, weight }])

// Priority Queue implementation using Min-Heap concept
const PriorityQueue = (() => {
  const enqueue = (queue, element) => {
    queue.push(element)
    return queue.sort((a, b) => a.priority - b.priority)
  }
  
  const dequeue = queue => queue.shift()
  
  return { enqueue, dequeue }
})()

// Main Dijkstra implementation
const dijkstra = (graph, startNode) => {
  const distances = new Map()
  const previous = new Map()
  const pq = []
  
  // Initialize distances
  const initializeDistances = () => {
    for (const node of graph.keys()) {
      distances.set(node, node === startNode ? 0 : Infinity)
      PriorityQueue.enqueue(pq, { node, priority: distances.get(node) })
    }
  }
  
  // Process nodes
  const processNodes = () => {
    while (pq.length > 0) {
      const { node: current } = PriorityQueue.dequeue(pq)
      const neighbors = graph.get(current) || []
      
      neighbors.forEach(neighbor => {
        const distance = distances.get(current) + neighbor.weight
        
        if (distance < distances.get(neighbor.node)) {
          distances.set(neighbor.node, distance)
          previous.set(neighbor.node, current)
          PriorityQueue.enqueue(pq, { node: neighbor.node, priority: distance })
        }
      })
    }
  }
  
  // Get shortest path to a target node
  const getPath = target => {
    const path = []
    let current = target
    
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }
    
    return path
  }
  
  initializeDistances()
  processNodes()
  
  return {
    distances,
    getPath
  }
}

// Usage example
const main = () => {
  const graph = createGraph()
  
  addEdge(graph, 'A', 'B', 4)
  addEdge(graph, 'A', 'C', 2)
  addEdge(graph, 'B', 'E', 3)
  addEdge(graph, 'C', 'D', 2)
  addEdge(graph, 'D', 'E', 3)
  addEdge(graph, 'D', 'F', 1)
  addEdge(graph, 'E', 'F', 5)
  
  const result = dijkstra(graph, 'A')
  console.log(graph)
  console.log('Distances:', Object.fromEntries(result.distances))
  console.log('Path to F:', result.getPath('E'))
}

main()