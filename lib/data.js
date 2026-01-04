/**
 * 数据工具函数
 */

/**
 * 构造树型结构数据
 * @param {Array} data - 数据源
 * @param {string} id - id字段，默认 'id'
 * @param {string} parentId - 父节点字段，默认 'parentId'
 * @param {string} children - 孩子节点字段，默认 'children'
 * @returns {Array} 树型结构数据
 */
function handleTree(data, id, parentId, children) {
  if (!Array.isArray(data)) {
    return []
  }

  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }

  const childrenListMap = {}
  const nodeIds = {}
  const tree = []

  // 构建子节点映射和节点ID映射
  for (const d of data) {
    const parentIdValue = d[config.parentId]
    if (childrenListMap[parentIdValue] == null) {
      childrenListMap[parentIdValue] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentIdValue].push(d)
  }

  // 找出根节点（没有父节点的节点）
  for (const d of data) {
    const parentIdValue = d[config.parentId]
    if (nodeIds[parentIdValue] == null) {
      tree.push(d)
    }
  }

  // 递归构建树结构
  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] != null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  return tree
}

/**
 * 数组归类（按指定字段分组）
 * @param {Array} data - 数据源
 * @param {string} key - 分组字段名
 * @returns {Array} 归类后的数组，每个元素包含分组字段和allData数组
 */
function groupBy(data, key) {
  if (!Array.isArray(data) || !key) {
    return []
  }

  const result = []
  const keyMap = {}

  data.forEach(element => {
    const keyValue = element[key]
    if (!keyMap[keyValue]) {
      const group = {
        [key]: keyValue,
        allData: [element]
      }
      result.push(group)
      keyMap[keyValue] = group
    } else {
      keyMap[keyValue].allData.push(element)
    }
  })

  return result
}

module.exports = {
  handleTree,
  groupBy
}
