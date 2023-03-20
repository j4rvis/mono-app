export default function List({ array }: { array: string[] }) {
  return (
    <ul className="">
      {array.map((item: string) =>
        <li>item</li>
      )}
    </ul>
  )
}
