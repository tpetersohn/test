import * as R from "ramda"
import crypto from "node:crypto"
import { count } from "node:console";

const shuffleArray = (ar) => {
  let arr = ar.slice(0)
  for (let i = arr.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0,ar.length)
      {[arr[i], arr[j]] = [arr[j], arr[i]]}
    }
    return arr;
};

const BinarySearchTree = (() => {
    // Node creation using factory function
    const createNode = (value, left = null, right = null) => ({ value, left, right })
  
    // Insert a value into the tree
    const insert = tree => value => {
      if (!tree) return createNode(value)
      
      return value < tree.value
        ? { ...tree, left: insert(tree.left)(value) }
        : { ...tree, right: insert(tree.right)(value) }
    }
  
    // Search for a value in the tree
    const search = tree => value => {
      if (!tree) return null
      if (tree.value === value) return tree
      
      return (value < tree.value
        ? search(tree.left)(value)
        : search(tree.right)(value)) 
        
        || 
        
        (value > tree.value
        ? search(tree.left)(value)
        : search(tree.right)(value))
    }
  
    // Inorder traversal (left-root-right)
    const inorderTraversal = tree => {
      if (!tree) return []
      
      return [
        ...inorderTraversal(tree.left),
        tree.value,
        ...inorderTraversal(tree.right)
      ]
    }
  
    // Find minimum value in the tree
    const findMin = tree => {
      if (!tree) return null
      return tree.left ? findMin(tree.left) : tree.value
    }
  
    // Find maximum value in the tree
    const findMax = tree => {
      if (!tree) return null
      return tree.right ? findMax(tree.right) : tree.value
    }
  
    const reverse = tree => {
      if (!tree) return null
      return {...tree, value:tree.value, left: reverse(tree.right), right: reverse(tree.left) }
    }

    // Remove a value from the tree
    const remove = tree => value => {
      if (!tree) return null
  
      // Find the node to remove
      if (value < tree.value) 
        return { ...tree, left: remove(tree.left)(value) }
      if (value > tree.value) 
        return { ...tree, right: remove(tree.right)(value) }
  
      // Case 1: No children
      if (!tree.left && !tree.right) return null
  
      // Case 2: One child
      if (!tree.left) return tree.right
      if (!tree.right) return tree.left
  
      // Case 3: Two children - find minimum in right subtree
      const minRight = findMin(tree.right)
      return {
        value: minRight,
        left: tree.left,
        right: remove(tree.right)(minRight)
      }
    }
  
    // Tree height calculation
    const height = tree => {
      if (!tree) return -1
      return 1 + Math.max(
        height(tree.left),
        height(tree.right)
      )
    }
    const count = tree => {

      if (!tree) return 0
      return 1 + count(tree.left) + count(tree.right)

    }

    // Public API
    return {

      create: () => null,
      insert,
      search,
      remove,
      inorderTraversal,
      findMin,
      findMax,
      height,
      reverse,
      count
    
    }
    
  })()
  
  // Example usage
  const arr = shuffleArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
  const tree = R.reduce( (acc, val) => BinarySearchTree.insert(acc)(val), BinarySearchTree.create(), arr )
  const tre = R.reduce( (acc, val) => BinarySearchTree.remove(acc)(val), tree, [1,2,3] )
  console.log(arr)
  console.log(BinarySearchTree.inorderTraversal(tre)) // [1, 3, 5, 7]
  const rtree = BinarySearchTree.reverse(tre)
  console.log(BinarySearchTree.inorderTraversal(rtree))
  console.log(BinarySearchTree.count(tree))
  console.log(BinarySearchTree.search(rtree)(15)) // Node with value 3
  console.log(BinarySearchTree.search(tre)(5))
  console.log(BinarySearchTree.height(tre)) // 2
  console.log(BinarySearchTree.findMax(tre)) // 2
  console.log(BinarySearchTree.findMin(tre)) // 2