import * as core from '@actions/core'
import {getOctokit, context} from '@actions/github'
import {getLabel} from './get-label'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', {required: true})
    const octokit = getOctokit(token)

    const result = await getLabel({
      octokit,
      owner: core.getInput('owner') || context.repo.owner,
      repo: core.getInput('repo') || context.repo.repo,
      pull_number:
        Number(core.getInput('pull_number')) ||
        context.payload.pull_request?.number ||
        context.issue.number
    })

    core.info(result)
    core.setOutput('labels', result)
  } catch (error: any){
    core.setFailed(error.message)
  }
}

run()
