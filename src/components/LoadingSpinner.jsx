export default function LoadingSpinner({ size = "md", color = "black" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const colorClasses = {
    black: "border-black",
    white: "border-white",
    gray: "border-gray-500"
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin dark:border-white dark:border-t-transparent`}></div>
    </div>
  )
}