export default function AuthLayout({children}: Readonly<{children: React.ReactNode;}>){
  return (
    <div className='min-h-screen flex justify-center pt-20'>
        {children}
    </div>
  )
}