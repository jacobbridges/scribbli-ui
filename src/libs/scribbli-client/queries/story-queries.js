import { gql } from '@apollo/client/core'

export const STORY_LIST = gql`
query StoryList($universe: ID!, $status: String, $nameContains: String) {
  storyList(universe: $universe, status: $status, name_Icontains: $nameContains) {
    edges {
      node {
        id
        name
        slug: nameSlug
        status
        author {
          email
        }
        dateCreated
      }
    }
  }
}
`

export const STORY_CREATE = gql`
mutation CreateStory($universe: ID!, $name: String!, $blurb: String, $rules: String) {
  createStory(input: {
    universe: $universe,
    name: $name,
    blurb: $blurb,
    rules: $rules
  }) {
    story {
      id
      name
      slug: nameSlug
      status
    }
    errors {
      field
      messages
    }
  }
}
`

export const STORY_DETAIL_BY_SLUG = gql`
query StoryDetailBySlug($slug: String!) {
  story: storyBySlug(slug: $slug) {
    id
    name
    slug: nameSlug
    status
    dateCreated
    author {
      email
    }
    blurb
    rules
    characters {
      edges {
        node {
          name
          slug: nameSlug
        }
      }
    }
    postCount
  }
}
`

export const STORY_EDIT = gql`
mutation StoryEdit($id: ID!, $blurb: String, $rules: String, $name: String, $status: String, $characters: [ID]) {
  updateStory(input: {
    id: $id,
    name: $name,
    status: $status,
    blurb: $blurb,
    rules: $rules,
    characters: $characters
  }) {
    story {
      id
      name
      slug: nameSlug
      status
    }
    errors {
      field
      messages
    }
  }
}
`
