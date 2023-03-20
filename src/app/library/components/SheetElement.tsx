export default function SheetElement({ 
  children,
  className,
  title
}: { 
  children?: React.ReactNode,
  className: string,
  title?: string
}) {
  return (
    <div className={`${className} p-4 border-gray-300 border-2`}>
      <h2 className="font-medium text-2xl">{title}</h2>
      {children}
    </div>
  )
}