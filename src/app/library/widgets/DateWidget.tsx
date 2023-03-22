const DATE_FORMAT = new Intl.DateTimeFormat('de-DE', {
  dateStyle: "long"
});

const DAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  weekday: "long"
});

export default function DateWidget() {
  return (
    <div className="text-3xl font-bold flex flex-col justify-around h-full">
      <p>{DAY_FORMAT.format(new Date())}</p>
      <p>{DATE_FORMAT.format(new Date())}</p>
    </div>
  )
}

export async function getServerSideProps() {

}