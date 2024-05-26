import AddToDoInput from './components/AddToDoInput/AddToDoInput';
import Background from './components/Background/Background';
import ListCategories from './components/ListCategories/ListCategories';
import ListToDos from './components/ListToDos/ListToDos';
import PageTitle from './components/PageTitle/PageTitle';

import Store from './store';
import { initialState } from './store/ToDoStore';

export default function ToDoApp() {
  return (
    <Background>
      <Store.Provider initialState={initialState}>
        <main
          className="flex relative z-0 w-4/5 h-4/5 bg-slate-50 rounded-lg divide-x-2
            drop-shadow-lg text-lg"
        >
          <ListCategories />
          <div className="flex flex-col w-5/6 h-full text-zinc-600 p-10">
            <PageTitle />
            <AddToDoInput />
            <ListToDos />
          </div>
        </main>
      </Store.Provider>
    </Background>
  );
}
