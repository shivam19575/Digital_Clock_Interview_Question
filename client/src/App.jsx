import Clock from "./components/Clock";
import CheckTime from "./components/CheckTime";


const App = () => {
  return (
    <div className="w-[80%] min-h-[400px] h-auto bg-slate-100 flex flex-col justify-center items-center m-auto mt-20"><h1 className='text-blue-500 text-4xl text-center mt-10'>Digital Clock Task</h1>
    <Clock />
    <CheckTime />
    </div>
  )
};

export default App;