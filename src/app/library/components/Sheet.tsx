import styles from './Sheet.module.css'
export default function Sheet({ children, className }: { children: React.ReactNode, className: string }) {  
  return (
    <div className={`${styles.custom} ${className} bg-white mx-auto 
      max-w-4xl shadow-sm 
      print:shadow-none grid`}>
      {children}
    </div>
  )
}
