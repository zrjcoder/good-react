
// (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]

type TokenProps = {
  type: 'paren' | 'name' | 'number' | 'string';
  value: string;
}

type TokensProps = TokenProps[]

function tokenizer(input: string): TokensProps {
  let current = 0
  let tokens: TokensProps = []

  while (current < input.length) {
    let char = input[current]

    // '('
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })

      current++
      continue
    }

    // ')'
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      })

      current++
      continue
    }

    // whitespace
    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    // number
    let NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'number', value })

      continue
    }

    // string
    if (char === '"') {
      let value = ''

      char = input[++current]

      while (char !== '"') {
        value += char
        char = input[++current]
      }

      char = input[++current]

      tokens.push({ type: 'string', value })

      continue
    }

    // name
    let LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'name', value })

      continue
    }

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}

function parser(tokens: TokensProps) {
  let current = 0

  function walk() {
    let token = tokens[current]

    if (token.type === 'number') {
      current++

      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'string') {
      current++

      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current]

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [] as any[],
      }

      token = tokens[++current]

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++

      return node
    }

    throw new TypeError(token.type)
  }

  let ast = {
    type: 'Program',
    body: [] as any[],
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}

function traverser(ast: any, visitor: any) {
  function traverseArray(array: any[], parent: any) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  function traverseNode(node: any, parent: any) {
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break

      case 'CallExpression':
        traverseArray(node.params, node)
        break

      case 'NumberLiteral':
      case 'StringLiteral':
        break

      default:
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}



export {
  tokenizer
}
