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
    <div className={`${className} p-4 `}>
      <h2 className="font-medium text-2xl mb-2">{title}</h2>
      {children}
    </div>
  )
}