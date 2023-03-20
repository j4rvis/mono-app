import { TodoistApi } from '@doist/todoist-api-typescript'

const API_KEY=`${process.env.TODOIST_API_KEY}`

export default async function TodoistWidget({
  projectId
}: {
  projectId: string
}) {
  const api = new TodoistApi(API_KEY)
  let tasks = await api.getTasks({projectId: projectId});

  return (
    <ul className='list-disc list-outside pl-4' >
      {tasks.map(task => {
        return(<li key={task.id}>{task.content}</li>)
      })}
    </ul>
  )
}