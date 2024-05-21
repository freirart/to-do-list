import AddToDoInput from './components/AddToDoInput/AddToDoInput';
import Background from './components/Background/Background';
import ListToDos from './components/ListToDos/ListToDos';
import Store from './store';

export default function ToDoApp() {
  return (
    <Background>
      <Store.Provider initialState={{ todos: [] }}>
        <main
          className="flex w-4/5 h-4/5 bg-slate-50 rounded-lg divide-x-2 drop-shadow-lg
            text-lg"
        >
          <div className="flex justify-center items-center w-1/6 h-full px-10">
            <ul className="leading-[3.5rem] text-zinc-700 text-nowrap truncate text-2xl">
              <li>All</li>
              <li>Groceries</li>
              <li>College</li>
            </ul>
          </div>
          <div className="flex flex-col w-5/6 h-full text-zinc-600 p-10">
            <h1 className="text-3xl text-slate-950 font-semibold">
              All Tasks
            </h1>
            <AddToDoInput />
            <ListToDos />
          </div>
        </main>
      </Store.Provider>
    </Background>
  );
}
