import { gql } from '@apollo/client/core'


export const REGION_DETAIL_BY_SLUG_WITH_WORLD = gql`
query RegionDetailBySlugWithWorld($worldSlug: String!, $regionSlug: String!) {
  region: regionBySlug(slug: $regionSlug) {
    id
    name
    slug: nameSlug
    author {
      email
    }
    blurb
  }
  world: regionBySlug(slug: $worldSlug) {
    id
    name
    slug: nameSlug
  }
}
`


export const REGION_LIST = gql`
query RegionList($parentId: ID, $level_Gt: Int, $level: Int) {
  regionList(parent: $parentId, level_Gt: $level_Gt, level: $level) {
    edges {
      node {
        id
        name
        slug: nameSlug
        level
      }
    }
  }
}
`

export const REGION_CHILDREN = gql`
query RegionChildren($parentId: ID!) {
  regionChildren(parent: $parentId) {
    edges {
      node {
        id
        name
        slug: nameSlug
        level
      }
    }
  }
}
`

export const REGION_EDIT_BLURB = gql`
mutation RegionEditBlurb($regionId: ID!, $blurb: String!) {
  updateRegion(input: {id: $regionId, blurb: $blurb}) {
    region {
      id
      name
      slug: nameSlug
      blurb
      level
    }
  }
}
`

export const REGION_CREATE = gql`
mutation RegionCreate($universeId: ID!, $name: String!, $parentId: ID,) {
  createRegion(input: {universe: $universeId, name: $name, parent: $parentId}) {
    region {
      id
      name
      slug: nameSlug
      level
    }
    errors {
      messages
      field
    }
  }
}
`
