import AddToDoInput from './components/AddToDoInput/AddToDoInput';
import Background from './components/Background/Background';
import ListToDos from './components/ListToDos/ListToDos';
import Store from './store';

export default function ToDoApp() {
  return (
    <Background>
      <Store.Provider initialState={{ todos: [] }}>
        <main className="w-4/5 h-4/5 bg-slate-50 rounded-lg p-10">
          <AddToDoInput />
          <ListToDos />
        </main>
      </Store.Provider>
    </Background>
  );
}
