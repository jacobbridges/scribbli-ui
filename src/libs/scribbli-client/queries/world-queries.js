import { gql } from '@apollo/client/core'

export const WORLD_LIST = gql`
query WorldList($universeId: ID!) {
  worldList: regionList(universe: $universeId, level: 0) {
    edges {
      world: node {
        id
        name
        slug: nameSlug
      }
    }
  }
}
`

export const WORLD_DETAIL = gql`
query WorldDetail($worldSlug: String!) {
  world: regionBySlug(slug: $worldSlug) {
    name
    author {
      email
    }
  }
}
`

export const WORLD_CREATE = gql`
mutation WorldCreate($universeId: ID!, $worldName: String!) {
  createWorld(input: {universeId: $universeId, name: $worldName}) {
    world {
      name
      slug: nameSlug
    }
  }
}
`
