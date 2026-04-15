function parseMetadata (raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const frontmatter = match[1]
  const content = raw.slice(match[0].length)

  const data = {}

  for (const line of frontmatter.split('\n')) {
    const [key, ...rest] = line.split(':')
    if (!key) {
      continue
    }
    data[key.trim()] = rest.join(':').trim()
  }

  return { data, content }
}

const files = import.meta.glob('../blog/*.md', {
  query: '?raw',
  eager: true,
})

const posts = Object.entries(files).map(([path, raw]) => {
  const { data, content } = parseMetadata(raw.default)

  const slug = path.split('/').pop().replace('.md', '')

  const categories = data.category.split(' ')

  return {
    slug,
    ...data,
    content,
    categories,
  }
})

posts.sort((a, b) => new Date(b.date) - new Date(a.date))

export function useBlog () {
  return {
    posts,
    getPostBySlug: slug =>
      posts.find(p => p.slug === slug),
  }
}
