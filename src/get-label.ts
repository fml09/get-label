import {getOctokit} from '@actions/github'

export interface Options {
  octokit: ReturnType<typeof getOctokit>

  owner: string
  repo: string
  pull_number: number
}

export const getLabel = async (options: Options): Promise<string> => {
  const {octokit, ...rest} = options

  const {
    data: {labels}
  } = await octokit.rest.pulls.get({...rest})

  return labels.map(label => label.name).join(',')
}
